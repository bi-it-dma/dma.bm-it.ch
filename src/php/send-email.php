<?php
// check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and convert html Form inputs to php to prevent html injection
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // set the receivers email address and the subject
    $to = "mderungsj@gmail.com";
    $subject = "New Contact Form Message from $name";

    // compose email body with user inputs
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // set email headers for sender and reply-to
    $headers = "From: user@dma.bm-it.ch\r\n";
    $headers .= "Reply-To: $email";

    // Send the email and display a success or fail message
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully :)";
    } else {
        echo "Failed to send the message. Please try again.";
    }
    // If the form wasnt submitted via post
} else {
    echo "Invalid request.";
}
?>
