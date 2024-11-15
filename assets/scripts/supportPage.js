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
	createApp({
		setup() {
			return { school };
		},
	}).mount("#supportPage");
});
