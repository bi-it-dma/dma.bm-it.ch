//form.js

// Function that prevents the form from opening a new tab and creates text below it
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Create a FormData object to capture form data
    let formData = new FormData(this);

    // Send form data via AJAX
    fetch('/src/php/send-email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Expect text response from PHP
    .then(data => {
        // Displays the message in the div box under the form
        document.getElementById('messageBox').innerHTML = data;

        // Reset the form fields
        this.reset();
    })
    // If error
    .catch(error => {
        document.getElementById('messageBox').innerHTML = "An error occurred. Please try again.";
    });
});