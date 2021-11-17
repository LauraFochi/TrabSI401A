<?php
    require 'pdo.php';
    // execQuery($createUsersQuery);
    // execQuery($createGamesQuery);

    if (isset($_SESSION['user_id'])) {
         header("Location: jogo.php");
    }
    if (isset($_POST)) {
        switch($_POST['action']) {
            case 'login':
                $nickname = $_POST['nickname'];
                $password = $_POST['password'];

                $queryLogin = "
                    select id, full_name
                        from users
                    where nickname = '$nickname'
                        and passwd = '$password'
                    limit 1;
                ";
                $userFound = execQueryFecth($queryLogin);
                if ($userFound != null) {
                    foreach($userFound as $user) {
                        session_start();
                        session_id($user['id']);
                        $_SESSION['user_id'] = $user['id'];
                        $_SESSION['name'] = $user['full_name'];
                    }
                    header("Location: jogo.php");
                    return;
                }
                    header("Location: index.php?warningLogin=true");
                    session_destroy();
                break;
        }
    }
?>
<!DOCTYPE html>
<html lang="pt">

    <head>
        <link rel="stylesheet" type="text/css" href="style/index.css">
        <meta charset="UTF-8">
        <title>Trab SI401A - Login</title>
    </head>

    <body>

        <header>
            Login
        </header>

        <form id='form_login' action='index.php' method='POST'>
        <main>
            <label for="nickname">Usuário</label>
            <br>
            <input id="nickname" type="text" placeholder="Insira o usuário"
                name="nickname" required>


            <br><br>

            <label for="password">Senha</label>
            <br>
            <input id="password" type="password" placeholder="Insira a senha"
                name="password"
                required>
            <input id="action" type="hidden" name="action" value='login'>
            <br><br><br>

            <div id="button-section">
                <button onclick="submitForm()">Entrar</button>
                <br><br>
                <button type="button"
                    onclick="window.location.href='cadastro.php'">Criar conta</button>
            </div>
        </main>
    </form>
    </body>
    <script>
        const submitForm = () => {
			document.getElementById("form_login").submit();
        }
        const hasSignIn = "<?php
            if($_GET !== null) {
                echo $_GET['signIn'];
            }
        ?>";
        if (hasSignIn){
            alert("Cadastro realizado com sucesso!");
        }

        const hasWarningLogin = "<?php
            if($_GET !== null) {
                echo $_GET['warningLogin'];
            }
        ?>";
        if (hasWarningLogin){
            alert("Usuário ou senha incorretos!");
        }

        const isNotAuthorized = "<?php
            if($_GET !== null) {
                echo $_GET['nonAuth'];
            }
        ?>";
        if (isNotAuthorized){
            alert("Acesso não autorizado, realize login!");
        }
    </script>
</html>