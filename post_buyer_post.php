<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$message = $data['message'];

$sql = "INSERT INTO buyer_posts (username, message) VALUES ('$username', '$message')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["id" => $conn->insert_id]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>