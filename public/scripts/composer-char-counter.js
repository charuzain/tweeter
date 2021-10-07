$(document).ready(function(){
  $('#tweet-text').on('input',function(){
   let maxCharacter = 140;
   let counter = maxCharacter-$(this).val().length;
   let counterElement=$(this).next().find('.counter');
   $(counterElement).val(`${counter}`)
   if(counter>=0){
    $('.counter').css("color", "black")
   }
   else if(counter<0){$('.counter').css("color", "red")};
  
  })
});