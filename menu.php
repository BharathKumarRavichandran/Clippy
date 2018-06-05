<?php

session_start();
include("connect.php");

if(!isset($_SESSION["username"])){
	header('Location: welcome.html');
	exit();
}

$_SESSION['message']="";

?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Home | Clippy</title>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<link rel="stylesheet" type="text/css" href="menu.css">
</head>
<body>
	<h1>Clippy</h1>
	<button onclick="notes()">Notes</button>
	<button onclick="tasks()">to-do lists</button>
	<button onclick="logout()">Logout</button>
<script src="functions.js"></script>
</body>
</html>