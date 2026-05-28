<?php
// லோக்கல் சர்வர் விபரங்கள் (Port: 3307)
$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "eelamhub_db";

// இணைப்பை உருவாக்குதல்
$conn = new mysqli($servername, $username, $password, $dbname);

// இணைப்பைச் சோதித்தல்
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>