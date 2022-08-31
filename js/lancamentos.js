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

            let td_id = tr.insertCell();
            let td_tipo = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arr[i].id;
            td_tipo.innerText = this.arr[i].descricaoLancamento;
            td_valor.innerText = this.arr[i].valor;
            td_id.innerText = this.arr[i].id;


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
        xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhttp.send(JSON.stringify({
            "valor": valor,
            "lancamento": tipo
        }));
    }

    cancelar() {
        alert('cancelado');
    }



}



var lancamento = new Lancamento();

lancamento.listar();