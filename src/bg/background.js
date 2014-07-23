// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
var apikey;

$(window).load(function() 
{
   // executes when complete page is fully loaded, including all frames, objects and images
   $.getJSON("https://todoist.com/API/login?password=lele@6871&email=sicong.liu98@gmail.com&callback=?", function(data) {
    	// Get the element with id summary and set the inner text to the result.
    	apikey = data.api_token;
    	getp();
	});
});

function getp() {
	var url = "https://todoist.com/API/getProductivityStats?token=" + apikey + "&callback=?";
	$.getJSON(url, function(data) {
    	// Get the element with id summary and set the inner text to the result.
    	var test = data.days_items[0].total_completed;
    	alert(test);
	});
}