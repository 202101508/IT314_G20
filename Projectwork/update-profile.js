

document.getElementById("edit-profile-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(this);

    fetch('/update-profile', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server here
        alert("Profile updated successfully!");
    })
    .catch(error => {
        console.error('Error:', error);
    });
});