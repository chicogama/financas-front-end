class Lancamento {

    constructor() {
        this.url = "https://api-financa.herokuapp.com/api/Lancamento";
        this.dados = ""
    }

    listar() {
        this.autenticar();
        this.listaTabela();

    }


    autenticar() {
        var jwt = localStorage.getItem("jwt");
        const xhttp = new XMLHttpRequest();


        xhttp.open("GET", this.url, false);
        xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
        xhttp.send();
        this.dados = xhttp.responseText;
    }

    listaTabela() {
        this.dadosTabela = JSON.parse(this.dados)
        this.arr = this.dadosTabela.lancamentos

        console.log(this.arr);

        let tbody = document.getElementById("tbody");

        for (let i = 0; i < this.arr.length; i++) {
            let tr = tbody.insertRow();

            let td_data = tr.insertCell();
            let td_tipo = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_tipo.innerText = this.arr[i].descricaoLancamento;
            td_valor.innerText = this.arr[i].valor;
            td_data.innerText = this.arr[i].data;

            td_data.classList.add('center');
            td_acoes.classList.add('center');

            let editIcon = document.createElement('i');
            let deleteIcon = document.createElement('i');

            td_acoes.appendChild(editIcon);
            td_acoes.appendChild(deleteIcon);

            editIcon.classList.add("fa-regular")
            editIcon.classList.add("fa-pen-to-square");

            deleteIcon.classList.add("fa-regular")
            deleteIcon.classList.add("fa-trash-can");



        }
    }

    adicionar() {
        event.preventDefault();

        const tipo = document.querySelector("#tipolanc").value;
        const valor = document.querySelector("#valorlanc").value;

        console.log(tipo)
        console.log(valor)

        var jwt = localStorage.getItem("jwt");
        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "https://api-financa.herokuapp.com/api/Lancamento");
        xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            "valor": valor,
            "lancamentoTipo": tipo
        }));

        console.log(xhttp.responseText)
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                const objects = JSON.parse(this.responseText);
                console.log(objects);
                if (objects['codigo'] == "Status code 200") {
                    Swal.fire({
                        text: objects['mensagem'],
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
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
    }

    cancelar() {
        alert('cancelado');
    }



}



var lancamento = new Lancamento();

lancamento.listar();