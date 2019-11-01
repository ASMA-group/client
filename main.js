let baseUrl = 'http://localhost:3000'
let secondName
let chat_txt
$(document).ready(function () {
  var x = document.getElementById("myAudio");
  x.play();
  auth();
})

function auth() {
  if (localStorage.getItem('token')) {
    $('#afterLogin').show()
    $("#beforeLogin").hide();
    $('.user-login-name').empty()
    $('.user-login-name').append(`<h1>${localStorage.getItem('username')}</h1>`)
    $('.avatar').append(`<img src="https://api.adorable.io/avatars/285/${localStorage.getItem('username')}" />`)
    $('.find-button').show()
  } else {
    $('#afterLogin').hide();
    $("#beforeLogin").show();
    $('.find-button').hide()
  }
}

function findMatch(event) {
  $('.find-button').hide()
  $('#matchUser').show()
  Swal.fire({
    title: 'finding your real love',
    onOpen: ()=>{
      Swal.showLoading()
    }
  })
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
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.message,
        })
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
      $('#matchUser').hide()
      $('#love-calculator').append(`
            <div class="mx-auto user-match">
                <h1>${data.fname} ❤️ ${data.sname}</h1>
                <h2>${data.percentage} %</h2>
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
  chat_txt = $('#text-msg').val()
  event.preventDefault()
  $('.messages-content').append(`
        <div class="message message-personal new msg-user">
        ${chat_txt}
        </div>
    `)
    $('#text-msg').val('')
  $.ajax({
      url: baseUrl + '/apis/chat',
      method: 'POST',
      data: {
        text: chat_txt
      }
    })
    .done(data => {      
      $('.messages-content').append(`
                <div class="message new">
                ${data.atext}
                </div>
            `)
      $(".messages-content").animate({ scrollTop: $(".messages-content")[0].scrollHeight})

    })
    .fail(err => {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.message,
      })
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
    auth();
  }).fail((err) => {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: err.responseJSON.message,
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
    auth();
  }).fail((err) => {

    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: err.responseJSON.message,
    })
  })
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "post",
    url: "http://localhost:3000/user/logingoogle",
    data: {
      token: id_token
    }
  }).done((result) => {
    localStorage.setItem("token", result.token);
    localStorage.setItem("username", result.username);
    auth();
  }).fail((err) => {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: err.responseJSON.message,
    })
  })

}

function signOut() {
  Swal.fire({
    title: 'Are you sure to signout ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        localStorage.removeItem("token");
        localStorage.removeItem("username")
        auth();
      });
      $('.messages-content').empty()
      $('#logusername').val('')
      $('#logpassword').val('')
    }
  })

}