<?php

//File that gets user's note data from database and returns to note.js

session_start();
include_once("connect.php");

$username = $_SESSION["username"];
$tablename = $username."notes";

if($_SERVER['REQUEST_METHOD']=="POST"){

	$sql = "USE clippy;";
	$conn->query($sql);
	
	$sql = "SELECT * FROM $tablename;";
	$result = $conn->query($sql);	

	$userNoteData = array();

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){

			$r = array('NoteNumber'=>$row["NoteNumber"],'Title'=>$row["Title"],'NoteText'=>$row["NoteText"],'Starred'=>$row["Starred"],'Labels'=>$row["Labels"],'EditTime'=>$row["EditTime"],'CreateTime'=>$row["CreateTime"]);

			array_push($userNoteData,$r);
		}
	}	
	echo json_encode($userNoteData);
}	

?>	
