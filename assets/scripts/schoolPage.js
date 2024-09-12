import { createTab } from "./modules/tabs.js";
let tabsBlock = document.querySelector(".tabs-block");
if (tabsBlock) {
	let tabsAboutSchool = tabsBlock.querySelectorAll(".tab");
	for (const tab of tabsAboutSchool) {
		createTab(tab);
	}
}

const swiper = new Swiper(".tab-slider", {
	// Optional parameters
	direction: "horizontal",
	loop: true,

	// Enable mousewheel control for desktop (scroll through slides using mouse wheel)
	mousewheel: {
		invert: false,
	},

	// Enable grabbing cursor on desktop for drag-to-swipe
	grabCursor: true,

	// Show 1 full slide and a part of the next slide
	slidesPerView: 1.1, // This will show a part of the next slide
	spaceBetween: 10, // Space between slides (in pixels)

	// Enable keyboard navigation
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},

	// Autoplay configuration
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},

	// Speed of slide transition in milliseconds
	speed: 600,
});
