<?php

//File that gets user's own task collaborations data from database and returns to task.js

session_start();
include_once("connect.php");

$username = $_SESSION["username"];
$tablename = "collaborations";

if($_SERVER['REQUEST_METHOD']=="POST"){

	if($_POST["permission"]=="admin"){

		$sql = "USE clippy;";
		$conn->query($sql);
		
		$sql = "SELECT * FROM $tablename WHERE username = '$username';";
		$result = $conn->query($sql);

		if (!$result) {
	    	trigger_error('Invalid query: ' . $conn->error);
		}	

		$adminCollabsData = array();

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				$r = array('TaskNumber'=>$row["TaskNumber"],'CollabsUsername'=>$row["CollabsUsername"]);

				array_push($adminCollabsData,$r);
			}
		}	
		echo json_encode($adminCollabsData);

	}	

	if($_POST["permission"]=="others"){

		$username = $_POST["userName"];

		$sql = "USE clippy;";
		$conn->query($sql);
		
		$sql = "SELECT * FROM $tablename WHERE username = ?;";
		if(!$stmt){
            echo "Error preparing statement ".htmlspecialchars($conn->error);
        }
        $stmt->bind_param("s",$username);
        $stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();

		if (!$result) {
	    	trigger_error('Invalid query: ' . $conn->error);
		}	

		$adminCollabsData = array();

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				$r = array('TaskNumber'=>$row["TaskNumber"],'CollabsUsername'=>$row["CollabsUsername"]);

				array_push($adminCollabsData,$r);
			}
		}	
		echo json_encode($adminCollabsData);
	}	

}	

?>	