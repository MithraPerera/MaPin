"use strict";

const form = document.querySelector(".form");
const containerLocations = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDays = document.querySelector(".form__input--days");
const inputCompany = document.querySelector(".form__input--company");

let map, mapEvent; //so that we can use in the global scope

if (navigator.geolocation)
	navigator.geolocation.getCurrentPosition(
		function (position) {
			const { latitude } = position.coords;
			const { longitude } = position.coords;
			console.log(latitude, longitude);
			const coords = [latitude, longitude];
			//Leaflet Starter Code
			map = L.map("map").setView(coords, 5);

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			//Handling Clicks on Map
			map.on("click", function (mapE) {
				//reassign the global variable to have the coordinates
				//that come from mapE
				mapEvent = mapE;
				//first show the sidebar popup
				form.classList.remove("hidden");
				//make the focus be on the Days
				inputDays.focus();
			});
		},
		function () {
			alert("Could not retrieve position");
		}
	);

form.addEventListener("submit", function (e) {
	//need so that the page doesn't reload and the pin gets erased
	e.preventDefault();
	//Clear input field
	inputDays.value = "";
	//Display pin
	const { lat, lng } = mapEvent.latlng;

	L.marker([lat, lng])
		.addTo(map)
		.bindPopup(
			L.popup({
				maxWidth: 100,
				minWidth: 50,
				autoClose: false,
				closeOnClick: false,
				className: "vacation-popup",
			})
		)
		.setPopupContent("🏖 Vacation")
		.openPopup();
});

inputType.addEventListener("change", function () {
	//we want to toggle which label shows so we use DOM Traversal
	inputCompany.closest(".form__row").classList.toggle("form__row--hidden");
	inputDays.closest(".form__row").classList.toggle("form__row--hidden");
});
