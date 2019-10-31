// function login() {
//     $.ajax({
//         method: "post",
//         data: {

//         }
//     })
// }

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
    })

}