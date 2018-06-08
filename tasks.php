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
$tablename = $username."tasks";

if($_SERVER['REQUEST_METHOD']=="POST"){

	if($_POST["purpose"]=="add"){

		$taskNumber = $_POST['taskNumber'];
		$checked = $_POST['checked'];
		$taskText = $_POST['taskText'];
		$starred = $_POST['starred'];
		$editTime = $_POST['editTime'];
		$createTime = $_POST['createTime'];

		$sql = "INSERT INTO $tablename(TaskNumber,Checked,TaskText,Starred,EditTime,CreateTime) "."VALUES ('$taskNumber','$checked','$taskText','$starred','$editTime','$createTime');";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="edit"){

		$taskNumber = $_POST['taskNumber'];
		$checked = $_POST['checked'];
		$taskText = $_POST['taskText'];
		$starred = $_POST['starred'];
		$editTime = $_POST['editTime'];

		$sql = "UPDATE $tablename SET Checked='$checked', TaskText='$taskText', Starred='$starred', EditTime='$editTime' WHERE TaskNumber = $taskNumber;";
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
	<link href='https://fonts.googleapis.com/css?family=Sofia' rel='stylesheet'>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
			text-align: center;
			font-size: 15px;
			background-color: #111111;
			color: yellow;
			margin-left: 35.4vw;
			padding: 1.5em;
			border-radius: 7px;
		}
		
		.addInputClass{
			margin: 2em;
			padding: 5px;
			margin-left: 39.6vw;
			border-radius: 3px;
		}

		.taskBoxClass{
			margin: 20px;
			background: yellow;
			opacity: 0.98;
			width: 76vw;
			margin-left: 1.7vw;
			padding: 30px;
			border-radius: 10px;	
		}

		.taskBoxClass:hover{
			transform: scale(1.06);
		}

		.taskClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 2em;
			padding: 15px;
		}

		.fa{
			float: right;
			padding: 5px;
			padding-left: 10px;
			padding-right: 10px;
		}

		.fa-star{
			color: grey;
		}

		.checked{
    		color: orange;
		}

		.editTimeClass{
			margin-top: 10px;
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 1.2em;
			padding: 10px;
		}

		.createTimeClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 1.2em;
			margin-top: 5px;
			padding: 10px;
			padding-bottom: 0;
			padding-top: 0;
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
		<a class="sidenavlinks" onclick="notes()">Notes</a>
		<a class="sidenavlinks active" onclick="task()">to-do lists</a>
		<a class="sidenavlinks" onclick="logout()">Logout</a>
	</div>
	<div class="main title2"><h1>to-do lists</h1></div>
	<div class="main">
		<input id="taskInput" class="input" type="text" name="taskInput" placeholder="Task">
		<div><button  class="addInputClass" onclick="newTask()">Add task</button></div>
	</div>
	<div id="taskRegion" class="main taskRegionClass">
	</div>	
<script type="text/javascript">
	window.onscroll = function() {myFunction()};

	var navbar = document.getElementById("navbar");

	var sticky = navbar.offsetTop;

	function myFunction() {
		if (window.pageYOffset >= sticky) {
		    navbar.classList.add("sticky")
		}
		else{
			navbar.classList.remove("sticky");
		}
	}
</script>	
<script src="functions.js"></script>
<script type="text/javascript" src="tasks.js"></script>	
</body>
</html>