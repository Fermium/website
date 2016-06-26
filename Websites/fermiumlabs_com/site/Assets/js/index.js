/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 150,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
);
var questions,
    theForm = $('#mc-embedded-subscribe-form'),
    isValid,
    question = $('ol.questions > li'),
    questionsCount,
    current = 1,
    // jquery validator plugin validation method or whatever
   validator = $("#mc-embedded-subscribe-form").validate({
        errorPlacement: function (error, element) {
            $('.formError').html(error);
        }
    });

questions = $('ol.questions').find('li');
questionsCount = questions.length;

function updateUI(to) {
    if (to <= questionsCount) {
        $('.currentNo').html(to + ' / ' + questionsCount);
    }
    var lineWidth = ((to - 1) * 100) / questionsCount;
    $('.line').css('width', lineWidth + '%');
}

function doneUI() {
    $('.complete').fadeIn();
    $('.questions').addClass('hide');
    $('.status, .progress').fadeOut();
    $(question).find('input').blur();
}

function focusThis(position) {
    if (current != questionsCount) {
        question.removeClass('current');
        $('ol.questions > li:nth-child(' + position + ')').addClass('current');
    }
    updateUI(position);
   $('.current').one("transitionend.my MSTransitionEnd.my webkitTransitionEnd.my oTransitionEnd.my",function() {
     $(this).off('.my');
     $('.current input').focus();
    });
}

function nextQuestion() {
    focusThis(current + 1);
    // this if statement checks wheather this is the last question, if it is form submittion is initiated and status is displayed
    if (current == questionsCount) {
        console.log('now submit');
        theForm.submit();
        doneUI();
    } else {
        // if not the last question current question counter is increased by one
        current++;
    }
}

function prevQuestion() {
    if (current > 1) {
        current--
    };
    focusThis(current);
}

function formReset() {
    current = 1;
    focusThis(current);
    $('.complete').fadeOut();
    $('.questions').removeClass('hide');
    $('.status, .progress').fadeIn();
}


function checkEntry() {
    //using validator plugin here
    isValid = validator.element(".current input");
    if (isValid) {
        console.log('is valid');
        nextQuestion();
    } else {
        console.log('not valid');
        // throw error
    }
}

updateUI(0);
$('ol.questions > li:nth-child(' + current + ')').addClass('current');

theForm.on('click', function () {
    $('ol.questions > li:nth-child(' + current + ')').addClass('current');
    $('.current input').focus();
    updateUI(current);
});



$('ol.questions > li input').on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    // enter
    if (keyCode === 13) {
        e.preventDefault();
        // function used to check input field value
        checkEntry();
    }
});


theForm.on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    // tab
    if (keyCode === 9) {
        e.preventDefault();
    }
});


$('#next').click(function () {
    checkEntry();
});


$('#mc-embedded-subscribe-form').submit(function (e) {
    e.preventDefault();
    $('#reset').fadeOut();
    $('.done').html("Thank you! Confirm your mail and we’ll be in touch.").delay(4000).fadeOut("slow");
    $('span#next').html("<i class='fa fa-paper-plane plane'></i>").delay(4000).fadeOut("slow");

    /*$.getJSON(
        this.action ,
        $(this).serialize(),
        function (data) {
          console.log(data.Status);
            if (data.Status === 400) {
                $('#reset').fadeIn();
                $('.done').html("Sorry, invalid Email.");
            } else {
                $('#reset').fadeOut();

                $('.done').html("Thank you! We’ll be in touch.");
                $('span#next').html("<i class='fa fa-paper-plane plane'></i>");
            }
        });*/
        /*$.ajax({
            type: $('#mc-embedded-subscribe-form').attr('method'),
            url: $('#mc-embedded-subscribe-form').attr('action'),
            data: $('#mc-embedded-subscribe-form').serialize(),
            cache       : false,
            dataType    : 'jsonp',
            contentType: "text/javascript; charset=utf-8",
            error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
            success     : function(data) {
                if (data.result != "success") {
                    alert("fail shit");// Something went wrong, do something to notify the user. maybe alert(data.msg);
                } else {
                  alert("success shit");
                    // It worked, carry on...
                }
            }
        });
   console.log($("#mc-embedded-subscribe-form").serialize());*/
});
