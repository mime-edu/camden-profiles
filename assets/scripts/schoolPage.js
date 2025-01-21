import { createTab } from "./modules/tabs.js";
const { createApp, ref } = Vue;

document.addEventListener("DOMContentLoaded", async function () {
	const currentUrl = new URL(window.location.href);
	const baseURL = `${currentUrl.origin}`;

	const response = await fetch("./../schools.json");

	let schools = await response.json();
	const urlParams = new URLSearchParams(window.location.search);
	let schoolId = urlParams.get("schoolId");
	if (!schoolId) {
		schoolId = 0;
		location.href = `${location.origin}`;
	}
	let school = ref(schools.find((el) => el.schoolId == schoolId) || null);

	if (!school.value) {
		schoolId = 0;
		location.href = `${location.origin}`;
	}

	school.value.schoolLink = `${baseURL}/school/?schoolId=${school.value.schoolId}`;

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

	let openPopupButtons = document.querySelectorAll("div[open-share-popup]");
	openPopupButtons.forEach((button) => {
		button.addEventListener("click", function () {
			let popupwrapper = document.querySelector(".popup-wrapper");
			if (popupwrapper) {
				popupwrapper.classList.remove("hidden");
				popupwrapper.classList.add("active");
			}
		});
	});

	// share popup
	let popupwrapper = document.querySelector(".popup-wrapper");
	let sharePopup = popupwrapper.querySelector(".share-popup");
	if (sharePopup) {
		let closePopupButton = document.querySelector("button[close-popup]");
		console.log(closePopupButton);

		if (closePopupButton) {
			closePopupButton.addEventListener("click", (e) => {
				e.preventDefault();
				popupwrapper.classList.add("hidden");
				popupwrapper.classList.remove("active");
			});
		}

		// copy link
		let shareLinkButton = sharePopup.querySelector(".share-link-wrapper");
		if (shareLinkButton) {
			shareLinkButton.addEventListener("click", function () {
				const inputElement = document.getElementById("share-link");
				if (inputElement) {
					const valueToCopy = inputElement.value;
					navigator.clipboard.writeText(valueToCopy).then(() => {
						inputElement.value = "Copied!";
						setTimeout(() => {
							inputElement.value = valueToCopy;
						}, 500);
					});
				}
			});
		}

		// generate qr code
		const popupQRcode = new QRCode(sharePopup.querySelector(".popup__qrcode"), {
			text: school.value.schoolLink,
			colorDark: "#ed4d8b",
			colorLight: "#ffffff",
			width: 160,
			height: 160,
		});
	}
});
