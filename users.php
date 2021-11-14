<?php
	$br = '<br/>';
	if($_POST != null) {
		echo $_POST['full_name'].$br;
		echo $_POST['nickname'].$br;
		echo $_POST['cpf'].$br;
		echo $_POST['password1'].$br;
		echo $_POST['password2'].$br;
		echo $_POST['birthdate'].$br;
		echo $_POST['phone_number'].$br;
		echo $_POST['email'].$br;
		return 'kek';
	}
?>