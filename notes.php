<?php

session_start();
$_SESSION['message']="";
include_once("connect.php");

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
		$editTime = $_POST['editTime'];
		$createTime = $_POST['createTime'];

		$sql = "INSERT INTO $tablename(NoteNumber,Title,NoteText,EditTime,CreateTime) "."VALUES ('$noteNumber','$titleText','$noteText','$editTime','$createTime');";
		$conn->query($sql);

		$sql = "UPDATE user SET noteMaxCount='$noteNumber' WHERE username = '$username';";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="edit"){

		$noteNumber = $_POST['noteNumber'];
		$titleText = $_POST['titleText'];
		$noteText = $_POST['noteText'];
		$editTime = $_POST['editTime'];

		$sql = "UPDATE $tablename SET Title='$titleText', NoteText='$noteText', EditTime='$editTime' WHERE NoteNumber = $noteNumber;";
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
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<link rel="stylesheet" type="text/css" href="notes.css">
</head>
<body>
	<h1>Notes | Clippy</h1>
	<div><?= $_SESSION['message'] ?></div>
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
<script type="text/javascript" src="notes.js">
</script>
</body>
</html>