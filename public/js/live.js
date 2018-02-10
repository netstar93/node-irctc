$(function() {
  // $.getJSON('api', updateFeedback);
  $('.live_status').submit(function(e){
    e.preventDefault();
    e.stopPropagation();
    $.post('api',{
        type : 'live',
        train_no : $('[name=train_number]').val(),
        start_date : $('[name=start_date]').val()
    },updateFeedback);
  });

    $('.pnr_status').submit(function(e){
        e.preventDefault();
        $.post('api',{
            pnr_no : $('[name=pnr_number]').val(),
            type : 'pnr'
    },updateFeedback);
    });

 $('#cancelled-trains').click(function(e) {
    e.preventDefault();
    $.post('api',{
         type : 'cancelled'
     },updateFeedback);
 });

  function updateFeedback(data) {
   var output = '';
   $('.feedback-messages').html(output);
  }

});
