<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$name = $data['group_name'];
$description = $data['description'];

try {
    $pdo = new PDO("mysql:host=localhost;dbname=expense-tracker", "root", "");
    $stmt = $pdo->prepare("UPDATE groups SET group_name = ? WHERE id = ?");
    $stmt->execute([$name, $id]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error']);
}
