var jwt = localStorage.getItem("jwt");

function logout() {
    if (jwt != null) {
        localStorage.removeItem("jwt");
        window.location.href = '../index.html'
    }
}


logado()