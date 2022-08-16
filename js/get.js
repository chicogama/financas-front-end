const fetchUser = () => {
    const url = 'https://api-financa.herokuapp.com/api/Usuario/2'

    fetch(url)
        .then(response => response.json())
        .then(user => {
            console.log(user)
        })
}


fetchUser()