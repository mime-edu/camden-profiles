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

	createApp({
		setup() {
			return { school };
		},
	}).mount("#supportPage");

	// popup
	let openPopupButton = document.querySelector("button[open-popup]");
	if (openPopupButton) {
		openPopupButton.addEventListener("click", function () {
			let popupwrapper = document.querySelector(".popup-wrapper");
			if (popupwrapper) {
				popupwrapper.classList.remove("hidden");
				popupwrapper.classList.add("active");
			}
		});
	}

	let popupwrapper = document.querySelector(".popup-wrapper");
	if (popupwrapper) {
		let popup = popupwrapper.querySelector(".popup");
		if (popup) {
			let closePopupButton = document.querySelector("button[close-popup]");
			if (closePopupButton) {
				closePopupButton.addEventListener("click", (e) => {
					e.preventDefault();
					popupwrapper.classList.add("hidden");
					popupwrapper.classList.remove("active");
				});
			}
		}
	}

	// tooltips
	document.querySelectorAll(".info-tag").forEach((tag) => {
		tag.addEventListener("mouseenter", function () {
			const tooltip = this.querySelector(".tooltip");
			if (!tooltip) {
				return;
			}
			tooltip.classList.remove("left", "right");

			const tooltipRect = tooltip.getBoundingClientRect();
			const viewportWidth = window.innerWidth;

			if (tooltipRect.left < 0) {
				tooltip.classList.add("right");
				tooltip.classList.remove("left");
			} else if (tooltipRect.right > viewportWidth) {
				tooltip.classList.add("left");
				tooltip.classList.remove("right");
			} else {
				tooltip.classList.remove("left", "right");
			}
		});
	});
});
