chrome.alarms.onAlarm.addListener(function(alarm) {
  var url = "https://todoist.com/API/getProductivityStats?token=" + localStorage.getItem('apikey') + "&callback=?";
	$.getJSON(url, function(data) {
    	// Get the element with id summary and set the inner text to the result.
      var tasks = data.days_items[0].total_completed;
      var date = data.days_items[0].date;
      if (date != localStorage.getItem('date')) {
        localStorage.setItem('tasks', 0);
        localStorage.setItem('date', date);
        localStorage.setItem('sites', '');
      }
      var newtasks = parseInt(tasks) - parseInt(localStorage.getItem('tasks'));
      var time = parseInt(newtasks) * 5;
      var newtime = parseInt(time) + parseInt(localStorage.getItem('time'));
      localStorage.setItem('time', newtime);
      localStorage.setItem('tasks', tasks);
      localStorage.setItem('date', date);
      console.log(localStorage.getItem('time'));
	});
});