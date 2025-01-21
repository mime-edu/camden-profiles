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
	openPopupButton.addEventListener("click", function () {
		let popupwrapper = document.querySelector(".popup-wrapper");
		if (popupwrapper) {
			popupwrapper.classList.remove("hidden");
			popupwrapper.classList.add("active");
		}
	});

	let popupwrapper = document.querySelector(".popup-wrapper");
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
});
