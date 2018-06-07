<?php

$username = $_SESSION['username'];

$tableName1 = $username."tasks";

$sql = "USE clippy;";
$conn->query($sql);

$sql = "CREATE TABLE IF NOT EXISTS $tableName1(
		id INT(100) NOT NULL AUTO_INCREMENT,
		TaskNumber INT(100) NOT NULL,
		Checked VARCHAR(200) NOT NULL,
		TaskText VARCHAR(8000) NOT NULL,
		Starred VARCHAR(200) NOT NULL,
		EditTime VARCHAR(1000) NOT NULL,
		CreateTime VARCHAR(1000) NOT NULL,
		PRIMARY KEY (id,TaskNumber)
		)";
$conn->query($sql);

$sql = "USE clippy;";
$conn->query($sql);

$tableName2 = $username."notes";

$sql = "CREATE TABLE IF NOT EXISTS $tableName2(
		id INT(100) NOT NULL AUTO_INCREMENT,
		NoteNumber INT(100) NOT NULL,
		Title VARCHAR(200) NOT NULL,
		NoteText VARCHAR(8000) NOT NULL,
		EditTime VARCHAR(1000) NOT NULL,
		CreateTime VARCHAR(1000) NOT NULL,
		PRIMARY KEY (id,NoteNumber)
		)";
$conn->query($sql);

?>