import { createTab } from "./modules/tabs.js";
const { createApp, ref } = Vue;

let map = null;
let schoolMarkers = [];

document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("./schools.json");
	const staticSchools = await response.json();
	let schools = ref(staticSchools);
	let filterOverlayData = ref(getFiltersFields(staticSchools));

	// Vue.js app initialization
	createApp({
		setup() {
			return { schools, filterOverlayData };
		},
	}).mount("#mainPage");

	// Tab item setup
	let mainPageTabItem = document.querySelector(".hero__tab");
	if (mainPageTabItem) {
		createTab(mainPageTabItem);
	}

	// init view state
	handleViewChange(staticSchools);
	schools.value = handleFilters(staticSchools);

	// add listener on search line to change view and filters
	window.addEventListener("popstate", () => {
		handleViewChange(staticSchools);
		schools.value = handleFilters(staticSchools);
	});

	// Main page navigation button (change list to map)
	let navButton = document.querySelector(".navigation__button");
	if (navButton) {
		navButton.addEventListener("click", function () {
			const urlParams = new URLSearchParams(window.location.search);
			let newView = navButton.classList.contains("map") ? "list" : "map";
			urlParams.set("view", newView);

			window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);

			handleViewChange(staticSchools);
		});
	}

	// search by name or post code
	document.getElementById("searchSchoolInput")?.addEventListener("input", (event) => {
		schools.value = findSchools(event.target.value, staticSchools);
		drawMap(schools.value);
	});

	// FilterOverlay setup
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

	// applyFilters
	let applyFiltersButton = document.querySelector(".filter-accept");
	if (applyFiltersButton) {
		applyFiltersButton.addEventListener("click", function () {
			schools.value = filterSchools(staticSchools);
			closeFilterOverlay();
		});
	}
	// resetFilters
	let resetFiltersButton = document.querySelector(".filter-clear");
	if (resetFiltersButton) {
		resetFiltersButton.addEventListener("click", function () {
			schools.value = staticSchools;
			clearFilerOverlayCheckboxes();
			closeFilterOverlay();
		});
	}
});

// change view
function handleViewChange(staticSchools) {
	const urlParams = new URLSearchParams(window.location.search);
	let viewType = urlParams.get("view") || "list";

	let navButton = document.querySelector(".navigation__button");
	let mapBlock = document.querySelector(".schools-info__map");
	let listBlock = document.querySelector(".schools-info__list");

	if (viewType === "map") {
		navButton.classList.add("map");
		navButton.classList.remove("list");
		mapBlock.classList.remove("_hidden");
		listBlock.classList.add("_hidden");
		navButton.innerHTML = `<img src="./assets/imgs/list-icon.png" alt="" /><span>List</span>`;
		drawMap(staticSchools);
	} else {
		navButton.classList.remove("map");
		navButton.classList.add("list");
		mapBlock.classList.add("_hidden");
		listBlock.classList.remove("_hidden");
		navButton.innerHTML = `<img src="./assets/imgs/map-icon.png" alt="" /><span>Map</span>`;
	}
}

function handleFilters(schools) {
	const urlParams = new URLSearchParams(window.location.search);
	let phase = urlParams.get("phase") || null;

	if (phase == "primary") {
		return schools.filter((school) => {
			return school.isPrimary == true;
		});
	} else if (phase == "secondary") {
		return schools.filter((school) => {
			return school.isPrimary == false;
		});
	} else {
		return schools;
	}
}

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

function clearFilerOverlayCheckboxes() {
	let filterOverlay = document.querySelector(".filter-overlay");
	if (filterOverlay) {
		let checkboxes = filterOverlay.querySelectorAll("input[type=checkbox]");
		for (const input of checkboxes) {
			input.checked = false;
		}
		let ageRangeInput = filterOverlay.querySelector(".age-range-input");
		if (ageRangeInput) {
			ageRangeInput.value = ageRangeInput.min;
			document.querySelector(".age-range .minValue").innerText = ageRangeInput.value;
		}
	}
}

