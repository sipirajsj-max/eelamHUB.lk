<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['subscriber_email']);

    // நீங்கள் இதற்கென 'subscribers' என்ற டேபிள் உருவாக்கினால் அதில் சேமிக்கலாம்
    $sql = "INSERT INTO subscribers (email) VALUES ('$email')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Thank you for subscribing!'); window.history.back();</script>";
    } else {
        echo "<script>alert('Error or Already Subscribed!'); window.history.back();</script>";
    }
}
$conn->close();
?>