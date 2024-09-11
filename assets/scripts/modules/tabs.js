export function createTabList(parent, tabs = []) {}

export function createTab(tabItem) {
	tabItem.addEventListener("click", function () {
		if (tabItem.classList.contains("active")) {
			tabItem.classList.remove("active");
			tabItem.classList.add("closed");
		} else {
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
