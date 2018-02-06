<?php
	$servername = "localhost";
	$username = "henry";
	$password = "password";
	$dbname = "digital_humanities";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	function get_data_types($conn){
		$res = $conn->query("SELECT * FROM data_type");
		$data_types = array();

		if ($res->num_rows > 0) {
			while ($data_type = $res->fetch_assoc()) {
				$data_types[] = $data_type;
			}
			return $data_types;
		} else {
			die("<span style=\"color:red;\"><b>You must <a href=\"add_data_type.php\">add a data type</a>.</b></span>");
		}
	}

	function get_all_data($conn) {
		$res = $conn->query("SELECT * FROM data");
		$all_data = array();
		
		if ($res->num_rows > 0) {
			while ($data = $res->fetch_assoc()) {
				$all_data[$data["data_id"]] = $data;
			}
			return $all_data;
		} else{
			die("<span style=\"color:red;\"><b>You must <a href=\"add_data.php\">add data</a>.</b></span>");
		}
	}

	function get_all_data_meta($conn, $data_id) {
		$res = $conn->query("SELECT * FROM data_meta WHERE data_id = ".$data_id);
		$all_data_meta = array();
		
		if ($res->num_rows > 0) {
			while ($data = $res->fetch_assoc()) {
				$all_data_meta[$data["data_id"]] = $data;
			}
			return $all_data_meta;
		} else{
			die("<span style=\"color:red;\"><b>You must <a href=\"add_data_meta.php\">add data meta</a>.</b></span>");
		}
	}

	function get_user_data($conn) {
		$res = $conn->query("SELECT user.uid, username, first_name, last_name, email FROM user INNER JOIN membership ON user.uid = membership.uid INNER JOIN user_meta ON user.uid = user_meta.uid ORDER BY username");
		$users = array();
		
		if($res->num_rows > 0) {
			while ($user = $res->fetch_assoc()) {
				$users[$user["uid"]] = $user;
			}
			return $users;
		} else{
			die("<span style=\"color:red;\"><b>You must <a href=\"add_user.php\">add a user</a>.</b></span>");
		}

	}
?>
