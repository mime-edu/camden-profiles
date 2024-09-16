import { createTab } from "./modules/tabs.js";
const { createApp, ref } = Vue;
// let schools = ref([{ title: "School" }, { title: "School1" }, { title: "School2" }, { title: "School3" }]);
document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("./schools.json");
	let schools = ref(await response.json());

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
			}
		});
	}

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

	// Age range input handling
	let ageRangeInput = document.querySelector(".age-range-input");
	if (ageRangeInput) {
		ageRangeInput.addEventListener("input", function () {
			document.querySelector(".age-range .minValue").innerText = ageRangeInput.value;
		});
	}
});
