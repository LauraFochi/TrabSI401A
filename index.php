<?php
    require 'pdo.php';
    execquery($createUsersQuery);
    execquery($createGamesQuery);
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

            <br><br><br>

            <div id="button-section">
                <button type="submit"
                    onclick="window.location.href='jogo.html'">Entrar</button>
                <br><br>
                <button type="button"
                    onclick="window.location.href='cadastro.php'">Criar conta</button>
            </div>
        </main>
    </body>
    <script>
        const hasSignIn = "<?php
            if($_GET !== null) {
                echo $_GET['signIn'];
            }
        ?>";
        if (hasSignIn){
            alert("Cadastro realizado com sucesso!");
        }
    </script>
</html>