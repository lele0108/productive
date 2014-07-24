// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
var apikey;

$(window).load(function() 
{
  $( ".go" ).click(function() {
    var usr = $('.email').val();
    var pswd = $('.pswd').val();
    getapikey(usr, pswd);
  });
});

function getapikey(username, password) {
  var url = "https://todoist.com/API/login?password=" + password + "&email=" + username + "&callback=?";
  $.getJSON(url, function(data) {
      if (data == "LOGIN_ERROR") {
        $( ".info" ).append('<p style="color: red;">try again</p>');
        return;
      }
      apikey = data.api_token;
      localStorage.setItem('apikey',apikey);
      $( ".info" ).append('<p style="color: green;">login success</p>');
      getp();
  });
}

function getp() {
	var url = "https://todoist.com/API/getProductivityStats?token=" + apikey + "&callback=?";
	$.getJSON(url, function(data) {
    	// Get the element with id summary and set the inner text to the result.
    	var test = data.days_items[0].total_completed;
      localStorage.setItem('score',test);
    	alert(localStorage.getItem('score'));
	});
}