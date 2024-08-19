let apiKey = "e25ddb66337bc8c7f6c572ffe0527d30";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let searchInput = document.getElementById("search_input");
let searchButton = document.getElementById("search_btn");
let darkMode = document.getElementById("darkMode_btn");
darkMode.addEventListener("click",()=>{
    document.body.style.backgroundColor = "black"
})
let lightMode = document.getElementById("lightMode_btn");
lightMode.addEventListener("click",()=>{
    document.body.style.backgroundColor = "white"
})

let weatherData = async (lat, lon) => {
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    let response = await fetch(forecastApiUrl);
    let data = await response.json();
    console.log(data);

    let forecastContainer = document.getElementById("Future_data").querySelector(".row");
    forecastContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        let dayData = data.list[i * 8];
        let temp = Math.round(dayData.main.temp);
        let description = dayData.weather[0].description;
        let iconCode = dayData.weather[0].icon;
        let dayName = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

        forecastContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
                <div class="card future-weather-card mx-auto">
                    <div class="card-body text-center">
                        <h5 class="card-title">${dayName}</h5>
                        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" class="weather-icon mb-2">
                        <p class="card-text">${temp}°C</p>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            </div>`;
    }
};

async function check(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    // console.log(data);

    document.querySelector('.card-title').innerHTML = data.name;
    let temperature_value = Math.round(data.main.temp);
    document.querySelector('.temp_display').innerHTML = `${temperature_value}`;
    document.querySelector('.card-text').innerHTML = data.weather[0].description;

    let weatherImg = document.getElementById("weatherImg");
    if (temperature_value < 0) {
        weatherImg.src = 'img/freezing.jpg';
    } else if (temperature_value >= 0 && temperature_value < 10) {
        weatherImg.src = 'img/Cold.jpg';
    } else if (temperature_value >= 10 && temperature_value < 20) {
        weatherImg.src = 'img/Cool.jpg';
    } else if (temperature_value >= 20 && temperature_value < 30) {
        weatherImg.src = 'img/Warm.jpg';
    } else {
        weatherImg.src = 'img/Hot.jpg';
    }

    let degree_celsius = document.getElementById("degree_celsius");
    degree_celsius.addEventListener("click", () => {
        document.querySelector('.temp_display').innerHTML = `${temperature_value}°C`;
    });

    let fareinheit = document.getElementById("fahreinheit");
    fareinheit.addEventListener("click", () => {
        let temperature_fahrenheit = (temperature_value * 1.8) + 32;
        document.querySelector('.temp_display').innerHTML = `${temperature_fahrenheit.toFixed(2)}°F`;
    });

    await weatherData(data.coord.lat, data.coord.lon);
}

searchButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        let city = searchInput.value;
        await check(city);
    }
    catch {
        alert("Enter city name correctly")
    }
});
