$(window).load(function() 
{
  getTasks();
  getInfo();
  $( ".recheck" ).click(function() {
    recheck();
  });
});

function getTasks() {
  var token = localStorage.getItem('apikey');
  var url = "https://todoist.com/API/getProjects?token=" + token + "&callback=?";
  var id;
  $.getJSON(url, function(data) {
    for (i in data) {
      if (data[i].name == "Inbox") {
        id = data[i].id;
      }
    }
    getItems(id, token);
  });
}

function getItems(id, token) {
  var token = localStorage.getItem('apikey');
  var url = "https://todoist.com/API/getUncompletedItems?project_id=" + id  + "&token=" + token + "&callback=?";
  $.getJSON(url, function(data) {
    if (data.length == 0) {
        $('.tasks').append("<p> no tasks</p>");
    }
    for (i in data) {
      var task = "<p>" + data[i].content + "</p>";
      if (i < 5) {
        $('.tasks').append(task);
      }
    }
  });
}

function getInfo() {
  var earned = localStorage.getItem('time');
  $('.earned').append("You have earned and used " + earned + " minutes of time.");
}

function recheck() {
  var url = "https://todoist.com/API/getProductivityStats?token=" + localStorage.getItem('apikey') + "&callback=?";
  $.getJSON(url, function(data) {
      // Get the element with id summary and set the inner text to the result.
      var tasks = data.days_items[0].total_completed;
      var date = data.days_items[0].date;
      if (date != localStorage.getItem('date')) {
        localStorage.setItem('tasks', 0);
        localStorage.setItem('date', date);
      }
      var newtasks = parseInt(tasks) - parseInt(localStorage.getItem('tasks'));
      var time = parseInt(newtasks) * 5;
      var newtime = parseInt(time) + parseInt(localStorage.getItem('time'));
      localStorage.setItem('time', newtime);
      localStorage.setItem('tasks', tasks);
      localStorage.setItem('date', date);
      alert(localStorage.getItem('time') + " minutes of time.");
  });
}