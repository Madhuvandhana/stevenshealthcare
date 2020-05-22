function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getUserDetails();
        } 
        else 
        {
          initiateFBLogin();
        }
       }, {scope: 'public_profile,email'});
  }
  function getUserDetails(){
    FB.api(  
    '/me',
    'GET',
    {"fields":"id,name,email"}, function(response) {
        let newuser = {
            username: response.name,
            email: response.email
        };
        $.ajax({
            url: `/users/login`,
            type: 'POST',
            data:newuser,
            //appointment data in response
            success: function (res) { 
                setTimeout(
                    function() 
                    {
                       location.reload();
                    }, 0001);  
            },
            error: function (err) {
            }
          });
    });
  }
  function initiateFBLogin()
  {
      FB.login(function(response) {
        getUserDetails();
       }, {scope: 'public_profile,email'});
  }
  function logout(ele){
    FB.logout(function(response) {
        // Person is now logged out
        alert("logged out")
     });
  }
    