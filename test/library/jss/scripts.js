
//Language switch
document.addEventListener('DOMContentLoaded', () => {
    // Get the language buttons for both PC and mobile
    const englishImagePc = document.getElementById('en_img_pc');
    const germanImagePc = document.getElementById('de_img_pc');
    const englishImageMobile = document.getElementById('en_img_mobile');
    const germanImageMobile = document.getElementById('de_img_mobile');
    const htmlTag = document.documentElement;

    // Get all language content
    const englishContent = document.querySelectorAll('.lang.en');
    const germanContent = document.querySelectorAll('.lang.de');

    // Function to hide all language content
    function hideAllContent() {
        englishContent.forEach((element) => element.classList.remove('active'));
        germanContent.forEach((element) => element.classList.remove('active'));
    }

    // Function to switch the language based on query parameter
    function switchLanguageFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get('lang') || 'en'; // Default to 'en' if no parameter is found
        hideAllContent();

        if (lang === 'en') {
            englishContent.forEach((element) => element.classList.add('active'));
            htmlTag.setAttribute('lang', 'en');
        } else if (lang === 'de') {
            germanContent.forEach((element) => element.classList.add('active'));
            htmlTag.setAttribute('lang', 'de');
        }
    }

    // Call switchLanguageFromUrl on page load
    switchLanguageFromUrl();

    // Event listeners for PC language buttons
    englishImagePc.addEventListener('click', () => updateUrlParameter('en'));
    germanImagePc.addEventListener('click', () => updateUrlParameter('de'));

    // Event listeners for mobile language buttons
    englishImageMobile.addEventListener('click', () => updateUrlParameter('en'));
    germanImageMobile.addEventListener('click', () => updateUrlParameter('de'));

    // Function to change URL and update the 'lang' parameter
    function updateUrlParameter(lang) {
        const currentUrl = new URL(window.location);
        currentUrl.searchParams.set('lang', lang);
        window.location = currentUrl; // Reload the page with the updated URL
    }
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