$(document).ready(function() {
    //hamburger menu toggle
    $('.mobile-nav').hide();
    $('span.nav-toggle').click(function() {
        $('.mobile-nav').toggle();
    });

    //form submission for local storage
    $('#submitForm').click(function(event) {
        event.preventDefault();
        var text = $("#form").serialize();
        var sessionObj = createSession(text);
        setModalBody(sessionObj);
        $showModal();

        //store it
        $('#saveExercise').one("click", function() {
            addExerciseToLocalStorage(sessionObj);
            // window.location.href = "../training-log/index.html";
            addExerciseToTrainingLog();
        });

        // $("#reset").click(function(event) {
        //     event.preventDefault();
        //     $('html').val() = '';
        // });
    });

    function setModalBody(sessionObj) {
        var $modalBody = $('.modal-card-body');
        $modalBody.empty();
        for (var i in sessionObj) {
            $modalBody.append("<p>" + "<strong>" + i + "</strong>" + ": " + sessionObj[i] + "</p>");
        }
    }

    function createSession(text) {
        var sessionObj = text.split("&").reduce(function(prev, curr, i, arr) {
            var p = curr.split("=");
            prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
            return prev;
        }, {});
        sessionObj["exercise"] = $("#selectExercise").val();
        return sessionObj;
    }

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
            $selectMuscleGroup.append("<option value='" + muscleKey + "'>" + muscleKey + "</option>");
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

    var $modal = $('.modal');
    var $showModal = function() {
        $modal.addClass('is-active');
    };
    $('#cancel').click(function() {
        $modal.removeClass('is-active');
    })

    function addExerciseToTrainingLog() {
      var $workout = $('#workout');
      var exerciseList = getItemsFromLocalStorage();
      console.log(exerciseList);
      var lastExercise = exerciseList[exerciseList.length - 1];
       $('#log').append("<p>"+lastExercise["Date"] + ": "+"</p>");
       $('#log').append("<p>"+lastExercise["exercise"] +" "+ lastExercise["sets"]+"x"+lastExercise["repetitions"]+"x"+lastExercise["load"]+"<p>");
       $('#log').append("<p>"+lastExercise["notes"]+"<p>");
      // console.log(lastExercise["Date"] + ": " + lastExercise["exercise"] +" "+ lastExercise["sets"]+"x"+lastExercise["repetitions"]+"x"+lastExercise["load"]+lastExercise["notes"]);
    }

});

var exerciseListKey = "exerciseListKey";

function addExerciseToLocalStorage(sessionObj) {
    var exerciseList = getItemsFromLocalStorage();
    exerciseList.push(sessionObj);
    localStorage.setItem(exerciseListKey, JSON.stringify(exerciseList));
}

function getItemsFromLocalStorage() {
    var exerciseList = localStorage.getItem(exerciseListKey);
    if (exerciseList) {
        exerciseList = JSON.parse(exerciseList);
    } else {
        exerciseList = [];
    }
    return exerciseList;
}
