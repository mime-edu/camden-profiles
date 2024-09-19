import { createTab } from "./modules/tabs.js";
const { createApp, ref } = Vue;
// let schools = ref([{ title: "School" }, { title: "School1" }, { title: "School2" }, { title: "School3" }]);
document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("./schools.json");
	const staticSchools = await response.json();
	let schools = ref(staticSchools);

	// Vue.js app initialization
	createApp({
		setup() {
			return { schools };
		},
	}).mount("#mainPage");

	// Tab item setup
	let mainPageTabItem = document.querySelector(".hero__tab");
	if (mainPageTabItem) {
		createTab(mainPageTabItem);
	}

	// Main page navigation button (change list to map)
	let navButton = document.querySelector(".navigation__button");
	if (navButton) {
		let mapBlock = document.querySelector(".schools-info__map");
		let listBlock = document.querySelector(".schools-info__list");
		navButton.addEventListener("click", function () {
			if (navButton.classList.contains("map")) {
				navButton.classList.remove("map");
				navButton.classList.add("list");
				mapBlock.classList.add("_hidden");
				listBlock.classList.remove("_hidden");
				navButton.innerHTML = `<img src="./assets/imgs/map-icon.png" alt="" /><span>Map</span>`;
			} else if (navButton.classList.contains("list")) {
				navButton.classList.add("map");
				navButton.classList.remove("list");
				mapBlock.classList.remove("_hidden");
				listBlock.classList.add("_hidden");
				navButton.innerHTML = `<img src="./assets/imgs/list-icon.png" alt="" /><span>List</span>`;
				drawMap(staticSchools);
			}
		});
	}

	// search by name or post code

	document.getElementById("searchSchoolInput")?.addEventListener("input", (event) => {
		schools.value = filterSchools(event.target.value, staticSchools);
	});

	// Filter overlay setup
	let openFilterOverlayBtn = document.querySelector(".schools-filter__button");
	if (openFilterOverlayBtn) {
		openFilterOverlayBtn.addEventListener("click", openFilterOverlay);
	}

	let filterOverlay = document.querySelector(".filter-overlay");
	if (filterOverlay) {
		let closeButton = filterOverlay.querySelector(".filter-overlay__close");
		if (closeButton) {
			closeButton.addEventListener("click", closeFilterOverlay);
		}
	}

	// Age range input handling
	let ageRangeInput = document.querySelector(".age-range-input");
	if (ageRangeInput) {
		ageRangeInput.addEventListener("input", function () {
			document.querySelector(".age-range .minValue").innerText = ageRangeInput.value;
		});
	}
});

// Close filter overlay function
function closeFilterOverlay() {
	let filterOverlay = document.querySelector(".filter-overlay");
	if (!filterOverlay) {
		return;
	}
	filterOverlay.classList.remove("_active");
	filterOverlay.classList.add("_closed");
}

// Open filter overlay function
function openFilterOverlay() {
	let filterOverlay = document.querySelector(".filter-overlay");
	if (!filterOverlay) {
		return;
	}
	filterOverlay.classList.remove("_closed");
	filterOverlay.classList.add("_active");
}

function filterSchools(query, schools) {
	const lowerQuery = query.toLowerCase();

	const filteredSchools = schools.filter((school) => {
		const matchesName = school.schoolName.toLowerCase().includes(lowerQuery);
		const matchesPostalCode = school.postCode.toLowerCase().includes(lowerQuery);

		return matchesName || matchesPostalCode;
	});

	return filteredSchools;
}

function drawMap(staticSchools) {
	let map = L.map("map", {
		zoomControl: false,
		attributionControl: false,
	}).setView([51.50603, -0.12285], 11);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	staticSchools.forEach((school) => {
		L.circleMarker([school.lat, school.long], {
			color: "white",
			fillColor: "#ff0077",
			fillOpacity: 1,
			radius: 10,
		})
			.bindPopup(
				`<div class="schools-list_item school-item school-item-as-popup">
					<div class="school-item__header">
						<img src="./assets/imgs/school-logo.png" alt="school-logo" />
						<h4 class="school-item__name">Demo School</h4>
					</div>
					<p class="school-itemy__description">We want our pupils to become informed, articulate and empowered citizens.</p>
					<div class="school-item__info-row info-row">
						<div class="info-row__item">
							<p>Age Range</p>
							<span>4-11</span>
						</div>
						<div class="info-row__item">
							<p>School Type</p>
							<span>Roman Catholic</span>
						</div>
						<div class="info-row__item">
							<p>Sex</p>
							<span>Mixed</span>
						</div>
					</div>
					<div class="school-item__footer">
						<a class="link" href="/school"
							><span>View school details</span> <img src="./assets/imgs/arrow-outward.png" alt="arrow"
						/></a>
					</div>
				</div>`
			)
			.addTo(map);
	});
}
