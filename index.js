let apiKey = "e25ddb66337bc8c7f6c572ffe0527d30";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let searchInput = document.getElementById("search_input")
let searchButton = document.getElementById("search_btn")
async function check(city){
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    let data = await response.json();
    console.log(data);
    document.querySelector('.card-title').innerHTML=data.name;
    let temperature_value = document.querySelector('.temp_display').innerHTML=Math.round(data.main.temp);
    let degree_celsius = document.getElementById("degree_celsius")
    degree_celsius.addEventListener("click",()=>{
        document.querySelector('.temp_display').innerHTML=`${temperature_value}°C`
    })
    let fareinheit = document.getElementById("fahreinheit")
    fareinheit.addEventListener("click",()=>{
        let temparature_fareinheit = (temperature_value*1.8)+32
         document.querySelector('.temp_display').innerHTML=`${temparature_fareinheit}°F`
    })
    document.querySelector('.card-text').innerHTML=data.weather[0].description;
}
searchButton.addEventListener("click",(e)=>{
    e.preventDefault()
    check(searchInput.value)
})

// let number = 32;
// let output = (number*1.8)+32;
// console.log(output);
