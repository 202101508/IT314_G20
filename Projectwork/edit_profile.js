// edit_student_detail.js

document.addEventListener('DOMContentLoaded', function () {
    const editForm = document.getElementById('edit-profile-form');

    editForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Retrieve form data
        const formData = new FormData(editForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send the form data to the server using fetch or any AJAX library
        fetch('/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
            // Handle the response from the server, e.g., show success message or handle errors
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
