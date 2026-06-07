<?php
require_once '../database.php';
require_once 'auth_check.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$username = isset($input['username']) ? $input['username'] : (isset($_POST['username']) ? $_POST['username'] : '');
$password = isset($input['password']) ? $input['password'] : (isset($_POST['password']) ? $_POST['password'] : '');

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["error" => "Username and password are required!"]);
    exit();
}

if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
    $token = generateToken($username);
    echo json_encode([
        "success" => true,
        "token" => $token,
        "username" => $username,
        "message" => "Logged in successfully!"
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Invalid username or password!"]);
}
?>
