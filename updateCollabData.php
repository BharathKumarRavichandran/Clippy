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

		if($_POST["purpose"]=="edit"){

			$un = $_POST["un"];//Username
			$taskNumber = $_POST["unum"];//Note number
			$tablename = $un."tasks";
			$checked = $_POST['checked'];
			$taskText = $_POST['taskText'];
			$starred = $_POST['starred'];
			$editTime = $_POST['editTime'];

			$sql = "UPDATE $tablename SET Checked='$checked', TaskText='$taskText', Starred='$starred', EditTime='$editTime' WHERE TaskNumber = $taskNumber;";
			$result = $conn->query($sql);

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

		else if($_POST["purpose"]=="delete"){

			$uname = $_POST['un'];
			$taskNumber = $_POST["unum"];//Note number

			$sql = "DELETE FROM Collaborations WHERE TaskNumber = $taskNumber AND CollabsUsername = '$uname';";
			$result = $conn->query($sql);

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

		else if($_POST["purpose"]=="deleteBox"){

			$uname = $_POST['un'];
			$taskNumber = $_POST["unum"];//Note number

			$sql = "DELETE FROM Collaborations WHERE TaskNumber = $taskNumber AND username = '$uname';";
			$result = $conn->query($sql);

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

		else if($_POST["purpose"]=="addCollabs"){

			$un = $_POST["un"];//Username
			$taskNumber = $_POST["unum"];//Note number
			$uname = $_POST['uname'];
			
			$sql = "INSERT INTO Collaborations(username,TaskNumber,CollabsUsername) "."VALUES('$username','$taskNumber','$uname');";
			$result = $conn->query($sql);

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

	}

}

?>