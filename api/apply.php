<?php
require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Get form data
$name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
$email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
$phone = isset($_POST['phone']) ? $conn->real_escape_string($_POST['phone']) : '';
$job_position = isset($_POST['job_position']) ? $conn->real_escape_string($_POST['job_position']) : '';
$experience = isset($_POST['experience']) ? $conn->real_escape_string($_POST['experience']) : '';
$message = isset($_POST['message']) ? $conn->real_escape_string($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($job_position) || empty($experience)) {
    http_response_code(400);
    echo json_encode(["error" => "All required fields (name, email, phone, position, experience) must be provided!"]);
    exit();
}

$resume_file = '';
$file_path = '';

// Handle file upload
if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    // Note: React app uploads to root relative uploads folder
    // The uploads directory should be resolved relative to the current script
    $upload_dir = '../uploads/resumes/';
    
    // Create directory if it doesn't exist
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $file_name = $_FILES['resume']['name'];
    $file_tmp = $_FILES['resume']['tmp_name'];
    $file_size = $_FILES['resume']['size'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    // Allowed extensions
    $allowed_ext = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

    if (!in_array($file_ext, $allowed_ext)) {
        http_response_code(400);
        echo json_encode(["error" => "Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!"]);
        exit();
    } elseif ($file_size > 5 * 1024 * 1024) { // 5MB limit
        http_response_code(400);
        echo json_encode(["error" => "File size must be less than 5MB!"]);
        exit();
    } else {
        // Generate unique filename
        $new_filename = uniqid('resume_') . '.' . $file_ext;
        $destination = $upload_dir . $new_filename;

        // Path for DB storage should be web accessible (e.g. uploads/resumes/...)
        $db_file_path = 'uploads/resumes/' . $new_filename;

        if (move_uploaded_file($file_tmp, $destination)) {
            $resume_file = $new_filename;
            $file_path = $db_file_path;
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to upload file to target directory!"]);
            exit();
        }
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Resume file is required!"]);
    exit();
}

// Insert into database
$sql = "INSERT INTO applications (name, email, phone, job_position, experience, resume_file, file_path, message) 
        VALUES ('$name', '$email', '$phone', '$job_position', '$experience', '$resume_file', '$file_path', '$message')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Application submitted successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $conn->error]);
}
?>
