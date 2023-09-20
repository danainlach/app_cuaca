const cuaca = {
  apiKey: "146728f62f80bc355ee2010465672bbd",
  alertElement: null,
  deskripsiCuaca: {
    "clear sky": "cerah",
    "few clouds": "berawan sedikit",
    "scattered clouds": "berawan",
    "broken clouds": "berawan",
    "shower rain": "hujan rintik",
    "rain": "hujan",
    "thunderstorm": "badai petir",
    "snow": "salju",
    "mist": "kabut",
    "heavy intensity rain": "hujan lebat",
    "light rain": "hujan ringan",
    "overcast clouds": "awan mendung"
  },

  fetchWeather: async function (kota) {
    try {
      if (this.alertElement) {
        this.alertElement.remove();
      }

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${this.apiKey}&units=metric`);
      if (!response.ok) {
        this.showAlert("Tidak ada data cuaca ditemukan.");
        throw new Error("No weather found.");
      }

      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      console.error(error);
    }
  },

  // Metode untuk menampilkan data cuaca
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Cuaca kota " + name;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    const deskripsiTerjemahan = this.deskripsiCuaca[description.toLowerCase()] || description;
    document.querySelector(".description").innerText = deskripsiTerjemahan;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Kelembaban: " + humidity + "%";
    document.querySelector(".wind").innerText = "Kecepatan Angin: " + speed + " km/jam";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://1.bp.blogspot.com/-YoN0TPd4CAc/UIexPdrPqYI/AAAAAAAACzg/pQmaFVHXc1E/s1600/Mesjid+Raya+Medan.jpg')`;
  },

  // Metode untuk menampilkan pesan peringatan
  showAlert: function (message) {
    const alert = document.createElement("div");
    alert.innerText = message;
    alert.style.backgroundColor = "#3085C3";
    alert.style.color = "white";
    alert.style.textAlign = "center";
    alert.style.padding = "10px";
    alert.style.borderRadius = "5px";
    document.body.appendChild(alert);
    this.alertElement = alert;
  },

  // Metode untuk mencari cuaca
  search: function () {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
  },
};

// Event listener saat tombol pencarian ditekan
document.querySelector(".search button").addEventListener("click", function () {
  cuaca.search();
});

// Event listener saat tombol Enter ditekan di kolom pencarian
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    cuaca.search();
  }
});

// Mengambil data cuaca untuk kota "Medan" saat halaman dimuat
cuaca.fetchWeather("Medan");
