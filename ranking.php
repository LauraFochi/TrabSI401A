<?php
	require 'pdo.php';

	session_start();
	if($_SESSION['user_id'] == null) {
		header('Location: index.php?nonAuth=true');
		session_destroy();
		return;
	}
?>
<!DOCTYPE html>
<html lang="pt">
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="style/reset.css">
		<link rel="stylesheet" href="style/ranking.css">
		<title>
			Raking
		</title>
	</head>
	<body>
		<header>Ranking</header>
		<table>
			<tr>
				<td>Usuário</td>
				<td>Tamanho</td>
				<td>Tempo</td>
				<td>Pontos</td>
			</tr>
			<?php
			 $queryRanking = "
			 	SELECT
				 	users.full_name as user_name,
					games.dimension as dimension,
					games.time_expended as time,
					games.points as points
				FROM games
					JOIN users
						ON users.id = games.user_id
				ORDER BY
					games.points DESC,
					games.mode DESC,
					games.time_expended ASC,
					games.game_date ASC
				LIMIT 10;
			 ";
			 $games = execQueryFecth($queryRanking);
			 $interator = 0;
			 while ($interator < 10) {
					$currentGame = $games[$interator];
					echo "<tr>
						<td>".($currentGame['user_name']??"Sem Registro")."</td>
						<td>".($currentGame['dimension']??"0x0")."</td>
						<td>".($currentGame['time']?? 0)." s</td>
						<td>".($currentGame['points'] ?? "0")."</td>
					</tr>";
					$interator++;
			 }
			?>
		</table>
		<footer>
			<div class="div-button" onclick="window.location.href='jogo.php'">
				Voltar
			</div>
		</footer>
	</body>
</html>
