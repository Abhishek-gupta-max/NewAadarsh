<?php
require_once '../database.php';
require_once 'auth_check.php';

header('Content-Type: application/json');

// Guard endpoint with admin authentication
requireAdminAuth();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        
        if ($id > 0) {
            // Get single application detail
            $sql = "SELECT * FROM applications WHERE id = $id";
            $result = $conn->query($sql);
            if ($result && $row = $result->fetch_assoc()) {
                echo json_encode($row);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Application not found"]);
            }
        } else {
            // Get list of applications with optional search
            $search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
            
            $sql = "SELECT * FROM applications";
            if (!empty($search)) {
                $sql .= " WHERE name LIKE '%$search%' OR email LIKE '%$search%' OR phone LIKE '%$search%' OR job_position LIKE '%$search%'";
            }
            $sql .= " ORDER BY created_at DESC";
            
            $result = $conn->query($sql);
            $apps = [];
            
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $apps[] = $row;
                }
            }
            
            echo json_encode($apps);
        }
        break;
        
    case 'POST': // Handles status updates
        $input = json_decode(file_get_contents('php://input'), true);
        $action = isset($input['action']) ? $input['action'] : '';
        
        if ($action === 'update_status') {
            $id = isset($input['id']) ? intval($input['id']) : 0;
            $status = isset($input['status']) ? $conn->real_escape_string($input['status']) : '';
            
            if ($id <= 0 || !in_array($status, ['pending', 'approved', 'rejected'])) {
                http_response_code(400);
                echo json_encode(["error" => "Invalid ID or status value!"]);
                exit();
            }
            
            $sql = "UPDATE applications SET status = '$status' WHERE id = $id";
            if ($conn->query($sql)) {
                echo json_encode(["success" => true, "message" => "Status updated successfully!"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Database error: " . $conn->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid action!"]);
        }
        break;
        
    case 'DELETE':
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid ID provided!"]);
            exit();
        }
        
        // Find file path to unlink
        $sql = "SELECT file_path FROM applications WHERE id = $id";
        $result = $conn->query($sql);
        if ($result && $row = $result->fetch_assoc()) {
            $path = $row['file_path'];
            // Since the file path is relative to the root (e.g. uploads/resumes/...)
            // we prepend ../ to resolve it relative to api/admin/
            $full_path = '../../' . $path;
            if (!empty($path) && file_exists($full_path)) {
                unlink($full_path);
            }
        }
        
        // Delete row
        $sql = "DELETE FROM applications WHERE id = $id";
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "Application deleted successfully!"]);
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
