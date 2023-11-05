

    const feeReceiptForm = document.getElementById('feeReceiptForm');
    const semesterSelect = document.getElementById('semesterSelect');
    const message = document.getElementById('message');

   
    function fetchSemesters() {
        fetch('/semesters')
            .then(response => response.json())
            .then(data => {
                // Populate the dropdown with the available semesters
                data.forEach(semester => {
                    const option = document.createElement("option");
                    option.value = semester;
                    option.text = semester;
                    semesterSelect.appendChild(option);
                });
            })
            .catch(error => {
                message.textContent = 'An error occurred while fetching the list of semesters.';
            });
    }

    // Event listener for form submission
    feeReceiptForm.addEventListener('submit', function (event) {
        event.preventDefault();
        fetchFeeReceipt();
    });

    // Populate the semester dropdown with the available semesters
    fetchSemesters();

