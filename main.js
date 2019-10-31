let baseUrl = 'http://localhost:3000'
let secondName
$(document).ready(function(){
    if(localStorage.getItem('token')) {
        $('#afterLogin').show()
    } else {
        $('#afterLogin').show()
    }
    // updateScrollbar()
})

function findMatch(event) {
    $('.find-button').hide()
    $('#matchUser').show()
    Swal.showLoading()
    let randomNum = Math.floor(Math.random() * Math.floor(2))
    let gender
    if(randomNum === 0) {
        gender = 'male'
    } else {
        gender= 'female'
    }
    event.preventDefault()
    $('.chat').hide(1000,function(){
        $.ajax({
            url : baseUrl + '/apis/person/' + gender,
            method : 'GET'
        })
            .done(data=>{
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
            .fail(err=>{
                console.log(err,'ini err')
            })
    })
}

function loveCalculator(event) {
    Swal.showLoading()
    $('#love-calculator').show()
    event.preventDefault()
    $.ajax({
        url : baseUrl + `/apis/love?firstName=${localStorage.getItem('username')}&secondName=${secondName}`,
        method : 'GET'
    })
        .done(data=>{
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
        .fail(_=>{
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
    $('#love-calculator').hide(1000,function(){
        $('.chat').show(1000,function(){
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
        .done(data=>{
            console.log('masukkk nih',data)
            $('.messages-content').append(`
                <div class="message new">
                ${data.atext}
                </div>
            `)
            
        })
        .fail(err=>{
            console.log(err)
        })
    
}

// -------
function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  }
  
  function setDate(){
    d = new Date()
    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
  }
  
  function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
      return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    setTimeout(function() {
      fakeMessage();
    }, 1000 + (Math.random() * 20) * 100);
  }
  
  $('.message-submit').click(function() {
    insertMessage();
  });
  
  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      insertMessage();
      return false;
    }
  })
  
  var Fake = [
    'Hi there, I\'m Fabio and you?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'What do you do?',
    'That\'s awesome',
    'Codepen is a nice place to stay',
    'I think you\'re a nice person',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Time to make a new codepen',
    'Bye',
    ':)'
  ]
  
  function fakeMessage() {
    if ($('.message-input').val() != '') {
      return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
  
    setTimeout(function() {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
      i++;
    }, 1000 + (Math.random() * 20) * 100);
  
  }