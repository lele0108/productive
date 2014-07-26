$(window).load(function() 
{
  getTasks();
  getInfo();
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