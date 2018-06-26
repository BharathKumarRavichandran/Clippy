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

if($_SERVER['REQUEST_METHOD']=="POST"&&isset($_POST['purpose'])){

	if($_POST["purpose"]=="add"){

		$noteNumber = $_POST['noteNumber'];
		$titleText = $_POST['titleText'];
		$noteText = $_POST['noteText'];
		$noteStar = $_POST['noteStar'];
		$editTime = $_POST['editTime'];
		$createTime = $_POST['createTime'];

		$stmt = $conn->prepare("INSERT INTO $tablename(NoteNumber,Title,NoteText,Starred,EditTime,CreateTime) "."VALUES (?,?,?,?,?,?);");
		$stmt->bind_param("isssss",$noteNumber,$titleText,$noteText,$noteStar,$editTime,$createTime);
		$stmt->execute();
		$stmt->close();

		$sql = "UPDATE user SET noteMaxCount='$noteNumber' WHERE username = '$username';";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="edit"){

		$noteNumber = $_POST['noteNumber'];
		$titleText = $_POST['titleText'];
		$noteText = $_POST['noteText'];
		$editTime = $_POST['editTime'];

		$stmt = $conn->prepare("UPDATE $tablename SET Title=?, NoteText=?,EditTime=? WHERE NoteNumber = ?;");
		$stmt->bind_param("sssi",$titleText,$noteText,$editTime,$noteNumber);
		$stmt->execute();
		$stmt->close();

	}

	else if($_POST["purpose"]=="starEdit"){

		$noteNumber = $_POST['noteNumber'];
		$noteStar = $_POST['noteStar'];
		$editTime = $_POST['editTime'];

		$stmt = $conn->prepare("UPDATE $tablename SET Starred=?,EditTime=? WHERE NoteNumber = ?;");
		$stmt->bind_param("ssi",$noteStar,$editTime,$noteNumber);
		$stmt->execute();
		$stmt->close();

	}

	else if($_POST["purpose"]=="labelAdd"){

		$noteNumber = $_POST['noteNumber'];
		$label = $_POST['label'];
		
		$stmt = $conn->prepare("UPDATE $tablename SET Labels=concat(Labels,?) WHERE NoteNumber = ?;");
		$stmt->bind_param("si",$label,$noteNumber);
		$stmt->execute();
		$stmt->close();

	}

	else if($_POST["purpose"]=="delete"){

		$noteNumber = $_POST['noteNumber'];

		$stmt = $conn->prepare("DELETE FROM $tablename WHERE NoteNumber = ?;");
		$stmt->bind_param("i",$noteNumber);
		$stmt->execute();
		$stmt->close();

	}

}

if($_SERVER['REQUEST_METHOD']=="POST"&&(!isset($_POST['purpose']))){

		if(!($_FILES["fileToUpload"]["error"]==4)){
		
		$noteNumber = $_POST["submit"][6];

		$target_dir = "uploads/";
		$fileToUpload = $_FILES["fileToUpload"]["name"];
		$target_file = $target_dir.basename($fileToUpload);
		$uploadOk = 1;
		$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

		// Check if image file is a actual image or fake image
		if(isset($_POST["submit"])) {
		    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
		    if($check !== false) {
		        $_SESSION['message']="File is an image - " . $check["mime"] . ".";
		        $uploadOk = 1;
		    } else {
		        $_SESSION['message']="File is not an image.";
		        $uploadOk = 0;
		    }
		}

		// Check if file already exists
		if (file_exists($target_file)) {
		    $_SESSION['message']="Sorry, file already exists.";
		    $uploadOk = 0;
		}

		// Check file size
		if ($_FILES["fileToUpload"]["size"] > 500000) {
		    $_SESSION['message']="Sorry, your file is too large.";
		    $uploadOk = 0;
		}

		// Allow certain file formats
		if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
		&& $imageFileType != "gif" ) {
		    $_SESSION['message']="Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
		    $uploadOk = 0;
		}

		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
		    $_SESSION['message']="Sorry, your file was not uploaded.";
		// if everything is ok, try to upload file
		} 

		else{
		    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
		        $_SESSION['message']="The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		        $imagePath = $conn->real_escape_string('uploads/'.$_FILES['fileToUpload']['name'].' ');

		        $sql = "UPDATE $tablename SET ImgPath=concat(ImgPath,'$imagePath') WHERE NoteNumber = $noteNumber;";
				$conn->query($sql);

		    } 
		    else {
		        $_SESSION['message']="Sorry, there was an error uploading your file.";
		    }
		}
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

		.labelsOPT{
			padding: 6px 8px 6px 16px;
		    color: #818181;
		    display: block;
			margin-top: 16%;
			font-family: 'Comic Sans MS';
			font-size: 1.6em;
			color: darkred;
			padding-bottom: 0px;
		}

		.labelLinks{
			font-family: 'Comic Sans MS';
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
			font-family: 'Comic Sans MS';
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

		.selClass{
			margin-left: 48vw;
		}

		#selectTextId{
			font-family: "Comic Sans MS";
			font-size: 1.4em;
			color: yellow;
		}

		.selectClass{
			border-radius: 4px;
		}

		.noteBoxClass{
			margin: 20px;
			background: orange;
			opacity: 0.98;
			width: 76vw;
			margin-left: 1.7vw;
			padding: 15px;
			border-radius: 10px;	
		}

		.noteBoxClass:hover{
			transform: scale(1.06);
		}

		.titleClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 2.3em;
			padding: 10px;
		}

		.noteAreaClass{
			font-family: "Comic Sans MS";
			font-size: 1.4em;
			padding: 10px;
			padding-bottom: 20px;
			margin-top: 1.6%;
		}

		.fa{
			padding: 5px;
			padding-left: 10px;
			padding-right: 10px;
			padding-bottom: 20px;
		}

		.fa-star{
			color: grey;
		}

		.checked{
    		color: red;
		}

		.fa-plus-square{
			color: black;
		}

		.labAddClass{
			font-family: "Trebuchet MS";
			font-size: 1em;
			color: grey;
		}

		.labInClass{
			border-radius: 3px;
		}

		.labelDivClass{
			margin-top: 7px;
		}

		.labSpanClass{
			background: lightblue;
			border-style: outset;
			border-radius: 5px;
			font-family: "Trebuchet MS";
			font-size: 1em;
			padding: 4px;
			margin-left: 5px;
			margin-right: 5px;
		}

		.editTimeClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 1.1em;
			padding: 10px;
		}

		.createTimeClass{
			font-family: "Trebuchet MS";
			font-style: italic;
			font-size: 1.1em;
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
	<div class="sidenav" id="sidenav">
		<a class="home sidenavlinks" onclick="home()">Home</a>
		<a id="noteLinkId" class="sidenavlinks active">Notes</a>
		<a class="sidenavlinks" onclick="tasks()">to-do lists</a>
		<a class="sidenavlinks" onclick="logout()">Logout</a>
		<div class="sidenavlinks labelsOPT">Labels :</div>>
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
	<div class="main selClass"><span id="selectTextId">Sort by:</span>
		<select id="selectId" class="selectClass" onchange="sortClick(this)">
			<option value="time" selected>Time</option>
			<option value="importance">Importance</option>
		</select>
	</div>
	<div id="notesRegion" class="main notesRegionClass">
	</div>
	<script type="text/javascript">

		document.getElementById("sidenav").style.top = document.getElementById("navbar").offsetHeight+"px";

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

		function note(){
			window.location = "notes.php";
		}

	</script>
<script src="functions.js"></script>	
<script type="text/javascript" src="notes.js">
</script>
</body>
</html>