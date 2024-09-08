import { createTab } from "./tabs.js";

let mainPageTabItem = document.querySelector(".hero__tab");
if (mainPageTabItem) {
	createTab(mainPageTabItem);
}
// main page navigation button (change list to map)
let navButton = document.querySelector(".navigation__button");
if (navButton) {
	let mapBlock = document.querySelector(".schools-info__map");
	let listBlock = document.querySelector(".schools-info__list");
	navButton.addEventListener("click", function () {
		console.log("1");
		if (navButton.classList.contains("map")) {
			console.log(2);
			navButton.classList.remove("map");
			navButton.classList.add("list");
			mapBlock.classList.add("_hidden");
			listBlock.classList.remove("_hidden");
			navButton.innerHTML = `<img src="./assets/imgs/map-icon.png" alt="" /><span>Map</span>`;
		} else if (navButton.classList.contains("list")) {
			console.log(3);
			navButton.classList.add("map");
			navButton.classList.remove("list");
			mapBlock.classList.remove("_hidden");
			listBlock.classList.add("_hidden");
			navButton.innerHTML = `<img src="./assets/imgs/list-icon.png" alt="" /><span>List</span>    `;
		}
	});
}

// close/open filter overlay
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

// close filter overlay
function closeFilterOverlay() {
	let filterOverlay = document.querySelector(".filter-overlay");
	if (!filterOverlay) {
		return;
	}
	filterOverlay.classList.remove("_active");
	filterOverlay.classList.add("_closed");
}
// open filter overlay
function openFilterOverlay() {
	let filterOverlay = document.querySelector(".filter-overlay");
	if (!filterOverlay) {
		return;
	}

	filterOverlay.classList.remove("_closed");
	filterOverlay.classList.add("_active");
}
