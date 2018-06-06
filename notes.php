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
$tablename = $username."notes";

if($_SERVER['REQUEST_METHOD']=="POST"){

	if($_POST["purpose"]=="add"){

		$noteNumber = $_POST['noteNumber'];
		$titleText = $_POST['titleText'];
		$noteText = $_POST['noteText'];

		$sql = "INSERT INTO $tablename(NoteNumber,Title,NoteText) "."VALUES ('$noteNumber','$titleText','$noteText')";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="edit"){

		$noteNumber = $_POST['noteNumber'];
		$titleText = $_POST['titleText'];
		$noteText = $_POST['noteText'];

		$sql = "UPDATE $tablename SET Title='$titleText', NoteText='$noteText' WHERE NoteNumber = $noteNumber;";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="delete"){

		$noteNumber = $_POST['noteNumber'];

		$sql = "DELETE FROM $tablename WHERE NoteNumber = $noteNumber;";
		$conn->query($sql);

	}

}


?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Notes | Clippy</title>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<link rel="stylesheet" type="text/css" href="notes.css">
</head>
<body>
	<h1>Notes | Clippy</h1>
	<button onclick="home()">Home</button>
	<button onclick="newNote()">Add notes</button>
	<button onclick="logout()">Logout</button>
	<div id="notesInput">
		<input id="titleInput" type="text" name="title" placeholder="Title">
		<input id="noteAreaInput" type="text" name="noteArea" placeholder="Notes">
	</div>
	<div id="notesRegion">
	</div>
<script src="functions.js"></script>	
<script src="notes.js"></script>
</body>
</html>

