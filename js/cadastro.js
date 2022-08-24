function cadastra() {
    event.preventDefault();
    const nome = document.querySelector('#fnome').value;
    const email = document.querySelector('#fmail').value;
    const cpf = document.querySelector('#fCPF').value;
    const nascimento = document.querySelector('#fnascimento').value;
    const senha = document.querySelector('#fsenha').value;
    const confsenha = document.querySelector('#fconfsenha').value;
    const alerta = document.querySelector('#alerta');


    if (senha === confsenha) {
        alerta.style.color = "green"
        alerta.innerHTML = 'senhas conferem'
        const xhttp = new XMLHttpRequest();


        xhttp.open("POST", "https://api-financa.herokuapp.com/api/Usuario");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify({
            "nome": nome,
            "cpf": cpf,
            "nascimento": nascimento,
            "email": email,
            "senha": senha,
        }));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                const objects = JSON.parse(this.responseText);
                console.log(objects);
                if (objects['codigo'] == "Status Code 200") {
                    Swal.fire({
                        text: objects['mensagem'],
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = './login.html';
                        }
                    });
                } else {
                    Swal.fire({
                        text: objects['mensagem'],
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        };
    } else {
        alerta.innerHTML = 'senhas não conferem'
        alerta.style.color = "red"
    }
    return false;

}