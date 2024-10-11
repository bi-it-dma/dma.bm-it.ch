
//Language switch
document.addEventListener('DOMContentLoaded', () => {
    const englishImagePc = document.getElementById('en_img_pc');
    const germanImagePc = document.getElementById('de_img_pc');
    const englishImageMobile = document.getElementById('en_img_mobile');
    const germanImageMobile = document.getElementById('de_img_mobile');
    const englishContent = document.querySelectorAll('.lang.en');
    const germanContent = document.querySelectorAll('.lang.de');
    const htmlTag = document.documentElement; // Get the <html> tag

    // Function to hide all language content
    function hideAllContent() {
        document.querySelectorAll('.lang').forEach((element) => {
            element.classList.remove('active'); // You can use CSS to hide elements with 'active' class
        });
    }

    // Function to switch language
    function switchLanguage(lang) {
        hideAllContent();
        htmlTag.setAttribute('lang', lang); // Update <html lang="...">
        if (lang === 'en') {
            englishContent.forEach((element) => element.classList.add('active'));
        } else if (lang === 'de') {
            germanContent.forEach((element) => element.classList.add('active'));
        }
    }

    // Add event listeners for PC language buttons
    englishImagePc.addEventListener('click', () => switchLanguage('en'));
    germanImagePc.addEventListener('click', () => switchLanguage('de'));

    // Add event listeners for Mobile language buttons
    englishImageMobile.addEventListener('click', () => switchLanguage('en'));
    germanImageMobile.addEventListener('click', () => switchLanguage('de'));

    // Default to showing English content on page load
    switchLanguage('en');
});


//function that prevents the form from opening a new tab and creates text below it
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Create a FormData object to capture form data
    let formData = new FormData(this);

    // Send form data via AJAX (Fetch API)
    fetch('/src/php/send-email.php', {
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