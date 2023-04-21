$(document).ready(function(){
    $(".tudo").click(function(){
        $(".salas, .lazer, .dependencias").show();
    });
  
    $(".so-dependencias").click(function(){
        $(".salas, .lazer").fadeOut(200);
        $(".dependencias").show();
    });
  
    $(".so-salas").click(function(){
        $(".dependencias, .lazer").fadeOut(200);
        $(".salas").show();
    });
  
  $(".so-lazer").click(function(){
        $(".dependencias, .salas").fadeOut(200);
        $(".lazer").show();
    });
});