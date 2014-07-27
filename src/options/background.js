$(window).load(function() 
{ 
  $('.second').hide();
  $('.third').hide();
  if (localStorage.getItem('apikey') != null) {
    $('.first').hide();
    $('.second').hide();
    $('.third').show();
    $('.status').append('<p style="color:green">todoist: logged in</p>');
    alarmClock.setup();
  }
  $( ".go" ).click(function() {
    var usr = $('.email').val();
    var pswd = $('.pswd').val();
    getapikey(usr, pswd);
  });
  $( "#logout" ).click(function() {
    localStorage.removeItem('apikey');
    chrome.alarms.clear("myAlarm");
    $('.first').show();
    $('.third').hide();
    $('.status').replaceWith('');
  });

  $( "#loginscreen" ).click(function() {
    $('.first').hide();
    $('.second').toggle();
  });

  $("#add").click(function() {
    var site = $('.site').val();
    addsite(site);
  });
});

//class in option page
function getapikey(username, password) {
  var url = "https://todoist.com/API/login?password=" + password + "&email=" + username + "&callback=?";
  $.getJSON(url, function(data) {
      if (data == "LOGIN_ERROR") {
        $( ".info" ).replaceWith('<p style="color: red;">try again</p>');
        return;
      }
      var apikey = data.api_token;
      localStorage.setItem('apikey',apikey);
      var name = data.full_name;
      localStorage.setItem('name', name);
      chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 5} );
      $('.status').append('<p style="color:green">todoist: logged in</p>');
      $('.second').hide();
      $('.third').show();
  });
  alarmClock.setup();
}

function addsite(site) {
  alert(site + " added");
  var whitelist = localStorage.getItem('trackedSites');
  whitelist = JSON.parse(whitelist);
  whitelist.push(site);
  whitelist = JSON.stringify(whitelist);
  localStorage.setItem('trackedSites', whitelist);
}

var alarmClock = {

        onHandler : function(e) {
            chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 5} );
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