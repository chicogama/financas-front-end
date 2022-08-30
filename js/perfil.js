function getPerfil(url) {

    var jwt = localStorage.getItem("jwt");
    const xhttp = new XMLHttpRequest();



    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send()
    dadosUsuario = xhttp.responseText;

    console.log(dadosUsuario)
    perfil = JSON.parse(dadosUsuario)


    var meuNome = document.getElementById("meunome").value;
    var meuEmail = document.getElementById("meuemail").value;
    var meuCPF = document.getElementById("meucpf").value;
    var meuNasc = document.getElementById("meunascimento").value;

    /*    var data = new Date(perfil.dataNascimento);
       console.log(data)
       var month = data.getUTCMonth() + 1; //months from 1-12
       var day = data.getUTCDate();
       var year = data.getUTCFullYear();
       newdate = year + "-0" + month + "-" + day;

       console.log(newdate) */

    document.getElementById('meunome').value = perfil.nome;
    document.getElementById('meuemail').value = perfil.email;
    document.getElementById('meucpf').value = perfil.cpf;
    document.getElementById('meunascimento').value = perfil.nascimento;


}

if (jwt != null) {
    getPerfil("https://api-financa.herokuapp.com/api/Usuario");
}