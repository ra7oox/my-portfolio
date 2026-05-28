<?php
/**
 * Ra7oox Portfolio - Client Reviews API Handler
 * Handles dynamic reviews loading (GET) and reviews saving (POST) directly on server
 */

// Prevent output before JSON headers
ob_start();

error_reporting(E_ALL);
ini_set('display_errors', 0); // Disable direct display to prevent HTML error breaks in JSON
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');

// Global error handlers returning JSON
set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return;
    ob_clean();
    echo json_encode([
        'success' => false,
        'message' => "PHP Error: $message in $file on line $line"
    ]);
    exit;
});

set_exception_handler(function($e) {
    ob_clean();
    echo json_encode([
        'success' => false,
        'message' => "PHP Exception: " . $e->getMessage()
    ]);
    exit;
});

/**
 * Return JSON response
 */
function send_json_response($success, $message, $data = []) {
    ob_clean();
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Sanitize string fields
 */
function clean_string($str) {
    $str = trim($str);
    $str = strip_tags($str);
    $str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    return $str;
}

$file_path = 'reviews.json';

// Initialize file if not exists
if (!file_exists($file_path)) {
    @file_put_contents($file_path, json_encode([], JSON_PRETTY_PRINT));
}

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method === 'GET') {
    // Read and return reviews list
    $file_content = @file_get_contents($file_path);
    $reviews = json_decode($file_content, true) ?: [];
    send_json_response(true, "Avis récupérés avec succès", $reviews);

} elseif ($request_method === 'POST') {
    // Retrieve inputs from $_POST or raw body
    $name = isset($_POST['name']) ? clean_string($_POST['name']) : '';
    $role = isset($_POST['role']) ? clean_string($_POST['role']) : '';
    $text = isset($_POST['text']) ? clean_string($_POST['text']) : '';
    $rating = isset($_POST['rating']) ? intval($_POST['rating']) : 5;

    // Handle raw JSON input fallback
    if (empty($name) && empty($text)) {
        $raw_input = file_get_contents('php://input');
        $json_data = json_decode($raw_input, true);
        if ($json_data) {
            $name = isset($json_data['name']) ? clean_string($json_data['name']) : '';
            $role = isset($json_data['role']) ? clean_string($json_data['role']) : '';
            $text = isset($json_data['text']) ? clean_string($json_data['text']) : '';
            $rating = isset($json_data['rating']) ? intval($json_data['rating']) : 5;
        }
    }

    // Validations
    if (empty($name) || strlen($name) < 2) {
        send_json_response(false, "Le nom doit faire au moins 2 caractères.");
    }
    if (empty($role) || strlen($role) < 2) {
        send_json_response(false, "Le rôle ou l'entreprise doit faire au moins 2 caractères.");
    }
    if (empty($text) || strlen($text) < 5) {
        send_json_response(false, "Le témoignage doit faire au moins 5 caractères.");
    }
    if ($rating < 1 || $rating > 5) {
        $rating = 5;
    }

    // Read existing reviews with file locking
    $file_handle = fopen($file_path, 'c+');
    if (!$file_handle) {
        send_json_response(false, "Impossible de lire la base de données des avis.");
    }

    // Exclusive lock
    if (flock($file_handle, LOCK_EX)) {
        $size = filesize($file_path);
        $file_content = $size > 0 ? fread($file_handle, $size) : '[]';
        $reviews = json_decode($file_content, true) ?: [];

        // Build new review entry
        $new_review = [
          'id' => uniqid(),
          'name' => $name,
          'role' => $role,
          'text' => $text,
          'rating' => $rating,
          'date' => date('c') // ISO 8601 Date
        ];

        // Append to the end
        $reviews[] = $new_review;

        // Truncate and write
        ftruncate($file_handle, 0);
        rewind($file_handle);
        fwrite($file_handle, json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        fflush($file_handle);
        flock($file_handle, LOCK_UN);
        fclose($file_handle);

        send_json_response(true, "Avis ajouté avec succès !", $new_review);
    } else {
        fclose($file_handle);
        send_json_response(false, "Une erreur de concurrence est survenue.");
    }

} else {
    send_json_response(false, "Méthode non autorisée.");
}
