const { createApp, ref } = Vue;

document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("./../schools.json");
	let schools = await response.json();
	const urlParams = new URLSearchParams(window.location.search);

	let schoolId = urlParams.get("schoolId");
	if (!schoolId) {
		schoolId = 0;
	}
	let school = ref(
		schools.find((el) => {
			return el.schoolId == schoolId;
		})
	);
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
});
