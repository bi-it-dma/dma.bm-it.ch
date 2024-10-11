document.addEventListener('DOMContentLoaded', () => {
    // Language switch
    const englishImagePc = document.getElementById('en_img_pc');
    const germanImagePc = document.getElementById('de_img_pc');
    const englishImageMobile = document.getElementById('en_img_mobile');
    const germanImageMobile = document.getElementById('de_img_mobile');
    const htmlTag = document.documentElement;

    // Function to hide all language content
    function hideAllContent() {
        document.querySelectorAll('.lang').forEach((element) => {
            element.classList.remove('active');
        });
    }

    // Function to switch language
    function switchLanguage(lang) {
        hideAllContent();
        htmlTag.setAttribute('lang', lang);
        localStorage.setItem('lang', lang); // Save the language in localStorage
    
        if (lang === 'en') {
            document.querySelectorAll('.lang.en').forEach((element) => element.classList.add('active'));
        } else if (lang === 'de') {
            document.querySelectorAll('.lang.de').forEach((element) => element.classList.add('active'));
        }
    
        // Preserve the current hash
        const currentHash = window.location.hash;
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('lang', lang);
        
        // Update URL with the current language and hash
        window.history.replaceState(null, '', '?' + urlParams.toString() + currentHash);
    }
    

    // Check URL for language parameter
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');

    if (langFromUrl) {
        switchLanguage(langFromUrl); // Apply the language from the URL
    } else {
        const storedLang = localStorage.getItem('lang') || 'en'; // Fallback to English if no language is stored
        switchLanguage(storedLang); // Apply stored or default language
    }

    // Event listeners for buttons
    englishImagePc?.addEventListener('click', () => switchLanguage('en'));
    germanImagePc?.addEventListener('click', () => switchLanguage('de'));
    englishImageMobile?.addEventListener('click', () => switchLanguage('en'));
    germanImageMobile?.addEventListener('click', () => switchLanguage('de'));

    // Function that prevents the form from opening a new tab and creates text below it
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
            // Displays the message in the div box under the form
            document.getElementById('messageBox').innerHTML = data;

            // Reset the form fields
            this.reset();
        })
        .catch(error => {
            // If error
            document.getElementById('messageBox').innerHTML = "An error occurred. Please try again.";
        });
    });


    // Anchor link functionality
    document.querySelectorAll('.anchor').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target) { // Ensure the target exists
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
