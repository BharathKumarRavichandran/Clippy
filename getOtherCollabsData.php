<?php

//File that gets other users task collaborations data from database and returns to task.js

session_start();
include_once("connect.php");

$username = $_SESSION["username"];
$tablename = "collaborations";

if($_SERVER['REQUEST_METHOD']=="POST"){

	$sql = "USE clippy;";
	$conn->query($sql);
	
	$stmt = $conn->prepare("SELECT * FROM $tablename WHERE CollabsUsername = ?;");
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

	$otherCollabsData = array();

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){

			$r = array('username'=>$row["username"],'TaskNumber'=>$row["TaskNumber"]);

			array_push($otherCollabsData,$r);
		}
	}	
	echo json_encode($otherCollabsData);
}	

?>	