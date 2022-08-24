function getPerfil(url) {

    var jwt = localStorage.getItem("jwt");
    const xhttp = new XMLHttpRequest();


    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send()
    return xhttp.responseText;
}


console.log(getPerfil("https://api-financa.herokuapp.com/api/Usuario"))