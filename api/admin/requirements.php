<?php
require_once '../database.php';
require_once 'auth_check.php';

header('Content-Type: application/json');

// Guard endpoint with admin authentication
requireAdminAuth();

// Make sure the table exists
$conn->query("CREATE TABLE IF NOT EXISTS job_requirements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position_title VARCHAR(150) NOT NULL,
    description LONGTEXT,
    requirements TEXT,
    experience_needed VARCHAR(100),
    salary_range VARCHAR(100),
    location VARCHAR(150),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        
        if ($id > 0) {
            $sql = "SELECT * FROM job_requirements WHERE id = $id";
            $result = $conn->query($sql);
            if ($result && $row = $result->fetch_assoc()) {
                echo json_encode($row);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Position not found"]);
            }
        } else {
            $sql = "SELECT * FROM job_requirements ORDER BY created_at DESC";
            $result = $conn->query($sql);
            $positions = [];
            
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $positions[] = $row;
                }
            }
            
            echo json_encode($positions);
        }
        break;
        
    case 'POST': // Add new position
        $input = json_decode(file_get_contents('php://input'), true);
        
        $position_title = isset($input['position_title']) ? $conn->real_escape_string($input['position_title']) : '';
        $description = isset($input['description']) ? $conn->real_escape_string($input['description']) : '';
        $requirements = isset($input['requirements']) ? $conn->real_escape_string($input['requirements']) : '';
        $experience_needed = isset($input['experience_needed']) ? $conn->real_escape_string($input['experience_needed']) : '';
        $salary_range = isset($input['salary_range']) ? $conn->real_escape_string($input['salary_range']) : '';
        $location = isset($input['location']) ? $conn->real_escape_string($input['location']) : '';
        
        if (empty($position_title)) {
            http_response_code(400);
            echo json_encode(["error" => "Position title is required!"]);
            exit();
        }
        
        $sql = "INSERT INTO job_requirements (position_title, description, requirements, experience_needed, salary_range, location)
                VALUES ('$position_title', '$description', '$requirements', '$experience_needed', '$salary_range', '$location')";
                
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "id" => $conn->insert_id, "message" => "Position added successfully!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $conn->error]);
        }
        break;
        
    case 'PUT': // Update existing position
        $input = json_decode(file_get_contents('php://input'), true);
        
        $id = isset($input['id']) ? intval($input['id']) : 0;
        $position_title = isset($input['position_title']) ? $conn->real_escape_string($input['position_title']) : '';
        $description = isset($input['description']) ? $conn->real_escape_string($input['description']) : '';
        $requirements = isset($input['requirements']) ? $conn->real_escape_string($input['requirements']) : '';
        $experience_needed = isset($input['experience_needed']) ? $conn->real_escape_string($input['experience_needed']) : '';
        $salary_range = isset($input['salary_range']) ? $conn->real_escape_string($input['salary_range']) : '';
        $location = isset($input['location']) ? $conn->real_escape_string($input['location']) : '';
        $status = isset($input['status']) ? $conn->real_escape_string($input['status']) : 'active';
        
        if ($id <= 0 || empty($position_title)) {
            http_response_code(400);
            echo json_encode(["error" => "Valid ID and Position Title are required!"]);
            exit();
        }
        
        $sql = "UPDATE job_requirements SET 
                position_title = '$position_title', 
                description = '$description', 
                requirements = '$requirements', 
                experience_needed = '$experience_needed', 
                salary_range = '$salary_range', 
                location = '$location',
                status = '$status'
                WHERE id = $id";
                
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "Position updated successfully!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $conn->error]);
        }
        break;
        
    case 'DELETE':
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid ID provided!"]);
            exit();
        }
        
        $sql = "DELETE FROM job_requirements WHERE id = $id";
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "Position deleted successfully!"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $conn->error]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}
?>
