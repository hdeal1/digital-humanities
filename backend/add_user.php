<html>
<head>
	<title>Portal Admin :: Add User (Batch)</title>
</head>
<body>
	<h1>Add User (Batch)</h1>
	<?php
	include 'database.php';
	$method = $_SERVER['REQUEST_METHOD'];

	if ($method == 'POST'){
		$username = $_POST['username'];
		$first_name = $_POST['first_name'];
		$last_name = $_POST['last_name'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$role = $_POST['role'];

		$user_insert = $conn->prepare("INSERT INTO user(username, password, change_flag) VALUES (?, ?, 1)");
		$uid_lookup = $conn->prepare("SELECT uid FROM user WHERE username=?");
		$meta_insert = $conn->prepare("INSERT INTO user_meta (uid, first_name, last_name, email) VALUES (?, ?,?,?)");
		$membership = $conn->prepare("INSERT INTO membership (uid, role) VALUES (?, 'user')");
		
		$user_insert->bind_param("ss", $username, $hashPass);
		$uid_lookup->bind_param("s", $username);
		$uid_lookup->bind_result($uid);
		$meta_insert->bind_param("isss", $uid, $first_name, $last_name, $email);
		$membership->bind_param("i", $uid);
		
		$hashPass = password_hash($password, PASSWORD_BCRYPT);

		$user_insert->execute();
		echo($user_insert->error);

		$uid_lookup->execute();
		echo($uid_lookup->error);
		$uid_lookup->fetch();
		$uid_lookup->free_result();

		$meta_insert->execute();
		echo($meta_insert->error);
		
		$membership->execute();
		echo($membership->error);
		
	?>
	<h2>Student Added :: <?php echo($username);?></h2>
	<div><?php echo($uid);?>, <?php echo($first_name . " " . $last_name); ?>,
		<?php echo($password); ?></div>

	<div><a href="add_user.php">Again?</a> | 
	<a href="index.php">Backend Menu</a></div><?php
} else {
	?><form action="add_user.php" method="post">
		<div><input type="text" name="username" placeholder="Username" /></div>
		<div><input type="text" name="first_name" placeholder="First Name" /></div>
		<div><input type="text" name="last_name" placeholder="Last Name" /></div>
		<div><input type="text" name="email" placeholder="Email" /></div>
		<div><input type="password" name="password" placeholder="Password" /></div>	
	<input type="submit">
	</form><?php

}
?>
</body>
</html>
	



