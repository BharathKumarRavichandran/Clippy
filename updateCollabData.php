<?php

session_start();
$_SESSION['message']="";
include_once("connect.php");

if(!isset($_SESSION["username"])){
	header('Location: welcome.html');
	exit();
}

include_once("createDataTable.php");
include_once("createCollabsTable.php");

$username = $_SESSION["username"];
$tablename = $username."tasks";

if($_SERVER['REQUEST_METHOD']=="POST"){

	if(!isset($_POST["k"])){

		$un = $_POST["un"];
		$taskNumber = $_POST["unum"];
		$tablename = $un."tasks";

		if($_POST["purpose"]=="edit"){

			$checked = $_POST['checked'];
			$taskText = $_POST['taskText'];
			$starred = $_POST['starred'];
			$editTime = $_POST['editTime'];

			$sql = "UPDATE $tablename SET Checked='$checked', TaskText='$taskText', Starred='$starred', EditTime='$editTime' WHERE TaskNumber = $taskNumber;";
			$conn->query($sql);

		}

		else if($_POST["purpose"]=="delete"){

			$sql = "DELETE FROM $tablename WHERE TaskNumber = $taskNumber;";
			$conn->query($sql);

		}

		else if($_POST["purpose"]=="addCollabs"){

			$uname = $_POST['uname'];
			
			$sql = "INSERT INTO Collaborations(username,TaskNumber,CollabsUsername) "."VALUES('$username','$taskNumber','$uname');";
			$conn->query($sql);
		}

	}

}

?>