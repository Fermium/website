function currently (){
  $.ajax({
    type : "GET",
    url : "https://api.spotify.com/v1/me/player/currently-playing",
    headers:{
      "Authorization":"Bearer BQDdMQs6PSz4dzIjCQWJGBjEFz9m_osa0Y4rxa1rrJ4r6QFEg9Vr8-ZJrFAC0CYlsXAzR4JuBx0u99XJ5cIZBZktQc6ZA3Prh4ZhFqY37XLTkS6FZ0lj0wMYx4sZjrrZ-UdSE4AEy6j1-X5eBaI"
    },
    success : function(data){
      if(data.is_playing){
        console.log(data.is_playing+" "+data);
        $('.spotify').empty();
        $('.spotify').append($('<a/>').attr("href",'http://play.spotify.com/track/'+data.item.uri.split(':')[2]).attr('target','_blank').text("Currently Playing: "+data.item.name+" - "+data.item.artists[0].name));
      }
    },
    error : function(data){
      console.log(data);
    }
  });
}
currently();
setInterval(currently,1000*60);
