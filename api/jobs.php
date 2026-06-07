<?php
require_once 'database.php';

header('Content-Type: application/json');

$slug = isset($_GET['slug']) ? $conn->real_escape_string($_GET['slug']) : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Helper to map job_requirements fields to frontend expected fields
function mapJobRow($row) {
    return [
        'id' => isset($row['id']) ? intval($row['id']) : 0,
        'title' => isset($row['position_title']) ? $row['position_title'] : (isset($row['title']) ? $row['title'] : ''),
        'description' => isset($row['description']) ? $row['description'] : '',
        'requirements' => isset($row['requirements']) ? $row['requirements'] : '',
        'experience' => isset($row['experience_needed']) ? $row['experience_needed'] : (isset($row['experience']) ? $row['experience'] : ''),
        'salary' => isset($row['salary_range']) ? $row['salary_range'] : (isset($row['salary']) ? $row['salary'] : ''),
        'job_location' => isset($row['location']) ? $row['location'] : (isset($row['job_location']) ? $row['job_location'] : ''),
        'company_name' => isset($row['company_name']) ? $row['company_name'] : 'New Adarsh Overseas Services',
        'category' => isset($row['category']) ? $row['category'] : 'Manpower',
        'vacancies' => isset($row['vacancies']) ? $row['vacancies'] : 'Openings',
        'status' => isset($row['status']) ? $row['status'] : 'active',
        'created_at' => isset($row['created_at']) ? $row['created_at'] : '',
        'slug' => isset($row['slug']) ? $row['slug'] : (isset($row['position_title']) ? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $row['position_title']))) : '')
    ];
}

// Check which table we are querying
$table = 'job_requirements';
$check_table = $conn->query("SHOW TABLES LIKE 'job_requirements'");
if ($check_table->num_rows == 0) {
    $table = 'jobs';
}

if ($id > 0) {
    // Fetch single job by ID
    $sql = "SELECT * FROM $table WHERE id = $id";
    $result = $conn->query($sql);
    if ($result && $row = $result->fetch_assoc()) {
        echo json_encode(mapJobRow($row));
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Job not found"]);
    }
} elseif (!empty($slug)) {
    // Fetch single job by slug
    // Note: job_requirements doesn't have a slug field, so we match position_title converted to slug
    if ($table === 'jobs') {
        $sql = "SELECT * FROM jobs WHERE slug = '$slug'";
    } else {
        // Find all rows and match slug on PHP side, or match title
        $sql = "SELECT * FROM job_requirements";
    }
    
    $result = $conn->query($sql);
    $found = false;
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $mapped = mapJobRow($row);
            if ($mapped['slug'] === $slug) {
                echo json_encode($mapped);
                $found = true;
                break;
            }
        }
    }
    
    if (!$found) {
        http_response_code(404);
        echo json_encode(["error" => "Job not found by slug: " . $slug]);
    }
} else {
    // Fetch all active jobs
    $sql = "SELECT * FROM $table WHERE status = 'active' ORDER BY id DESC";
    $result = $conn->query($sql);
    $jobs = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $jobs[] = mapJobRow($row);
        }
    }
    
    // If job_requirements is empty, fallback to legacy jobs table just in case
    if (empty($jobs) && $table === 'job_requirements') {
        $check_jobs = $conn->query("SHOW TABLES LIKE 'jobs'");
        if ($check_jobs->num_rows > 0) {
            $sql = "SELECT * FROM jobs WHERE status = 'active' ORDER BY id DESC";
            $result = $conn->query($sql);
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $jobs[] = mapJobRow($row);
                }
            }
        }
    }
    
    echo json_encode($jobs);
}
?>
