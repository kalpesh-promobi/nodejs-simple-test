$(document).ready(function(){
  $('.saveContact').click(function(){
    $(this).text("Please wait....");
    $(this).attr("disabled", true);
    $(".form-horizontal").submit();
  })
});