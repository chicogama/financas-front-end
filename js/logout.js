var jwt = localStorage.getItem("jwt");

var btn = document.querySelector('.btnlogin');
var dropdown = document.querySelector('.dropdown')

if (jwt != null) {
    btn.style.display = 'none';
    dropdown.style.display = 'inline-block';
}

function logout() {
    if (jwt != null) {
        localStorage.removeItem("jwt");
        window.location.href = '../index.html'
    }
}