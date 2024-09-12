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
			// openStatisticsPage();
		});
	});
}

function openStatisticsPage() {
	let statisticsBlockWrapper = document.querySelector(".statistics-block");
	statisticsBlockWrapper.innerHTML = ``;
}
