
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


$(".former").submit(function(){
  $.post("//websitephp7scripts.fermiumlabs.com/contactuszendesk.php",{z_subject: $("#z_subject").val(),z_description: $("#z_description").val(),z_name: $("#z_name").val(),z_requester: $("#z_requester").val()})
  .done(function(){
    
  })
  .fail(function(){
    alert("failed");
  });

  return false;
});
