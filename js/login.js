var jwt = localStorage.getItem("jwt");
if (jwt != null) {
    window.location.href = '../index.html'
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://api-financa.herokuapp.com/api/Auth/signin");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "userName": username,
        "password": password
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if (objects['authenticated'] == true) {
                localStorage.setItem("jwt", objects['accessToken']);
                Swal.fire({
                    text: objects['mensagem'],
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../index.html';
                    }
                });
            } else {
                Swal.fire({
                    text: objects['title'],
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    return false;
}