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
	<link href='https://fonts.googleapis.com/css?family=Sofia' rel='stylesheet'>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<style type="text/css">
		
		html,body{
			margin: 0;
			padding: 0;
			background: #1A1A1D;
			font-family: 'Sofia';
		}

		.sidenav {
		    height: 100%;
		    width: 13vw;
		    z-index: 1;
		    position: fixed;
		    top: 13.81vh;
		    left: 0;
		    background-color: #111111;
		    overflow-x: hidden;
		    padding-top: 1.97vh;
		    
		}

		.sidenavlinks{
			font-family: 'Sofia';
		}


		.sidenav a {
		    padding: 6px 8px 6px 16px;
		    text-decoration: none;
		    font-size: 25px;
		    color: #818181;
		    display: block;
		}

		.sidenav a:hover {
		    color: #f1f1f1;
		}

		.title{
			font-family: 'Sofia';
			letter-spacing: 0.4em;
			font-size: 2em;
			padding: 5px;
		}

		.main {
			margin-top: 50px;
		    margin-left: 240px;
		    padding: 0px 10px;
		}

		.topnav {
		    background-color: #111111;
		    overflow: hidden;
		}

		.topnav a{
		    float: left;
		    display: block;
		    z-index: 1;
		    color: #f2f2f2;
		    text-align: center;
		    padding: 0px 16px;
		    text-decoration: none;
		    font-size: 17px;
		}

		.topnav a:hover{
		    background-color: yellow;
		    color: black;
		}

		.sticky {
			z-index: 1;
			position: fixed;
			top: 0;
			width: 100%
		}

		.sticky + .content {
 			padding-top: 60px;
		}
		.active{
		    background-color: yellow;
		    color: black;
		}

		.title2{
			margin-top: 20vh;
			font-family: 'Sofia';
			font-size: 1.5em;
			color: yellow;
			margin-left: 50vw;
		}

		.input{
			background-color: #111111;
			margin-left: 42vw;
			margin-right: 30vw;
			padding: 1.5em;
			border-radius: 7px;
		}

		.titleInputClass{
			font-family: 'Sofia';
			text-align: center;
			height: 3vh;
			margin-bottom: 1vh;
			margin-left: 5.4vw;
			border-radius: 7px;
			font-size: 1.2em;
		}

		.noteInputClass{
			font-family: 'Sofia';
			text-align: center;
			height: 23vh;
			width: 20vw;
			margin-left: 1.7vw;
			margin-top: 1.3vh;
			margin-bottom: 1.4vh;
			border-radius: 7px;
			font-size: 2em;
		}

		.addButtonClass{
			border-radius: 3px;
			margin-left: 9.7vw;
		}

		.noteBoxClass{
			margin: 20px;
			background: yellow;
			opacity: 0.98;
			width: 76vw;
			margin-left: 1.7vw;
			padding: 30px;
			border-radius: 10px;	
		}

		.noteBoxClass:hover{
			transform: scale(1.06);
		}

		.titleClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 2.3em;
			padding: 15px;
		}

		.noteAreaClass{
			font-family: "Trebuchet MS";
			font-size: 1.4em;
			padding: 10px;
			padding-bottom: 20px;
		}

		.fa{
			padding: 5px;
			padding-left: 10px;
			padding-right: 10px;
		}

		.editTimeClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 1.2em;
			padding: 10px;
		}

		.createTimeClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 1.2em;
			padding: 10px;
			padding-bottom: 0;
		}

		@media screen and (max-height: 450px) {
		    .sidenav {
		    	padding-top: 15px;
		    }
		    .sidenav a{
		    	font-size: 18px;
		    }
		}

	</style>
</head>
<body>
	<div id="navbar" class="topnav">
		<a onclick="home()"><h2 class="title">Clippy</h2></a>
	</div>
	<div><?= $_SESSION['message'] ?></div>
	<div class="sidenav" >
		<a class="home sidenavlinks" onclick="home()">Home</a>
		<a class="sidenavlinks active">Notes</a>
		<a class="sidenavlinks" onclick="task()">to-do lists</a>
		<a class="sidenavlinks" onclick="logout()">Logout</a>
	</div>	
	<div class="main title2"><h1>Notes</h1></div>
	<div id="notesInput" class="main input">
		<div>
			<input id="titleInput" class="titleInputClass" type="text" name="title" placeholder="Title">
			<div>
				<input id="noteAreaInput" class="noteInputClass" type="text" name="noteArea" placeholder="Notes">
			</div>
		</div>	
		<button class="addButtonClass" onclick="newNote()">Add notes</button>
	</div>
	<div id="notesRegion" class="main notesRegionClass">
	</div>
	<script type="text/javascript">
		window.onscroll = function() {myFunction()};

		var navbar = document.getElementById("navbar");

		var sticky = navbar.offsetTop;

		function myFunction() {
		  if (window.pageYOffset >= sticky) {
		    navbar.classList.add("sticky")
		  } else {
		    navbar.classList.remove("sticky");
		  }
		}
	</script>
<script src="functions.js"></script>	
<script type="text/javascript" src="notes.js">
</script>
</body>
</html>