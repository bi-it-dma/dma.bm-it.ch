<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "mderungsj@gmail.com";
    $subject = "New Contact Form Message from $name";
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    $headers = "From: user@dma.bm-it.ch\r\n";
    $headers .= "Reply-To: $email";


    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully :)";
    } else {
        echo "Failed to send the message. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>