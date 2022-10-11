const wrapper = document.querySelector(".wrapper"),
arrowBack = wrapper.querySelector(".header i"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),weatherIcon = weatherPart.querySelector("img");

let api;

inputField.addEventListener("keyup", e => {
   if (e.key == "Enter" && inputField.value !== "") {
      requestAPI(inputField.value);
   }
});

locationBtn.addEventListener("click", () => {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
   } else {
      alert("Your browser does not support geolocation api");
   }
});

function onSuccess(position) {
   const lat = position.coords.latitude;
   const lon = position.coords.longitude;
   const api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit={limit}&appid=e4ee73f3b3b62a5cbfafd70ca95801ca`
}

function onError(error) {
   infoTxt.innerText = error.message;
   infoTxt.classList.add("error");
}

async function requestAPI(city) {
   const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e4ee73f3b3b62a5cbfafd70ca95801ca`;
}

async function loadData() {
   infoTxt.innerText = "Getting weather details...";
   infoTxt.classList.add("pending");

   const res = await fetch(api, {mode: "cors"});
   const data = await res.json();
   weatherDetails(data);
}

function weatherDetails(info) {
   console.log(info);
}


