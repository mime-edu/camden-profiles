const { createApp, ref } = Vue;
document.addEventListener("DOMContentLoaded", async function () {
	const response = await fetch("./../schools.json");
	let schools = await response.json();
	let schoolId = 1;
	let school = ref(
		schools.find((el) => {
			return el.schoolId == schoolId;
		})
	);
	createApp({
		setup() {
			return { school };
		},
	}).mount("#curriculumPage");
});
