function getPerfil(url) {

    var jwt = localStorage.getItem("jwt");
    const xhttp = new XMLHttpRequest();


    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send()
    dadosUsuario = xhttp.responseText;

    console.log(dadosUsuario)

    var meuNome = document.getElementById("meunome").value;
    var meu = JSON.stringify(dadosUsuario);
    document.getElementById('meunome').value = meu;


}


getPerfil("https://api-financa.herokuapp.com/api/Usuario")