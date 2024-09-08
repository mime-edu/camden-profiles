import { createTab } from "./tabs.js";
let tabsBlock = document.querySelector(".tabs-block");
if (tabsBlock) {
	let tabsAboutSchool = tabsBlock.querySelectorAll(".tab");
	for (const tab of tabsAboutSchool) {
		createTab(tab);
	}
}
