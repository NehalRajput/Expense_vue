
<?php
// Allow requests from your frontend port (Vite: 5173)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


require '../config/db.php';


try {
    $pdo = new PDO("mysql:host=localhost;dbname=expense-tracker", "root", "");
    $stmt = $pdo->query("SELECT * FROM groups ORDER BY created_at DESC");
    $groups = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['groups' => $groups]);
} catch (PDOException $e) {
    echo json_encode(['groups' => []]);
}
