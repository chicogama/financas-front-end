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

        console.log(this.dados)
    }

    listaTabela() {
        this.dadosTabela = JSON.parse(this.dados)
        this.list = [this.dadosTabela]

        console.log(this.list)

        let tbody = document.getElementById("tbody");

        for (let i = 0; i < this.list.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_tipo = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.list[i].id;

        }
    }


    adicionar() {


    }

    lerForms() {

    }

    cancelar() {

    }



}

var lancamento = new Lancamento();

lancamento.listar()