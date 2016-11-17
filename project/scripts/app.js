$(document).ready(function() {
  //hamburger menu toggle
  $('.mobile-nav').hide();
  $('span.nav-toggle').click(function() {
      $('.mobile-nav').toggle();
  });

  //form submission for local storage
  $('form').submit(function(event) {
      event.preventDefault();
      var text = $(this).serialize();
      //decoding from query format
      var sessionObj = text.split("&").reduce(function(prev, curr, i, arr) {
          var p = curr.split("=");
          prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
          return prev;
      }, {});
      sessionObj["exercise"] = $("#selectExercise").val();
      console.log(sessionObj);
      for (var i in sessionObj) {
        $('.modal-card-body').append("<p>" + "<strong>" + i + "</strong>" + ": " + sessionObj[i] + "</p>");
      }
      $showModal();
      $hideModal();
    //store it
    localStorage.setItem("savedExercise", JSON.stringify(sessionObj));

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
    for (muscleKey in musclesExerciseGroups) {
      $selectMuscleGroup.append("<option value='"+ muscleKey + "'>" + muscleKey + "</option>");
    }
    $selectMuscleGroup.change(function() {
      exerciseSelect(musclesExerciseGroups, this.value);
    });
  };

 function exerciseSelect(musclesExerciseGroups, muscleKey) {
    $selectExercise.html('');
    for (i in musclesExerciseGroups[muscleKey]) {
      $selectExercise.append("<option>" + musclesExerciseGroups[muscleKey][i] + "</option>");
    }
  }

// // function to output workout data to html
// function saveVariables() {
//     $('.modal-card-body').append("<p>"+  +"</p>");
//
//   }

  var $modal = $('.modal');
  var $showModal = function() {
      $modal.toggleClass('is-active');
  };

  var $hideModal = function() {
    $('#cancel').click(function() {
      $modal.toggleClass('is-active');
    })
  }
});
