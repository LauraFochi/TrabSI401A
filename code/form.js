const submitForm = (idForm) => {
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

	document.getElementById(idForm).submit();
}