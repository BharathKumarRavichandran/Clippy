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
	<link rel="stylesheet" type="text/css" href="../css/tasks.css">
</head>
<body>
	<h1>Tasks | Clippy</h1>
</body>
</html>