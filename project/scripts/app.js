$(document).ready(function() {
  //hamburger menu toggle
  $('.mobile-nav').hide();
  $('span.nav-toggle').click(function() {
      // console.log("clicked");
      $('.mobile-nav').toggle();
  });
  //form submission for local storage
  $('form').submit($showInputData, function(event) {
      event.preventDefault();
      var text = $(this).serialize();
      // console.log(text);
      //decoding from query format
      var sessionObj = text.split("&").reduce(function(prev, curr, i, arr) {
          var p = curr.split("=");
          prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
          return prev;
      }, {});
      // console.log(sessionObj);
      //store it
      localStorage.setItem("Workout Session", sessionObj);
      $showInputData();
      $hideInputData();
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

// function to output workout data to html
  // var exerciseVariables = function(sessionObj) {
  //   $('').append("<p>"+ sessionObj["name"] +"</p>");
  //
  // }
  var $modal = $('.modal');
  var $showInputData = function() {
      console.log("function runs");
      $modal.toggleClass('is-active');
  };

  var $hideInputData = function() {
    $('#cancel').click(function() {
      console.log('cancel');
      $modal.toggleClass('is-active');
    })
  }

  //page redirection
  // var pageRedirect = function() {
  //   window.location.replace("../new-workout-session/index2.html");
  // }
  // setTimeout("pageRedirect()", 10000);
});
