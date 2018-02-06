<html>
<head>
	<title>Portal Admin :: Edit/Delete User</title>
</head>
<body>
	<h1>Edit/Delete Student</h1>
	<?php
	include 'database.php';

	if ($_SERVER["REQUEST_METHOD"] == 'POST') {
		$uid = $_POST['uid'];
		
		if (array_key_exists("delete", $_POST)) {
			$del_1 = $conn->prepare("DELETE FROM user WHERE uid=?");
			$del_2 = $conn->prepare("DELETE FROM user_meta WHERE uid=?");
			$del_3 = $conn->prepare("DELETE FROM membership WHERE uid=?");
			
			$del_1->bind_param("i", $uid);	
			$del_2->bind_param("i", $uid);
			$del_3->bind_param("i", $uid);
			
			$del_3->execute();
			echo($del_3->error());
			$del_2->execute();
			echo($del_2->error());
			$del_1->execute();
			echo($del_1->error());
			?><p style="font-weight:bold">Student <?php echo($uid); ?> [<?php echo($_POST["name"]);?>] Deleted</p>
			<p><a href="index.php">Menu</a></p><?php

		} else if(array_key_exists("edit", $_POST)) {

			$username_update = $conn->prepare("UPDATE user SET username=? WHERE uid=?");
			$password_update = $conn->prepare("UPDATE user SET password=?, change_flag=1 WHERE uid=?");
			$meta_update = $conn->prepare("UPDATE user_meta SET first_name=?, last_name=?, email=? WHERE uid=?");
			$membership_update = $conn->prepare("UPDATE membership SET role=? WHERE uid=?");

			$username_update->bind_param("si", $_POST["username"], $uid);
			$password_update->bind_param("si", $password, $uid);
			$meta_update->bind_param("sssi", $_POST["first_name"], $_POST["last_name"], $_POST["email"], $uid);
			$membership_update->bind_param("si", $_POST["role"], $uid);

			$username_update->execute();
			echo($username_update->error);
			$meta_update->execute();
			echo($meta_update->error);
			$membership_update->execute();
			echo($membership_update->error);
			
			if(array_key_exists("changepass", $_POST)) {
				$hashPass = password_hash($_POST["changepass"], PASSWORD_BCRYPT);
				$password_change->execute();
				echo($password_change->error);
				?><p>Password changed to: <span style="font-weight:bold"><?php echo($_POST["password"]); ?></span></p><?php
			}
			?><p style="font-weight:bold">User Updated: <?php echo($_POST["first_name"] . " " . $_POST["last_name"]); ?></p>
			<div><a href="edit_user.php">Again</a> | 
			<a href="index.php">Backend Menu</a></div><?php
		} else {
			$users = get_user_data($conn);
			$user = $users[$uid];
			?>
			<form action="edit_user.php" method="post">
				<input type="hidden" name="uid" value="<?php echo($uid);?>" />
				<input type="hidden" name="edit" value="1" />

				<div><label for="delete">Delete?</label><input type="checkbox" id="delete" name="delete" /></div>
				<p style="font-weight:bold; color:red">WARNING! Delete irreversibly removes grades and handin records.</p>
				
				<div><label for="changepass">Password Change:</label><input type="text" id="changepass" name="changepass" /></div>

				<div><label for="username">Username:</label><input type="text" id="username" name="username" placeholder="Username" value="<?php echo($user["username"]); ?>" /></div>
				<div><label for="first_name">First Name:</label><input type="text" id="first_name" name="first_name" placeholder="First Name" value="<?php echo($user["first_name"]); ?>" /></div>
				<div><label for="last_name">Last Name:</label><input type="text" id="last_name" name="last_name" placeholder="Last Name" value="<?php echo($user["last_name"]); ?>" /></div>
				<div><label for="email">Email:</label><input type="text" id="email" name="email" placeholder="Email" value="<?php echo($user["email"]); ?>" /></div>
				
				<input type="submit" />
			</form>
			<?php  }
	} else {	
		$users = get_user_data($conn);
		?><form action="edit_user.php" method="POST">
			<p>Select a user to edit.</p>
			<div><select name="uid">
				<?php
				foreach ($users as $user) {
					?><option value="<?php echo($user["uid"]);?>">
						<?php echo($user["username"]);?> [<?php echo($user["first_name"]. " " . $user["last_name"]); ?>]
					</option><?php
				} ?>
			</select></div>
			<div><input type="submit" /></div>
		</form>
	<?php } ?>
</body>
</html>
