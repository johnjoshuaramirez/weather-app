const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

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
   api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e4ee73f3b3b62a5cbfafd70ca95801ca`;
   loadData();
}

function onError(error) {
   infoTxt.innerText = error.message;
   infoTxt.classList.add("error");
}

async function requestAPI(city) {
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e4ee73f3b3b62a5cbfafd70ca95801ca`;
   loadData();
}

async function loadData() {
   infoTxt.innerText = "Getting weather details...";
   infoTxt.classList.add("pending");

   const res = await fetch(api, {mode: "cors"});
   const data = await res.json();
   weatherDetails(data);
}

function weatherDetails(info) {
   infoTxt.classList.replace("pending", "error");
   if (info.cod === "404") {
      infoTxt.innerText = `${inputField.value} isn't a valid city name`;
   } else {
      const city = info.name;
      const country = info.sys.country;
      const { description, id} = info.weather[0];
      const { feels_like, humidity, temp } = info.main;

      if (id == 800) {
         wIcon.src = "icons/clear.svg";
      } else if (id >= 200 && id <= 232) {
         wIcon.src = "icons/storm.svg";
      } else if (id >= 600 && id <= 622) {
         wIcon.src = "icons/snow.svg";
      } else if (id >= 701 && id <= 781) {
         wIcon.src = "icons/haze.svg";
      } else if (id >= 801 && id <= 804) {
         wIcon.src = "icons/cloud.svg";
      } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
         wIcon.src = "icons/rain.svg";
      }

      wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
      wrapper.querySelector(".weather").innerText = description;
      wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
      wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
      wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
      
      infoTxt.classList.remove("pending", "error");
      wrapper.classList.add("active");
      console.log(info);
   }
}

arrowBack.addEventListener("click", () => {
   wrapper.classList.remove("active");
});


