const { createApp, ref } = Vue;

document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("../../schools.json");
	let schools = await response.json();
	let schoolId = 1;
	let school = ref(
		schools.find((el) => {
			return el.schoolId == schoolId;
		})
	);
	let currentInfoBlock = ref(1);
	createApp({
		setup() {
			return { school, currentInfoBlock: currentInfoBlock };
		},
	}).mount("#schoolContext");

	// page functions

	const checkbox = document.querySelector("#switch2");
	const comparisonsItems = document.querySelectorAll(".stats-sector__comparisons");

	checkbox.addEventListener("change", function () {
		if (checkbox.checked) {
			for (const item of comparisonsItems) {
				item.classList.remove("_hidden");
			}
		} else {
			for (const item of comparisonsItems) {
				item.classList.add("_hidden");
			}
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
