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
		} else {
			navButton.classList.add("map");
			navButton.classList.remove("list");
			mapBlock.classList.remove("_hidden");
			listBlock.classList.add("_hidden");
			navButton.innerHTML = `<img src="./assets/imgs/list-icon.png" alt="" /><span>List</span>    `;
		}
	});
}
