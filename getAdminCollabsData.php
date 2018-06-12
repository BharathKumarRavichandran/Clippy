<?php

//File that gets user's own task collaborations data from database and returns to task.js

session_start();
include_once("connect.php");

$username = $_SESSION["username"];
$tablename = "collaborations";

if($_SERVER['REQUEST_METHOD']=="POST"){

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

?>	