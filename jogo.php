<?php
	require 'pdo.php';

  session_start();
  if($_SESSION['user_id'] == null) {
    header('Location: index.php?nonAuth=true');
    session_destroy();
    return;
  }

  if (isset($_POST)) {
    switch($_POST['action']) {
      case 'logout':
          session_destroy();
          header("Location: index.php");
          return;
        break;
      case 'game':
        $userId= $_SESSION['user_id'];
        $dimension = $_POST['dimension'];
        $bomb_amount = $_POST['bomb_amount'];
        $mode = $_POST['mode'];
        $time_expended = $_POST['time_expended'];
        $victory = $_POST['victory'];
        $points = $_POST['points'];
        $game_date = $_POST['game_date'];
        $insertGame = "
          INSERT INTO games (
            user_id,
            dimension,
            bomb_amount,
            mode,
            time_expended,
            victory,
            points,
            game_date
            )
            values (
              $userId,
              '$dimension',
              $bomb_amount,
              '$mode',
              $time_expended,
              $victory,
              $points,
              '$game_date'
            )
        ";
        execQuery($insertGame);
        break;
    }
  }
?>
<!DOCTYPE HTML>

<html lang="pt">

  <head>
    <title>Tela de Jogo</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="style/tela_jogo.css" />
  </head>

  <body>
    <div class="div-align">
      <form>
        <table class="tabuleiro">
          <tr>
            <td class="coluna">Usuário:&nbsp;<?php
            echo substr($_SESSION['name'], 0, 20)
            ?><br>
              <a>Tempo: </a> <a id="cronometro">00:00:00</a>
            </td>
            <td class="coluna">
              Número de linhas:&nbsp;&nbsp;&nbsp;<input id="linha" type="text"
                maxlength="2" size="3"><br>
              Número de colunas:&nbsp;<input id="coluna" type="text"
                maxlength="2" size="3"><br>
            </td>
            <td class="coluna">
              Dificuldade:&nbsp;
              <select id="nivel">
                <option value="c">Clássico</option>
                <option value="r">Rivotril</option>
              </select>
            </td>
          </tr>
        </table>
        <input id="action" type="hidden" name="action" value='game'>
      </form>
      <br>
      <div id='table-shower'>
        <img alt="Imagem simulando o jogo" src="assets/campo_minado.png">
      </div>
      <br>
      <button onclick="window.location.href='edicao.php'">Editar configurações
        pessoais</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button onclick="window.location.href='ranking.php'">Visualizar Ranking</button>
    </div>

    <aside>
      <br>
      <button class="start" onclick="iniciar()">Novo Jogo</button><br><br><br>
      <button class="trapaca" onclick="ativarTrapaca()">Trapaça</button><br><br><br>
      Histórico de Partidas
      <table class="historico">
        <tbody id="tabelaHistorico">
          <?php
            $queryHistory = "
              SELECT
                games.dimension as dimension,
                games.bomb_amount as bomb_amount,
                games.mode as mode,
                games.time_expended as time,
                games.victory as victory,
                games.points as points
                FROM games
                WHERE user_id = '".$_SESSION['user_id']."'
                ORDER BY date(game_date) DESC
                LIMIT 3;
            ";
            $histories = execQueryFecth($queryHistory);
            foreach($histories as $history) {
              echo "
                <ul class='historico'>
                  <li>Jogador: ".$_SESSION['name']."</li>
                  <li>Dimensao: ".$history['dimension']."</li>
                  <li>NumerodeBombas: ".$history['bomb_amount']."</li>
                  <li>Modalidade: ".($history['mode'] === 'c' ? "Clássico": "Rivotril")."</li>
                  <li>Tempo: ".$history['time']."s</li>
                  <li>Resultado: ".($history['victory'] ? "Vitória" : "Derrota")."</li>
                  <li>Pontuação: ".$history['points']."</li>
                </ul>
              ";
            }
          ?>
        </tbody>
      </table>
      <br>
      <button class="sair" onclick="logout()">Sair</button>
    </aside>
    <form id='form_logout' type='hidden' action='jogo.php' method='POST'>
      <input id="action" type="hidden" name="action" value='logout'>
    </form>
    <form id='form_game' action='jogo.php' method='POST'>
      <input type='hidden' name='dimension' id='dimension'>
      <input type='hidden' name='bomb_amount' id='bomb_amount'>
      <input type='hidden' name='mode' id='mode'>
      <input type='hidden' name='time_expended' id='time_expended'>
      <input type='hidden' name='victory' id='victory'>
      <input type='hidden' name='points' id='points'>
      <input type='hidden' name='game_date' id='game_date'>
      <input id="action" type="hidden" name="action" value='game'>
    </form>
  </body>
    <script src="code/jogo.js"></script>
    <script>
      const logout = () => {
        document.getElementById('form_logout').submit();
      }
    </script>
</html>