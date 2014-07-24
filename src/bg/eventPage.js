chrome.alarms.onAlarm.addListener(function(alarm) {
  var url = "https://todoist.com/API/getProductivityStats?token=" + localStorage.getItem('apikey') + "&callback=?";
	$.getJSON(url, function(data) {
    	// Get the element with id summary and set the inner text to the result.
      var tasks = data.days_items[0].total_completed;
      var time = tasks * 20;
      console.log(time);
      localStorage.setItem('tasks',tasks);
      localStorage.setItem('time', time);
      alert(localStorage.getItem('time'));
	});
});