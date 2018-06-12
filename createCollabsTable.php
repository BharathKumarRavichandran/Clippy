<?php

$username = $_SESSION['username'];

$tableName = "Collaborations";

$sql = "USE clippy;";
$conn->query($sql);

$sql = "CREATE TABLE IF NOT EXISTS $tableName(
		id INT(100) NOT NULL AUTO_INCREMENT,
		username VARCHAR(8000) NOT NULL,
		TaskNumber INT(100) NOT NULL,
		CollabsUsername VARCHAR(8000) NOT NULL,
		PRIMARY KEY (id)
		)";
$conn->query($sql);

?>