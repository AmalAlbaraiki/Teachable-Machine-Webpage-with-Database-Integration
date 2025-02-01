<?php
// Connect to MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "teachable_machine_db";  // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Receive detection count and class name from the request
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['detection_count']) && isset($_POST['class_name'])) {
    $detectionCount = (int)$_POST['detection_count'];
    $className = $_POST['class_name'];

    // Update the counter in the database
    $sql = "UPDATE detection_counter SET count = $detectionCount WHERE id = 1";
    
    if ($conn->query($sql) === TRUE) {
        // Optionally, store the detection log in another table
        $logSql = "INSERT INTO detection_log (class_name, detection_count) VALUES ('$className', $detectionCount)";
        $conn->query($logSql);
        echo json_encode(['status' => 'success', 'count' => $detectionCount, 'class_name' => $className]);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

$conn->close();
?>
