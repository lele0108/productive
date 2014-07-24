// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts

//class in option page
$(window).load(function() 
{
  if (localStorage.getItem('apikey') != null) {
    $('.login').hide();
    $('.go').hide();
    $('.status').append('<p style="color:green">todoist: logged in</p>');
    alarmClock.setup();
  }
  $( ".go" ).click(function() {
    var usr = $('.email').val();
    var pswd = $('.pswd').val();
    getapikey(usr, pswd);
  });
});

//class in option page
function getapikey(username, password) {
  var url = "https://todoist.com/API/login?password=" + password + "&email=" + username + "&callback=?";
  $.getJSON(url, function(data) {
      if (data == "LOGIN_ERROR") {
        $( ".info" ).append('<p style="color: red;">try again</p>');
        return;
      }
      var apikey = data.api_token;
      localStorage.setItem('apikey',apikey);
      $( ".info" ).replaceWith('');
      $('.login').hide();
      $('.go').hide();
      $('.status').append('<p style="color:green">todoist: logged in</p>');
  });
  alarmClock.setup();
}

var alarmClock = {

        onHandler : function(e) {
            chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.2} );
                    window.close();
        },

        offHandler : function(e) {
            chrome.alarms.clear("myAlarm");
                    window.close();
        },

        setup: function() {
            var a = document.getElementById('alarmOn');
            a.addEventListener('click',  alarmClock.onHandler );
            var a = document.getElementById('alarmOff');
            a.addEventListener('click',  alarmClock.offHandler );
        }
};