let baseUrl = 'http://localhost:3000'
let secondName
$(document).ready(function () {
  auth();
  // updateScrollbar()
})

function auth() {
  if (localStorage.getItem('token')) {
    $('#afterLogin').show()
    $("#beforeLogin").hide();
  } else {
    $('#afterLogin').hide();
    $("#beforeLogin").show();
  }
}

function findMatch(event) {
  $('.find-button').hide()
  $('#matchUser').show()
  Swal.showLoading()
  let randomNum = Math.floor(Math.random() * Math.floor(2))
  let gender
  if (randomNum === 0) {
    gender = 'male'
  } else {
    gender = 'female'
  }
  event.preventDefault()
  $('.chat').hide(1000, function () {
    $.ajax({
        url: baseUrl + '/apis/person/' + gender,
        method: 'GET'
      })
      .done(data => {
        Swal.close()
        secondName = `${data.results[0].name.first} ${data.results[0].name.last}`
        $('#matchUser').append(`
                <div class="mx-auto user-match">
                    <h1>${data.results[0].name.first} ${data.results[0].name.last}</h1>
                    <img src="${data.results[0].picture.large}" alt="user_image">
                    <p>Location : &nbsp${data.results[0].location.country}</p>
                    <p>${data.results[0].dob.age} years old</p>
                    <button class="btn bg-light find-button" onclick="loveCalculator(event)">Love Calculator</button>
                </div>
                `)
      })
      .fail(err => {
        console.log(err, 'ini err')
      })
  })
}

function loveCalculator(event) {
  Swal.showLoading()
  $('#love-calculator').show()
  event.preventDefault()
  $.ajax({
      url: baseUrl + `/apis/love?firstName=${localStorage.getItem('username')}&secondName=${secondName}`,
      method: 'GET'
    })
    .done(data => {
      Swal.close()
      console.log(data)
      $('#matchUser').hide()
      $('#love-calculator').append(`
            <div class="mx-auto user-match">
                <h1>${data.fname} ❤️ ${data.sname}</h1>
                <p>${data.percentage}</p>
                <p>${data.result}</p>
                <button class="btn bg-light find-button" onclick="chatAgain(event)">Chat Again</button>
            </div>
            `)
    })
    .fail(_ => {
      Swal.fire({
        title: 'Try Again',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          loveCalculator(event)
          Swal.showLoading()
        }
      })
    })
}

function chatAgain(event) {
  event.preventDefault()
  $('#love-calculator').hide(1000, function () {
    $('.chat').show(1000, function () {
      $('.find-button').show()
      $('#love-calculator').empty()
      $('.messages-content').empty()
      $('#matchUser').empty()

    })
  })
}

function send(event) {
  event.preventDefault()
  $('.messages-content').append(`
        <div class="message message-personal new msg-user">
        ${$('#text').val()}
        </div>
    `)
  $('#text').val('')
  $.ajax({
      url: baseUrl + '/apis/chat',
      method: 'POST',
      data: {
        text: $('#text').val()
      }
    })
    .done(data => {
      console.log('masukkk nih', data)
      $('.messages-content').append(`
                <div class="message new">
                ${data.atext}
                </div>
            `)

    })
    .fail(err => {
      console.log(err)
    })

}

// -------
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
    localStorage.setItem("username", result.username);
    localStorage.setItem("token", result.token);
    Swal.fire({
      type: 'success',
      title: 'Success',
      text: 'Login Successfully',
    })
    auth();
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
    localStorage.setItem("username", result.username);
    localStorage.setItem("token", result.token);
    Swal.fire({
      type: 'success',
      title: 'Success',
      text: 'Register Successfully',
    })
    auth();
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
    localStorage.setItem("username", result.name);
    Swal.fire({
      type: 'success',
      title: 'Success',
      text: 'Login Successfully',
    })
    auth();
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
    localStorage.removeItem("token");
    auth();
  });
}