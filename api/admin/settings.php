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

$system_info = [
    'php_version' => phpversion(),
    'mysql_server' => 'MySQL/MariaDB',
    'server_time' => date('F d, Y - h:i A')
];

// Check if job_requirements table exists
$check_table = $conn->query("SHOW TABLES LIKE 'job_requirements'");
$requirements_table = ($check_table && $check_table->num_rows > 0) ? 'job_requirements' : 'jobs';

$total_apps = 0;
$total_positions = 0;
$pending = 0;
$approved = 0;

$res = $conn->query("SELECT COUNT(*) as count FROM applications");
if ($res) $total_apps = intval($res->fetch_assoc()['count']);

$res = $conn->query("SELECT COUNT(*) as count FROM $requirements_table");
if ($res) $total_positions = intval($res->fetch_assoc()['count']);

$res = $conn->query("SELECT COUNT(*) as count FROM applications WHERE status='pending'");
if ($res) $pending = intval($res->fetch_assoc()['count']);

$res = $conn->query("SELECT COUNT(*) as count FROM applications WHERE status='approved'");
if ($res) $approved = intval($res->fetch_assoc()['count']);

echo json_encode([
    "system_info" => $system_info,
    "statistics" => [
        "total_applications" => $total_apps,
        "job_positions" => $total_positions,
        "pending" => $pending,
        "approved" => $approved
    ]
]);
?>
