import { createTab } from "./modules/tabs.js";
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
	let school = ref(
		schools.find((el) => {
			return el.schoolId == schoolId;
		})
	);

	// Vue.js app initialization
	createApp({
		setup() {
			return { school };
		},
	}).mount("#schoolPage");

	let tabsBlocks = document.querySelectorAll(".tabs-block");
	if (tabsBlocks) {
		tabsBlocks.forEach((tabsBlock) => {
			let tabsAboutSchool = tabsBlock.querySelectorAll(".tab");
			for (const tab of tabsAboutSchool) {
				createTab(tab);
			}
		});
	}

	const swiper = new Swiper(".tab-slider", {
		// Optional parameters
		direction: "horizontal",
		loop: false,
		autoHeight: true,
		// Enable mousewheel control for desktop (scroll through slides using mouse wheel)
		mousewheel: {
			invert: false,
		},

		// Enable grabbing cursor on desktop for drag-to-swipe
		grabCursor: true,

		// Show 1 full slide and a part of the next slide
		slidesPerView: 1.1, // Default for screens less than 460px
		spaceBetween: 10, // Space between slides (in pixels)

		// Enable keyboard navigation
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},

		// Autoplay configuration
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },

		// Speed of slide transition in milliseconds
		speed: 600,

		// Breakpoints to adjust slidesPerView based on screen width
		breakpoints: {
			// When the width is 460px or more, show 2 slides
			560: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
		},
	});
});
