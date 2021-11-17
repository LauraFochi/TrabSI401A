<?php
	$createUsersQuery="
		CREATE TABLE IF NOT exists users (
			id INT AUTO_INCREMENT,
			full_name VARCHAR(255) not null,
			nickname VARCHAR(50) not null,
				cpf VARCHAR(14) not null,
			email VARCHAR(100) not null,
			birthdate date not null,
			phone_number varchar(11) not null,
				passwd varchar(50) not null,
			primary key (id),
			constraint unique_user unique (id, nickname, email, phone_number)
		);";

	$createGamesQuery="
		CREATE TABLE IF NOT exists games (
			id INT AUTO_INCREMENT,
			user_id int not null,
			dimension VARCHAR(5) not null,
				bomb_amount int,
			mode char not null default 'c',
			time_expended int,
			victory bool default false,
			points int default 0,
			game_date date default now(),
			primary key (id),
			constraint fk_user_game
				foreign key(user_id)
				references users(id)
		);";

	// Usar para inserts
	function execQuery($qry) {
		$user = 'root';
		$password = '';
		try {
			$conn = new PDO("mysql:host=127.0.0.1;dbname=jamba_web_proj", $user, $password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $conn->prepare($qry);
			unset($conn);
			return $stmt->execute();
		} catch (PDOException $e) {
			echo $e->getMessage();
		}
	}

	// Usar para listagem, exemplo para consulta de uso https://phpdelusions.net/pdo_examples/select
	/**
	 * foreach ($data as $row) {
   * echo $row['name']."<br />\n";
	 *}
	 */
	function execQueryFecth($qry) {
		$user = 'root';
		$password = '';
		try {
			$conn = new PDO("mysql:host=127.0.0.1;dbname=jamba_web_proj", $user, $password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $conn->query($qry)->fetchAll();
			unset($conn);
			return $stmt;
		} catch (PDOException $e) {
			echo $e->getMessage();
		}
	}
?>