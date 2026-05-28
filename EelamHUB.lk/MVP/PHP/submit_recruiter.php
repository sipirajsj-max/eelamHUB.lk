<?php
// டேட்டாபேஸ் இணைப்பைச் சேர்த்தல்
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // படிவத்தில் இருந்து வரும் தரவுகளைப் பாதுகாப்பாகப் பெறுதல்
    $full_name = mysqli_real_escape_with_html_tags($conn, $_POST['full_name']);
    $email = mysqli_real_escape_with_html_tags($conn, $_POST['email']);
    $personal_mobile = mysqli_real_escape_with_html_tags($conn, $_POST['personal_mobile']);
    $whatsapp_no = mysqli_real_escape_with_html_tags($conn, $_POST['whatsapp_no']);
    $business_mobile = mysqli_real_escape_with_html_tags($conn, $_POST['business_mobile']);
    $brn_number = mysqli_real_escape_with_html_tags($conn, $_POST['brn_number']);
    $work_address = mysqli_real_escape_with_html_tags($conn, $_POST['work_address']);
    $permanent_address = mysqli_real_escape_with_html_tags($conn, $_POST['permanent_address']);

    // SQL Query மூலம் தரவைச் சேமித்தல்
    $sql = "INSERT INTO recruiters (full_name, email, personal_mobile, whatsapp_no, business_mobile, brn_number, work_address, permanent_address) 
            VALUES ('$full_name', '$email', '$personal_mobile', '$whatsapp_no', '$business_mobile', '$brn_number', '$work_address', '$permanent_address')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>
                alert('Success! Recruiter registered successfully.');
                window.location.href='recruiter_auth.html';
              </script>";
    } else {
        if($conn->errno == 1062) { // மின்னஞ்சல் ஏற்கனவே இருந்தால் வரும் பிழை
            echo "<script>alert('Error: This Email is already registered!'); window.history.back();</script>";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

// மாற்றுச் செயல்பாடு (பாதுகாப்பிற்காக)
function mysqli_real_escape_with_html_tags($conn, $data) {
    return mysqli_real_escape_string($conn, trim($data));
}

$conn->close();
?>
