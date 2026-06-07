<?php
define('SECRET_SALT', 'newaadarsh_secure_salt_987123');
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'admin@123987');

// Generate a signed token
function generateToken($username) {
    $expiry = time() + (24 * 60 * 60); // 24 hours
    $payload = $username . ':' . $expiry;
    $signature = hash_hmac('sha256', $payload, SECRET_SALT);
    return base64_encode($payload . ':' . $signature);
}

// Verify a signed token
function verifyToken($tokenString) {
    if (empty($tokenString)) {
        return false;
    }
    
    $decoded = base64_decode($tokenString, true);
    if (!$decoded) {
        return false;
    }
    
    $parts = explode(':', $decoded);
    if (count($parts) !== 3) {
        return false;
    }
    
    $username = $parts[0];
    $expiry = intval($parts[1]);
    $signature = $parts[2];
    
    // Check expiration
    if (time() > $expiry) {
        return false;
    }
    
    // Verify signature
    $payload = $username . ':' . $expiry;
    $expectedSignature = hash_hmac('sha256', $payload, SECRET_SALT);
    
    if (hash_equals($expectedSignature, $signature) && $username === ADMIN_USERNAME) {
        return true;
    }
    
    return false;
}

// Check auth header and terminate if invalid
function requireAdminAuth() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (empty($authHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
        if (verifyToken($token)) {
            return true;
        }
    }
    
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Unauthorized access. Invalid or missing token."]);
    exit();
}
?>
