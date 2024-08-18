<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'config.php';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

set_time_limit(300); // 5 minutes

header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename="tasks_report_' . date('Y-m-d') . '.csv"');

$output = fopen('php://output', 'w');

fputcsv($output, ['ID', 'Title', 'Status', 'Due Date']);

$sql = "SELECT id, title, status, due_date FROM tasks";
$stmt = $pdo->prepare($sql);

$limit = 1000; // Number of records to fetch per query
$offset = 0;

try {
    do {
        $stmt->execute();
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($tasks as $task) {
            fputcsv($output, $task);
        }

        $offset += $limit;

        if (count($tasks) < $limit) {
            break; 
        }
    } while (true);
} catch (PDOException $e) {
    fclose($output);
    die("Error executing query: " . $e->getMessage());
}

fclose($output);
?>
