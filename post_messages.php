<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$text = $data['text'];

$sql = "INSERT INTO messages (username, text) VALUES ('$username', '$text')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["id" => $conn->insert_id]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>