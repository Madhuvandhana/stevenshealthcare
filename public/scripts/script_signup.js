var mouse_is_inside = false;
$(document).ready(function() {
$('#signupForm').submit((event) => {
    event.preventDefault();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if (!$('#username').val()) {
        $('#error').show();
        $('#closebtnId').show();
		$('#error').html('You must enter username');
		$('#username').focus();
	} 
    else if(!$('#email').val()){
        $('#error').show();
        $('#closebtnId').show();
		$('#error').html('You must enter email');
		$('#email').focus();
    }
    else if( !emailReg.test( $('#email').val() ) ) {
        $('#error').show();
        $('#closebtnId').show();
        $('#error').html('Please enter valid email id');
        $('#email').focus();
        } 
    else if(!$('#password').val()){
        $('#error').show();
        $('#closebtnId').show();
		$('#error').html('You must enter password');
		$('#password').focus();
    }
   else if($('#password').val() != $('#repassword').val()){
        $('#error').show();
        $('#closebtnId').show();
		$('#error').html('Passwords don\'t match');
        $('#password').focus();
        $('#repassword').val('');
    }
    else {
        $('#signupForm').unbind('submit').submit()
        $('#signupForm').trigger('reset');
        $('#error').hide();
        $('#closebtnId').hide();
   
    }
});
$('#closebtnId').click(function() {
    $('#closebtnId').hide();
  });
  $('#closebtnId1').click(function() {
    $('#closebtnId1').hide();
  });
});

$(document).mouseup(function(e) 
{
    var container = $("#error");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
    var container = $("#error_alert");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
    var container = $("#closebtnId");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
    var container = $("#closebtnId1");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
});

