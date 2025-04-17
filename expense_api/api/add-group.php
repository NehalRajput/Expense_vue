<?php
// Allow requests from your frontend port (Vite: 5173)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


require '../config/db.php';


$data = json_decode(file_get_contents("php://input"), true);


$name = trim($data['group_name'] ?? '');

if ($name !== '') {
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=expense-tracker", "root", "");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Use correct column name
        $stmt = $pdo->prepare("INSERT INTO groups (group_name, created_at) VALUES (?, NOW())");
        $stmt->execute([$name]);

        echo json_encode(['status' => 'success', 'message' => 'Group added']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Name is required']);
}
