const feeReceiptForm = document.getElementById("feeReceiptForm");
const semesterSelect = document.getElementById("semesterSelect");
const message = document.getElementById("message");

function populateSemesterOptions() {
	const semesters = ["Spring 2023", "Summer 2023", "Fall 2023"];
	semesters.forEach((semester) => {
		const option = document.createElement("option");
		option.value = semester.toLowerCase().replace(/\s/g, "_");
		option.text = semester;
		semesterSelect.appendChild(option);
	});
}

populateSemesterOptions();

feeReceiptForm.addEventListener("submit", function (event) {
	event.preventDefault();
	const selectedSemester = semesterSelect.value;

	message.textContent = `Receipt for ${selectedSemester} fetched.`;
});
