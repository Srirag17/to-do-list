<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = json_decode($_POST['task'], true);

    // Save the task to a file, database, or any other data storage method you prefer
    // Here, we'll simply append the task to a file called "tasks.txt"
    file_put_contents("tasks.txt", $task['text'] . '|' . $task['priority'] . PHP_EOL, FILE_APPEND);
}
?>
