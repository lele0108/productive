// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts

//class in option page
$(window).load(function() 
{
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
      $( ".info" ).replaceWith('<p style="color: green;">login success</p>');
      getp();
  });
}

//class in alarm.js
function getp() {
	var url = "https://todoist.com/API/getProductivityStats?token=" + localStorage.getItem('apikey') + "&callback=?";
	$.getJSON(url, function(data) {
    	// Get the element with id summary and set the inner text to the result.
    	var tasks = data.days_items[0].total_completed;
      if (localStorage.getItem('tasks') != 0 && localStorage.getItem('tasks') != null && tasks != 0) {
        var tasks = tasks - parseInt(localStorage.getItem('tasks'));
        console.log(tasks);
      }
      var time = tasks * 20 + parseInt(localStorage.getItem('time'));
      console.log(time);
      localStorage.setItem('tasks',tasks);
      localStorage.setItem('time', time);
    	alert(localStorage.getItem('time'));
	});
}

function track() {

}