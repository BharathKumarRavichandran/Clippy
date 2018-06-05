<?php

session_start();
include('connect.php');
$_SESSION['message']="";

if($_SERVER["REQUEST_METHOD"]=="POST"){

	//if two passwords are equal to each other
	if($_POST["password"]==$_POST["confirmpassword"]){

		//set all the post variables
		$username = trim($_POST['username']);
		$username = stripslashes($username);
		$username = htmlspecialchars($username);
		$username = $conn->real_escape_string($username);

        $email = $conn->real_escape_string($_POST['email']);

        $password = md5($_POST['password']); //md5 hash password for security

        include("createDb.php");

        //set session variables
        $_SESSION['username'] = $username; 
        $_SESSION['email'] = $email;

        //insert user data into database
        $sql = "INSERT INTO user (username,email,password) "."VALUES ('$username','$email','$password')";

        if($conn->query($sql) === true){    
            $_SESSION['message'] = "Registration succesful! Added $username to the database!";
            header("location: menu.php");  
		}

        else{
           	$_SESSION['message'] = 'User could not be added to the database!';
        }
        
        $conn->close();   

	}

	else{
        $_SESSION['message'] = 'Two passwords do not match!';
    }

}

?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Sign Up | Clippy</title>
	<link rel="icon" type="image/png" href="assets/webnote.png">
	<link rel="stylesheet" type="text/css" href="register.css">
</head>
<body>
	<h1>Clippy</h1>
    <h2>Create an account</h1>
    <form action="register.php" method="post" autocomplete="off">
    	<div><?= $_SESSION['message'] ?></div>
    	<input type="text" placeholder="Username" name="username" required />
	    <input type="email" placeholder="Email" name="email" required />
	    <input type="password" placeholder="Password" name="password" autocomplete="new-password" required />
	    <input type="password" placeholder="Confirm Password" name="confirmpassword" autocomplete="new-password" required />
	    <input type="submit" value="Register" name="register"/>
    </form>
</body>
</html>