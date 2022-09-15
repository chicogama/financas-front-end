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
        this.arr = this.dadosTabela.lancamentos;
        console.log(this.arr);

        let tbody = document.getElementById("tbody");

        for (let i = 0; i < this.arr.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_data = tr.insertCell();
            let td_tipo = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arr[i].id;
            td_tipo.innerText = this.arr[i].descricaoLancamento;
            td_valor.innerText = this.arr[i].valor;
            td_data.innerText = this.arr[i].data;

            td_id.classList.add('center');
            td_data.classList.add('center');
            td_acoes.classList.add('center');

            let editIcon = document.createElement('i');
            editIcon.classList.add("fa-regular")
            editIcon.classList.add("fa-pen-to-square");

            let deleteIcon = document.createElement('i');
            td_acoes.appendChild(editIcon);
            td_acoes.appendChild(deleteIcon);
            deleteIcon.setAttribute("onclick", "lancamento.deletar(" + this.arr[i].id + ")");




            deleteIcon.classList.add("fa-regular")
            deleteIcon.classList.add("fa-trash-can");



        }
    }

    adicionar() {
        event.preventDefault();

        const tipo = document.querySelector("#tipolanc").value;
        const valor = parseFloat(document.querySelector("#valorlanc").value);

        console.log(tipo)
        console.log(valor)

        var jwt = localStorage.getItem("jwt");
        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", this.url);
        xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
        xhttp.setRequestHeader("Content-Type", "application/json");

        let jsonText = JSON.stringify({
            "valor": valor,
            "lancamentoTipo": tipo
        });
        xhttp.send(jsonText)
        console.log(jsonText)

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

    deletar(id) {
        let tbody = document.getElementById("tbody");

        swal({
                title: "Deletando Lançamento",
                text: "Tem certeza que deseja deletar este lançamento?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    for (let i = 0; i < this.arr.length; i++) {
                        if (this.arr[i].id == id) {

                            var jwt = localStorage.getItem("jwt");
                            const xhttp = new XMLHttpRequest();

                            console.log('deletando o ID: ' + id)

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

                            xhttp.open("DELETE", "https://api-financa.herokuapp.com/api/Lancamento/" + id + "");

                            xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
                            xhttp.send();

                            tbody.deleteRow(i);

                        }
                    };
                } else {
                    swal("Delete cancelado!");
                }
            });


    }



}



var lancamento = new Lancamento();

lancamento.listar();