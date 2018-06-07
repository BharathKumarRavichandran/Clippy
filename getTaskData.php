<?php

//File that gets user's task data from database and returns to task.js

session_start();
include_once("connect.php");

$username = $_SESSION["username"];
$tablename = $username."tasks";

if($_SERVER['REQUEST_METHOD']=="POST"){

	$sql = "USE clippy;";
	$conn->query($sql);
	
	$sql = "SELECT * FROM $tablename;";
	$result = $conn->query($sql);	

	$userTaskData = array();

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){

			$r = array('TaskNumber'=>$row["TaskNumber"],'Checked'=>$row["Checked"],'TaskText'=>$row["TaskText"],'Starred'=>$row["Starred"],'EditTime'=>$row["EditTime"],'CreateTime'=>$row["CreateTime"]);

			array_push($userTaskData,$r);
		}
	}	
	echo json_encode($userTaskData);
}	

?>	