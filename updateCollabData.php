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

			$stmt = $conn->prepare("UPDATE $tablename SET Checked=?, TaskText=?, Starred=?, EditTime=? WHERE TaskNumber = ?;");
			if(!$stmt){
                echo "Error preparing statement ".htmlspecialchars($conn->error);
            }
            $stmt->bind_param("ssssi",$checked,$taskText,$starred,$editTime,$taskNumber);
            $stmt->execute();
			$result = $stmt->get_result();
			$stmt->close();

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

		else if($_POST["purpose"]=="delete"){

			$uname = $_POST['un'];
			$taskNumber = $_POST["unum"];//Note number

			$stmt = $conn->prepare("DELETE FROM Collaborations WHERE TaskNumber = ? AND CollabsUsername = ?;");
			if(!$stmt){
                echo "Error preparing statement ".htmlspecialchars($conn->error);
            }
            $stmt->bind_param("is",$taskNumber,$uname);
            $stmt->execute();
			$result = $stmt->get_result();
			$stmt->close();

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

		else if($_POST["purpose"]=="deleteBox"){

			$uname = $_POST['un'];
			$taskNumber = $_POST["unum"];//Note number

			$stmt = $conn->prepare("DELETE FROM Collaborations WHERE TaskNumber = ? AND username = ?;");
			if(!$stmt){
                echo "Error preparing statement ".htmlspecialchars($conn->error);
            }
            $stmt->bind_param("is",$taskNumber,$uname);
            $stmt->execute();
			$result = $stmt->get_result();
			$stmt->close();

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

		else if($_POST["purpose"]=="addCollabs"){

			$un = $_POST["un"];//Username
			$taskNumber = $_POST["unum"];//Note number
			$uname = $_POST['uname'];
			
			$stmt = $conn->prepare("INSERT INTO Collaborations(username,TaskNumber,CollabsUsername) "."VALUES(?,?,?);");
			if(!$stmt){
                echo "Error preparing statement ".htmlspecialchars($conn->error);
            }
            $stmt->bind_param("sis",$username,$taskNumber,$uname);
            $stmt->execute();
			$result = $stmt->get_result();
			$stmt->close();

			if (!$result) {
	    		trigger_error('Invalid query: ' . $conn->error);
			}

		}

	}

}

?>