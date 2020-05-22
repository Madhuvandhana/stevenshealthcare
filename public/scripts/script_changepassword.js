$(document).ready(function() {
$('#changePasswordForm').submit((event) => {
    event.preventDefault();
    if(!$('#password').val()){
        $('#error').show();
		$('#error').html('You must enter password');
        $('#password').focus();
        $('#closebtnId').show();
    }
   else if($('#password').val() != $('#repassword').val()){
        $('#error').show();
		$('#error').html('Passwords don\'t match');
        $('#password').focus();
        $('#repassword').val('');
        $('#closebtnId').show();
    }
    else {
        $('#userId').val()
        $('#changePasswordForm').unbind('submit').submit()
        $('#changePasswordForm').trigger('reset');
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
