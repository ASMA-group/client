function login() {
    let email = $("#username").val();
    let password = $("#password").val();
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

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/google-signin",
        data: {
            idToken: id_token
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