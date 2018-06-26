<?php

//File that gets other users task collaborations data from database and returns to task.js

session_start();
include_once("connect.php");

$username = $_SESSION["username"];

if($_SERVER['REQUEST_METHOD']=="POST"){

	if($_POST["purpose"]=="getCollabsData"){

		$sql = "USE clippy;";
		$conn->query($sql);

		$taskNumber = $_POST['taskNumber'];
		$uname = $_POST['userName'];
		$tablename = $uname."tasks";

		$stmt = $conn->prepare("SELECT * FROM $tablename WHERE TaskNumber = ?;");
		if(!$stmt){
            echo "Error preparing statement ".htmlspecialchars($conn->error);
        }
        $stmt->bind_param("i",$taskNumber);
        $stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();	

		if (!$result) {
	    	trigger_error('Invalid query: ' . $conn->error);
		}	

		$otherCollabsData = array();

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				$r = array('TaskNumber'=>$row["TaskNumber"],'Checked'=>$row["Checked"],'TaskText'=>$row["TaskText"],'Starred'=>$row["Starred"],'EditTime'=>$row["EditTime"],'CreateTime'=>$row["CreateTime"]);

				array_push($otherCollabsData,$r);
			}
		}	
		echo json_encode($otherCollabsData);

	}

}	

?>	