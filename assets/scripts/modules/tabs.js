export function createTabList(parent, tabs = []) {}

export function createTab(tabItem) {
	tabItem.addEventListener("click", function (event) {
		const target = event.target;

		// Check if the clicked element is tab__close, tab__close img, tab__top, or tab__title
		const isCloseButton =
			target.classList.contains("tab__close") ||
			(target.tagName === "IMG" && target.closest(".tab__close")) ||
			target.classList.contains("tab__top") ||
			target.classList.contains("tab__title");

		// Close the tab if the correct element was clicked
		if (tabItem.classList.contains("active") && isCloseButton) {
			tabItem.classList.remove("active");
			tabItem.classList.add("closed");
		} else if (!tabItem.classList.contains("active")) {
			tabItem.classList.add("active");
			tabItem.classList.remove("closed");
		}
	});
}

// const tabBlock = document.querySelectorAll(".question__tab");
// for (let i = 0; i < tabBlock.length; i++) {
// 	tabBlock[i].addEventListener("click", function () {
// 		if (tabBlock[i].classList.contains("active")) {
// 			removeActive(tabBlock);
// 		} else {
// 			removeActive(tabBlock);
// 			tabBlock[i].classList.add("active");
// 		}
// 	});
// }

// function removeActive(elem) {
// 	for (let i = 0; i < elem.length; i++) {
// 		if (elem[i].classList.contains("active")) {
// 			elem[i].classList.remove("active");
// 		}
// 	}
// }
