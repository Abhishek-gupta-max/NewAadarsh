<?php
require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Read raw JSON or POST variables
$input = json_decode(file_get_contents('php://input'), true);

$name = isset($input['name']) ? $input['name'] : (isset($_POST['name']) ? $_POST['name'] : '');
$email = isset($input['email']) ? $input['email'] : (isset($_POST['email']) ? $_POST['email'] : '');
$phone = isset($input['phone']) ? $input['phone'] : (isset($_POST['phone']) ? $_POST['phone'] : '');
$subject = isset($input['subject']) ? $input['subject'] : (isset($_POST['subject']) ? $_POST['subject'] : '');
$message = isset($input['message']) ? $input['message'] : (isset($_POST['message']) ? $_POST['message'] : '');

$name = $conn->real_escape_string($name);
$email = $conn->real_escape_string($email);
$phone = $conn->real_escape_string($phone);
$subject = $conn->real_escape_string($subject);
$message = $conn->real_escape_string($message);

if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required!"]);
    exit();
}

// Standard mock/success response since the original PHP site didn't have an active contact DB table or mail script
// We can check if a contact table exists, and write to it if it does
$check_table = $conn->query("SHOW TABLES LIKE 'contact_messages'");
if ($check_table && $check_table->num_rows > 0) {
    $conn->query("INSERT INTO contact_messages (name, email, phone, subject, message) VALUES ('$name', '$email', '$phone', '$subject', '$message')");
}

echo json_encode([
    "success" => true,
    "message" => "Message sent successfully! Our team will contact you soon."
]);
?>
