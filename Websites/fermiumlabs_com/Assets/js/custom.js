
if(isMobile){
  $(document).scroll(function(){
    if($(".offscreen-container").hasClass('reveal-nav')){
      $(".offscreen-container").removeClass('reveal-nav');
    }
  });
  $('.front').removeClass('front');
  $('.back').removeClass('back');
  $('.flipper').removeClass('flipper');
  $('.flip-container').removeClass('flip-container');




  var lis = $(".collaborator");
  if(lis.length%2!=0){
    lis.last().append('<div class="collaborator col col-sm-6 col-md-2 col-centered flip-container" ontouchstart="this.classList.toggle(\'hover\');"></div>');
  }
  var lis = $(".collaborator");
  for(var i = 0; i < lis.length; i+=2) {
      lis.slice(i, i+2).wrapAll("<div class='row row-centered flex collab-wrapper'></div>");
  }
  $(".collab-wrapper").unwrap();
}


$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
