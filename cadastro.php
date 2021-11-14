<?php
	require 'pdo.php';
	if($_POST != null) {
		switch ($_POST['action']) {
			case 'create':
				$full_name= $_POST['full_name'];
				$nickname= $_POST['nickname'];
				$cpf= $_POST['cpf'];
				$password1= $_POST['password1'];
				$password2= $_POST['password2'];
				$birthdate= strtotime($_POST['birthdate']);
				$actual_date=date('Y-m-d', $birthdate);
				$phone_number= $_POST['phone_number'];
				$email= $_POST['email'];

				$queryUserAlreadyExist = "
					select * from users
						where nickname = '$nickname';
				";

				$queryUserEmailOrPhoneAlreadyExist = "
					select * from users
						where email = '$email'
							OR phone_number = '$phone_number'
				";


				$userAlreadyExist = execQueryFecth($queryUserAlreadyExist);
				if ($userAlreadyExist != null) {
					header('Location: cadastro.php?userExists=nickname');
					die();
				}
				$userEmailOrPhone = execQueryFecth($queryUserEmailOrPhoneAlreadyExist);
				if ($userEmailOrPhone != null) {
					header('Location: cadastro.php?userExists=emailOrPhone');
					die();
				}

				$insertQuery = "
				INSERT INTO users
					(
						full_name,
						nickname,
						cpf,
						passwd,
						birthdate,
						phone_number,
						email
					)
					values
					(
						'$full_name',
						'$nickname',
						'$cpf',
						'$password1',
						'$actual_date',
						'$phone_number',
						'$email'
					)
				;";

				header('Location: index.php?signIn=true');
				die();
		break;
		}
	}
?>
<!DOCTYPE html>
<html lang="pt">
	<head>
		<title>Cadastro de Usuário</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="style/cadastro.css">
	</head>
	<body>
		<div class="container">
			<div class="title">Cadastro</div>
			<div class="conteudo">
				<form id="form_cadastro" action="cadastro.php" method="POST">
					<div class="detalhes-usuario">
						<div class="inputbox">
							<span class="detalhes">Nome Completo</span>
							<input type="text" id='full_name' name="full_name" maxlength="255"
							placeholder="Insira seu nome completo">
						</div>
						<div class="inputbox">
							<span class="detalhes">Usuário</span>
							<input type="text" id='nickname' name='nickname' maxlength="50" placeholder="Insira seu
								usuário">
						</div>
						<div class="inputbox">
							<span class="detalhes">CPF</span>
							<input
								type="text"
								maxlength="11"
								id='cpf' name='cpf'
								placeholder="Insira seu cpf">
						</div>
						<div class="inputbox">
							<span class="detalhes">Senha</span>
							<input type="password" placeholder="Insira sua senha"
								id='password1' name='password1'>
						</div>
						<div class="inputbox">
							<span class="detalhes">Data Nascimento</span>
							<input type="date" placeholder="Insira sua data de nascimento"
								id='birthdate' name="birthdate">
						</div>
						<div class="inputbox">
							<span class="detalhes">Confirmar Senha</span>
							<input type="password" placeholder="Confirme sua senha"
								id='password2' name='password2'>
						</div>
						<div class="inputbox">
							<span class="detalhes">Telefone</span>
							<input type="text"
							maxlength='11'
							 placeholder="Insira seu telefone"
								id='phone_number' name='phone_number'>
						</div>
						<div class="inputbox">
							<span class="detalhes">Email</span>
							<input type="email" placeholder="Insira seu email"
								id='email' name='email'>
						</div>
					</div>
					<div class="botao">
						<input type="button" onclick="submitForm()"
							value="Cadastar">
						<input type="button" onclick="window.location.href='index.html'"
							value="Sair">
					</div>
					<input type="hidden" name ='action' id='action' value='create'>
				</form>
			</div>
		</div>
		<script>
			const submitForm = () => {
				const isNum = (val) => /^\d+$/.test(val)
				const fullname = document.getElementById('full_name').value
				const nickname = document.getElementById('nickname').value
				const cpf = document.getElementById('cpf').value
				const password1 = document.getElementById('password1').value
				const password2 = document.getElementById('password2').value
				const birthdate = document.getElementById('birthdate').value
				const phoneNumber = document.getElementById('phone_number').value
				const email = document.getElementById('email').value

				if (
					!fullname ||
					!nickname ||
					!cpf ||
					!password1 ||
					!password2 ||
					!birthdate ||
					!phoneNumber ||
					!email
				) {
					return alert("Preencha todos os campos do Formulário");
				}
				if ( cpf.length < 11 || !isNum(cpf) ) {
					return alert("CPF Inválido");
				}

				if (
					phoneNumber.length < 11 || !isNum(phoneNumber)
				) {
					return alert("Telefone Inválido");
				}
				if (password1 !== password2) {
					return alert("As senhas devem ser iguais");
				}

				document.getElementById("form_cadastro").submit();
				console.log('aoba');
			}
			const getUserExist = "<?php
					if ($_GET != null) {
						echo $_GET['userExists'];
					}
				?>";
			if (getUserExist) {
				const message = getUserExist === 'nickname' ? "Nickname de usuário": "Email ou Telefone";
				alert(message + " já cadastrado");
			}
		</script>
	</body>
</html>
