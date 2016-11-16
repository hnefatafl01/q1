$(document).ready(function() {
  //hamburger menu toggle
  $('.mobile-nav').hide();
  $('span.nav-toggle').click(function() {
      // console.log("clicked");
      $('.mobile-nav').toggle();

  });
  //form submission for local storage
  $('form').submit(function(event) {
      event.preventDefault();
      var journalEntry = {};
      var text = $(this).serialize();
      // console.log(text);
      //decoding from query format
      var sessionObj = text.split("&").reduce(function(prev, curr, i, arr) {
          var p = curr.split("=");
          prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
          return prev;
      }, {});
      console.log(sessionObj);
      //store it
      // localStorage.setItem("Workout Session", sessionObj);
      // $('.workout-session').appendTo('<p>' + sessionObj + '</p>');
  });


//exercise search
  var $selectExercise = $('#selectExercise');
  var url = "https://wger.de/api/v2/exercise/?language=2";
  // var key = "cd35b3ad5f20b8d5189acf17807c89685ac1584f";
  $.get(url, selectExercise);
  function selectExercise(data) {
    for (i in data.results) {
      var exerciseName = data.results[i].name;
      $selectExercise.append("<option>" + exerciseName + "</option>");
    }
  };
});
