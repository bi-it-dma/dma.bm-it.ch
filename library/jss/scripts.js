
//Language switch
document.addEventListener('DOMContentLoaded', () => {
    const englishImage = document.getElementById('en_img');
    const germanImage = document.getElementById('de_img');
    const englishContent = document.querySelectorAll('.lang.en');
    const germanContent = document.querySelectorAll('.lang.de');
    const htmlTag = document.documentElement; // Get the <html> tag

    // Function to hide all language content
    function hideAllContent() {
        document.querySelectorAll('.lang').forEach((element) => {
            element.classList.remove('active');
        });
    }

    // Show English content and update <html lang> when the English image is clicked
    englishImage.addEventListener('click', () => {
        hideAllContent();
        htmlTag.setAttribute('lang', 'en'); // Update <html lang="en">
        englishContent.forEach((element) => {
            element.classList.add('active');
        });
    });
    englishImage.addEventListener('touchend', () => {
        hideAllContent();
        htmlTag.setAttribute('lang', 'en'); // Update <html lang="en">
        englishContent.forEach((element) => {
            element.classList.add('active');
        });
    });

    // Show German content and update <html lang> when the German image is clicked
    germanImage.addEventListener('click', () => {
        hideAllContent();
        htmlTag.setAttribute('lang', 'de'); // Update <html lang="de">
        germanContent.forEach((element) => {
            element.classList.add('active');
        });
    });
    germanImage.addEventListener('touchend', () => {
        hideAllContent();
        htmlTag.setAttribute('lang', 'de'); // Update <html lang="de">
        germanContent.forEach((element) => {
            element.classList.add('active');
        });
    });

    // Default to showing English content on load
    hideAllContent();
    htmlTag.setAttribute('lang', 'en'); // Set default language to English on load
    englishContent.forEach((element) => {
        element.classList.add('active');
    });
    // Add event listeners for PC buttons
    englishImagePc.addEventListener('click', () => switchLanguage('en'));
    germanImagePc.addEventListener('click', () => switchLanguage('de'));

    // Add event listeners for mobile buttons
    englishImageMobile.addEventListener('click', () => switchLanguage('en'));
    englishImageMobile.addEventListener('touchend', () => switchLanguage('en'));

    germanImageMobile.addEventListener('click', () => switchLanguage('de'));
    germanImageMobile.addEventListener('touchend', () => switchLanguage('de'));

});

//function that prevents the form from opening a new tab and creates text below it
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Create a FormData object to capture form data
    let formData = new FormData(this);

    // Send form data via AJAX (Fetch API)
    fetch('/library/php/send-email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Expect text response from PHP
    .then(data => {
        // displays the message in the div box under the form
        document.getElementById('messageBox').innerHTML = data;
    })
    .catch(error => {
        // if error
        document.getElementById('messageBox').innerHTML = "An error occurred. Please try again.";
    });
});

// anchor link
document.querySelectorAll('.anchor').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('data-target'));
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});