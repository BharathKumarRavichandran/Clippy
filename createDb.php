<?php

$sql = "CREATE DATABASE IF NOT EXISTS clippy;";
$conn->query($sql);

$sql = "USE clippy;";
$conn->query($sql);

$sql = "CREATE TABLE IF NOT EXISTS user(
		id INT(100) NOT NULL AUTO_INCREMENT,
		username VARCHAR(100) NOT NULL,
		email VARCHAR(320) NOT NULL,
		password VARCHAR(128) NOT NULL,
		noteMaxCount INT(100) NOT NULL DEFAULT '0',
		taskMaxCount INT(100) NOT NULL DEFAULT '0',
		PRIMARY KEY (id,username)
		)";
$conn->query($sql);

?>