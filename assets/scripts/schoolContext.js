const { createApp, ref } = Vue;

document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("./../schools.json");
	let schools = await response.json();
	const urlParams = new URLSearchParams(window.location.search);

	let schoolId = urlParams.get("schoolId");
	if (!schoolId) {
		schoolId = 0;
		location.href = `${location.origin}`;
	}
	let school = ref(schools.find((el) => el.schoolId == schoolId) || null);

	if (!school.value) {
		schoolId = 0;
		location.href = `${location.origin}`;
	}

	let showComparisonsInfo = ref(false);
	let currentInfoBlock = ref(1);

	createApp({
		setup() {
			return { school, currentInfoBlock: currentInfoBlock, showComparisonsInfo };
		},
	}).mount("#schoolContext");

	// page functions

	const checkbox = document.querySelector("#switch2");

	checkbox.addEventListener("change", function () {
		if (checkbox.checked) {
			showComparisonsInfo.value = true;
		} else {
			showComparisonsInfo.value = false;
		}
	});

	// statistic change

	let statNavigation = document.querySelector(".statistics-nav");
	if (statNavigation) {
		let buttons = document.querySelectorAll(".statistics-nav__button");
		buttons.forEach((button) => {
			button.addEventListener("click", function () {
				for (const button of buttons) {
					button.classList.remove("active");
				}
				button.classList.add("active");
				currentInfoBlock.value = +button.getAttribute("currentBlock");
			});
		});
	}

	let lat = school._rawValue.lat;
	let long = school._rawValue.long;
	let catchmentRadius = school._rawValue.prevYearCatchmentRadius;

	let map = L.map("map", {
		zoomControl: false,
		attributionControl: false,
	}).setView([lat, long], 15);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	let circle = L.circle([lat, long], {
		color: "pink",
		fillColor: "#f28cb1",
		fillOpacity: 0.5,
		radius: 0,
	}).addTo(map);

	let centralMarker = L.circleMarker([lat, long], {
		color: "white",
		fillColor: "#ff0077",
		fillOpacity: 1,
		radius: 10,
	}).addTo(map);

	const mapCheckbox = document.querySelector("#switch1");

	mapCheckbox.addEventListener("change", function () {
		if (mapCheckbox.checked) {
			circle.setRadius(catchmentRadius);
		} else {
			circle.setRadius(0);
		}
	});
});
