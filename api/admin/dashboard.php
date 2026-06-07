<?php
require_once '../database.php';
require_once 'auth_check.php';

header('Content-Type: application/json');

// Guard endpoint with admin authentication
requireAdminAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

$stats = [];

// Total applications
$res = $conn->query("SELECT COUNT(*) as count FROM applications");
$stats['total_apps'] = $res ? intval($res->fetch_assoc()['count']) : 0;

// Pending applications
$res = $conn->query("SELECT COUNT(*) as count FROM applications WHERE status='pending'");
$stats['pending_apps'] = $res ? intval($res->fetch_assoc()['count']) : 0;

// Approved applications
$res = $conn->query("SELECT COUNT(*) as count FROM applications WHERE status='approved'");
$stats['approved_apps'] = $res ? intval($res->fetch_assoc()['count']) : 0;

// Rejected applications
$res = $conn->query("SELECT COUNT(*) as count FROM applications WHERE status='rejected'");
$stats['rejected_apps'] = $res ? intval($res->fetch_assoc()['count']) : 0;

// Latest 5 applications
$latestResult = $conn->query("SELECT * FROM applications ORDER BY created_at DESC LIMIT 5");
$latest_apps = [];

if ($latestResult) {
    while ($row = $latestResult->fetch_assoc()) {
        $latest_apps[] = [
            'id' => intval($row['id']),
            'name' => $row['name'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'job_position' => $row['job_position'],
            'status' => $row['status'],
            'created_at' => $row['created_at']
        ];
    }
}

echo json_encode([
    "stats" => $stats,
    "latest_applications" => $latest_apps
]);
?>
