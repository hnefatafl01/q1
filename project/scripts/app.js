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

 //Muscles and Exercise search
  var $selectMuscleGroup = $('#selectMuscleGroup');
  var $selectExercise = $('#selectExercise');
  var url = "https://raw.githubusercontent.com/davejt/exercise/master/data/exercises";
  $.get(url, selectMuscleGroupExercises);

  //format raw data
  function formatData(data) {
     var arrayData = data.split(/\n/);
     var exerciseAndMuscles = {};
       for (var i = 0; i < arrayData.length; i++) {
        var muscles = arrayData[i].split(',');
        var muscleKey = muscles[1].trim();
        //  console.log(muscleKey);
        if (exerciseAndMuscles.hasOwnProperty(muscleKey)) {
          exerciseAndMuscles[muscleKey].push(muscles[0]);
        } else {
          var exerciseArray = [];
          exerciseArray.push(muscles[0]);
          exerciseAndMuscles[muscleKey] = exerciseArray;
        }
      }
      return exerciseAndMuscles;
   };

  //selectMuscleGroupAndExercises
  function selectMuscleGroupExercises(data) {
    var musclesExerciseGroups = formatData(data);
    console.log(musclesExerciseGroups);
    for (muscleKey in musclesExerciseGroups) {
      $selectMuscleGroup.append("<option>" + muscleKey + "</option>");
    }
    $selectMuscleGroup.change(function() {
      exerciseSelect(musclesExerciseGroups, this.value);
    });
  };

 function exerciseSelect(musclesExerciseGroups, muscleKey) {
   console.log(musclesExerciseGroups[muscleKey]);
    $selectExercise.html('');
    for (i in musclesExerciseGroups[muscleKey]) {
      // console.log(musclesExerciseGroups[muscleKey]);
      $selectExercise.append("<option>" + musclesExerciseGroups[muscleKey][i] + "</option>");
    }
  }


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
});


  //page redirection
  // var pageRedirect = function() {
  //   window.location.replace("../new-workout-session/index2.html");
  // }
  // setTimeout("pageRedirect()", 10000);
