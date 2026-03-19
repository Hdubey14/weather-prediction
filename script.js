const apiKey="85e2f8961b575da393f328f2c826f3ff";

/* CLOCK */
setInterval(()=>{
const now=new Date();
document.getElementById("clock").innerText=
now.toDateString()+" | "+now.toLocaleTimeString();
},1000);

/* SEARCH */
async function searchCity(){

const city=document.getElementById("cityInput").value;

const res=await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

const data=await res.json();

document.getElementById("weatherSection").classList.remove("hidden");

displayWeather(data);
getForecast(data.coord.lat,data.coord.lon);

}

/* DISPLAY */
function displayWeather(data){

document.getElementById("location").innerText=data.name;
document.getElementById("temp").innerText=data.main.temp+" °C";
document.getElementById("desc").innerText=data.weather[0].description;
document.getElementById("humidity").innerText=data.main.humidity+"%";
document.getElementById("wind").innerText=data.wind.speed+" m/s";

document.getElementById("icon").src=
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

}

/* FORECAST */
async function getForecast(lat,lon){

const res=await fetch(
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
);

const data=await res.json();

let html="";

for(let i=0;i<7;i++){
let item=data.list[i*4];

html+=`
<div class="card-item">
<p>${item.main.temp}°</p>
<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
</div>`;
}

document.getElementById("forecast").innerHTML=html;

}

/* MAP */
let map;

function openMap(){

document.getElementById("mapModal").style.display="block";
document.querySelector(".navbar").style.display="none";

if(!map){

map=L.map('map').setView([20.5937,78.9629],5);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

map.on("click",function(e){
getMapWeather(e.latlng.lat,e.latlng.lng);
});

}

}

/* MAP SEARCH */
async function searchMap(){

const city=document.getElementById("mapSearch").value;

const res=await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

const data=await res.json();

map.setView([data.coord.lat,data.coord.lon],8);

getMapWeather(data.coord.lat,data.coord.lon);

}

/* MAP WEATHER */
async function getMapWeather(lat,lon){

const res=await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
);

const data=await res.json();

document.getElementById("mapLocation").innerText=data.name;
document.getElementById("mapTemp").innerText=data.main.temp+" °C";
document.getElementById("mapHumidity").innerText=data.main.humidity+"%";
document.getElementById("mapWind").innerText=data.wind.speed+" m/s";

document.getElementById("mapIcon").src=
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

}

function closeMap(){
document.getElementById("mapModal").style.display="none";
document.querySelector(".navbar").style.display="flex";
}