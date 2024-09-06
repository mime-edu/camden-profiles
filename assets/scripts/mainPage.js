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
