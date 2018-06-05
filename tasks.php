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
	<title>Tasks | Clippy</title>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="tasks.css">
</head>
<body>
	<h1>Tasks | Clippy</h1>
	<div>
		<button onclick="home()">Home</button>
		<button onclick="newTask()">Add to-do's</button>
		<button onclick="logout()">Logout</button>
	</div>
	<div>
		<input id="taskInput" type="text" name="taskInput" placeholder="Task">
	</div>
	<div id="taskRegion">	
	</div>	
<script src="functions.js"></script>
<script src="tasks.js"></script>	
</body>
</html>