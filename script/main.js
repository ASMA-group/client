function login() {
    let email = $("#logusername").val();
    let password = $("#logpassword").val();
    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: {
            email,
            password
        }
    }).done((result) => {
        localStorage.setItem("token", result.token);
        Swal.fire({
            type: 'success',
            title: 'Success',
            text: 'Login Successfully',
        })
    }).fail((err) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    })
}

function register() {
    let name = $("#name").val();
    let email = $("#username").val();
    let password = $("#password").val();

    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/register",
        data: {
            name,
            email,
            password
        }
    }).done((result) => {
        Swal.fire({
            type: 'success',
            title: 'Success',
            text: 'Register Successfully',
        })
    }).fail((err) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/logingoogle",
        data: {
            token: id_token
        }
    }).done((result) => {
        localStorage.setItem("token", result.token);
        Swal.fire({
            type: 'success',
            title: 'Success',
            text: 'Login Successfully',
        })
    }).fail((err) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    })

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}