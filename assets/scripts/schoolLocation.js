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
	}).mount("#schoolLocation");

	drawMap(school._rawValue);
});

function drawMap(school) {
	let map = L.map("map", {
		zoomControl: false,
		attributionControl: false,
	}).setView([school.lat, school.long], 12);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	L.circleMarker([school.lat, school.long], {
		color: "white",
		fillColor: "#ff0077",
		fillOpacity: 1,
		radius: 10,
	})
		.bindPopup(
			`<div class="schools-list_item school-item school-item-as-popup">
					<div class="school-item__header">
						<img src="${school.schoolLogo}" alt="school-logo" />
						<h4 class="school-item__name">${school.schoolName}</h4>
					</div>
					<p class="school-itemy__description">${school.shortSlogan}</p>
					<div class="school-item__info-row info-row">
						<div class="info-row__item">
							<p>Age Range</p>
							<span>${school.ageRange}</span>
						</div>
						<div class="info-row__item">
							<p>School Type</p>
							<span>${school.type}</span>
						</div>
						<div class="info-row__item">
							<p>Sex</p>
							<span>${school.gender}</span>
						</div>
					</div>
				</div>`
		)
		.addTo(map)
		.openPopup();
}
