<?php

session_start();
$_SESSION['message']="";
include("connect.php");

if(!isset($_SESSION["username"])){
	header('Location: welcome.html');
	exit();
}
include("createDataTable.php");

$username = $_SESSION["username"];
$tablename = $username."tasks";

if($_SERVER['REQUEST_METHOD']=="POST"){

	if($_POST["purpose"]=="add"){

		$taskNumber = $_POST['taskNumber'];
		$checked = $_POST['checked'];
		$taskText = $_POST['taskText'];
		$starred = $_POST['starred'];

		$sql = "INSERT INTO $tablename(TaskNumber,Checked,TaskText,Starred) "."VALUES ('$taskNumber','$checked','$taskText','$starred')";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="edit"){

		$taskNumber = $_POST['taskNumber'];
		$checked = $_POST['checked'];
		$taskText = $_POST['taskText'];
		$starred = $_POST['starred'];

		$sql = "UPDATE $tablename SET Checked='$checked', TaskText='$taskText', Starred='$starred' WHERE TaskNumber = $taskNumber;";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="delete"){

		$taskNumber = $_POST['taskNumber'];

		$sql = "DELETE FROM $tablename WHERE TaskNumber = $taskNumber;";
		$conn->query($sql);

	}


}

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