function get_request(who) {
  $.get("//public-check-in.office.fermiumlabs.com/look/"+who+"_in_ufficio", function(response){
    if (response.status){

      $('#'+who+" .overlay-status").removeClass('not-in-office');
      $('#'+who+" .overlay-status").addClass('in-office');
    }
    else{
      $('#'+who+" .overlay-status").removeClass('in-office');
      $('#'+who+" .overlay-status").addClass('not-in-office');
    }
    setTimeout( get_request, 120000 );
  });
}

get_request('d');
get_request('s');