// filter schools
function filterSchools(schools) {
	let ageRangeValue = document.querySelector(".age-range-input");
	if (ageRangeValue) {
		ageRangeValue = +ageRangeValue.value;
	}

	let schoolTypeValues = [];
	document.querySelectorAll(".school-type-filters button").forEach((button) => {
		let buttonScheckbox = button.querySelector('input[type="checkbox"]');
		if (buttonScheckbox && buttonScheckbox.checked == true) {
			schoolTypeValues.push(button.innerText);
		}
	});

	let genderValues = [];
	document.querySelectorAll(".genders-filters button").forEach((button) => {
		let buttonScheckbox = button.querySelector('input[type="checkbox"]');
		if (buttonScheckbox && buttonScheckbox.checked == true) {
			genderValues.push(button.innerText);
		}
	});

	let facilitiesValues = [];
	document.querySelectorAll(".facilities-filter button").forEach((button) => {
		let buttonScheckbox = button.querySelector('input[type="checkbox"]');
		if (buttonScheckbox && buttonScheckbox.checked == true) {
			facilitiesValues.push(button.innerText);
		}
	});

	let minSchoolsAge = 100;
	schools.forEach((school) => {
		const [minAge, maxAge] = school.ageRange;
		if (minSchoolsAge > minAge) {
			minSchoolsAge = minAge;
		}
	});

	let filteredSchools = schools.filter((school) => {
		const [minAge, maxAge] = school.ageRange;

		let ageMatch = ageRangeValue >= minAge && ageRangeValue <= maxAge;
		if (ageRangeValue == minSchoolsAge) {
			ageMatch = true;
		}

		const facilitiesMatch = facilitiesValues.length === 0 || facilitiesValues.some((type) => school.facilities.includes(type));
		const genderMatch = genderValues.length === 0 || genderValues.includes(school.gender);
		const schoolTypeMatch = schoolTypeValues.length === 0 || schoolTypeValues.includes(school.type);

		return ageMatch && facilitiesMatch && genderMatch && schoolTypeMatch;
	});

	return filteredSchools;
}

function findSchools(query, schools) {
	const lowerQuery = query.toLowerCase();

	const filteredSchools = schools.filter((school) => {
		const matchesName = school.schoolName.toLowerCase().includes(lowerQuery);
		const matchesPostalCode = school.postCode.toLowerCase().includes(lowerQuery);

		return matchesName || matchesPostalCode;
	});

	return filteredSchools;
}

function drawMap(staticSchools) {
	if (!map) {
		map = L.map("map", {
			zoomControl: false,
			attributionControl: false,
		}).setView([51.50603, -0.12285], 11);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);
	}

	redrawSchools(staticSchools);
}

function redrawSchools(staticSchools) {
	schoolMarkers.forEach((marker) => map.removeLayer(marker));
	schoolMarkers = [];

	staticSchools.forEach((school) => {
		let marker = L.circleMarker([school.lat, school.long], {
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
                    <div class="school-item__footer">
                        <a class="link" href="/school?schoolId=${school.schoolId}">
                            <span>View school details</span> 
                            <img src="./assets/imgs/arrow-outward.png" alt="arrow" />
                        </a>
                    </div>
                </div>`
			)
			.addTo(map);

		schoolMarkers.push(marker);
	});
}

function getFiltersFields(schools) {
	// get schools age ranges
	const ageRanges = schools.map((school) => school.ageRange);
	const minAge = Math.min(...ageRanges.map((range) => range[0]));
	const maxAge = Math.max(...ageRanges.map((range) => range[1]));

	// get schools types
	const schoolTypes = [...new Set(schools.map((school) => school.type))];

	// get schools genders
	const schoolGenders = [
		...new Set(
			schools.map((school) => {
				return school.gender;
			})
		),
	];

	// get schools facilities
	let schoolFacilities = [...new Set(schools.flatMap((school) => school.facilities))];
	// console.log(schoolFacilities);

	return { ageRange: [minAge, maxAge], schoolTypes: schoolTypes, genders: schoolGenders, facilities: schoolFacilities };
}
