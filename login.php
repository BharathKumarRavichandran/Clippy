<?php

session_start();
include('connect.php');
$_SESSION['message']="";

if($_SERVER["REQUEST_METHOD"]=="POST"){

	$username = trim($_POST['username']);
	$username = stripslashes($username);
	$username = htmlspecialchars($username);
	$username = $conn->real_escape_string($username);

	$password = md5($_POST['password']);

	include("createDb.php");

	$sql = "SELECT * FROM user WHERE username='".$username."';";
	$result = $conn->query($sql);

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){

			if($row["password"]==$password){
				$_SESSION["username"] = $username;
				$_SESSION["email"] = $row["email"];
				include("createDataTable.php");
				header("location: menu.php");  
			}
			else{
				$_SESSION['message'] = "*Sorry, Wrong Password!";
			}
		}
	}	
	else{
		$_SESSION['message'] = "*Username doesn't exist!";
	}	
}

?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Login | Clippy</title>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
	<h1>Clippy</h1>
    <h2>Login</h2>
    <form action="login.php" method="post" autocomplete="off">
    	<div><?= $_SESSION['message'] ?></div>
    	<input type="text" placeholder="Username" name="username" required />
	    <input type="password" placeholder="Password" name="password" autocomplete="new-password" required />
	    <input type="submit" value="Login" name="login"/>
    </form>
</body>
</html>