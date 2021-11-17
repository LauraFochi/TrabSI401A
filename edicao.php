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
      case 'update':
        $full_name= $_POST['full_name'];
        $nickname= $_POST['nickname'];
        $cpf= $_POST['cpf'];
        $password1= $_POST['password1'];
        $password2= $_POST['password2'];
        $birthdate= strtotime($_POST['birthdate']);
        $actual_date= date('Y-m-d', $birthdate);
        $phone_number= $_POST['phone_number'];
        $email= $_POST['email'];

        $queryUserAlreadyExist = "
            select * from users
                where nickname = '$nickname'
                and id != ".$_SESSION['user_id'].";";

        $queryUserEmailOrPhoneAlreadyExist = "
            select * from users
                where (email = '$email'
                    OR phone_number = '$phone_number')
                    and id != ".$_SESSION['user_id'].";";


        $userAlreadyExist = execQueryFecth($queryUserAlreadyExist);
        if ($userAlreadyExist != null) {
            header('Location: edicao.php?userExists=nickname');
            die();
        }
        $userEmailOrPhone = execQueryFecth($queryUserEmailOrPhoneAlreadyExist);
        if ($userEmailOrPhone != null) {
            header('Location: edicao.php?userExists=emailOrPhone');
            die();
        }
        $updateQuery = "
			UPDATE users
				SET
					full_name = '$full_name',
					nickname = '$nickname',
					cpf = '$cpf',
					passwd = '$password1',
					birthdate = '$actual_date',
					phone_number = '$phone_number',
					email = '$email'
                WHERE id = ".$_SESSION['user_id'].";";
			execQuery($updateQuery);
			header('Location: edicao.php?sucess=true');
			die();
        break;
      }
    }

?>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="UTF-8">
        <title>Informações pessoais</title>
        <link rel="stylesheet" type="text/css" href="style/edicao.css">
    </head>

    <body>
        <header>
            <a id="titulo">Informações pessoais</a>
        </header>
        <form id="form_update" action="edicao.php" method="POST">
        <div class="container">
            <div class="box">
                <a>Nome Completo</a>
                <input
					type="text"
					id='full_name'
					name="full_name"
					maxlength="255"
					>
                    <br><br>
                <a>CPF</a>
                <input
					type="text"
					maxlength="11"
					id='cpf'
					name='cpf'
					>
                    <br><br>
                <a>Data de Nascimento</a>
                <input
					type="date"
					id='birthdate'
					name="birthdate"><br><br>
                <a>Telefone</a>
                <input type="text"
					maxlength='11'
					id='phone_number'
					name='phone_number'><br><br>
                <a>Email</a>
                <input
                    id='email'
					type="email"
					name='email'><br><br>
            </div>
        </div>

        <div class="containerLogin">
            <div class="boxLogin">
                <a>Usuário</a>
                <input
                    id='nickname'
				    name='nickname'
				    maxlength="50"
                    type="text"><br><br>
                <a>Senha</a>
                <input
                    id='password1'
                    type="password"
                    name='password1'>
                <a>Confirmar Senha</a>
                <input
                    type="password"
                    id='password2'
                    name='password2'>
            </div>
        </div>
        <input
		    type="hidden"
		    value="update"
		    name='action'
		    id='action_update'
		    >
        </form>
        <footer>
            <button id="voltar"
                onclick="window.location.href='jogo.php'">Voltar</button>
            <button id="salvar"
                onclick="submitForm('form_update')">Salvar</button>
        </footer>
    </body>
    <script src="code/form.js"></script>
    <script>
        const getUserExist = "<?php
            if ($_GET != null) {
                echo $_GET['userExists'];
            }
        ?>";
        if (getUserExist) {
            const message = getUserExist === 'nickname' ? "Nickname de usuário": "Email ou Telefone";
            alert(message + " já está em uso para outro usuário");
        }

        const sucess = "<?php
            if ($_GET != null) {
                echo $_GET['sucess'];
            }
        ?>";
        if (sucess) {
            alert("Usuário atualizado com sucesso!");
        }
    </script>
</html>
