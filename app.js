var timerSession = true; // flag for toggling between session and break
var breakLength = $("#breakLength").text() * 60;
var sessionLength = $("#sessionLength").text() * 60;
var timer = sessionLength; //set the timer to session length

setInterval(reduceTimer, 1000); //start the timer

function displayTime() {
  var timeMin = Math.floor(timer / 60);
  var timeSec = timer % 60;
  var timerOneSec = timeSec % 10;
  var timerTenSec = Math.floor(timeSec / 10);

  //display time remaining on timer
  $('#timerMin').html(timeMin);
  $('#timerTenSec').html(timerTenSec);
  $('#timerOneSec').html(timerOneSec);
}

function reduceTimer() {
  if (timer >= 0) {
    //convert timer to specific units for display
    displayTime();
    // reduce time 
    timer -= 1;
  } else {
    //After the timer hits 0:00, the following block resets it to either the session length or the break length, as appropriate, then switches the timerSession flag.
    if (timerSession) {
      timer = breakLength;
      $('#timerType').text('Break');
      timerSession = false;
      playSound('mySound2');
      displayTime();

    } else {
      timer = sessionLength;
      $('#timerType').text('Session');
      timerSession = true;
      playSound('mySound2');
      displayTime();
    }
    // animateBackground(timer);
  }
};

//the function below handles button click events, increasing or decreasing the length of breaks and sessions.
$('button').click(function() {

  switch ($(this).attr('id')) { // Get button id
    case "breakPlus": // increase break length    
      breakLength += 60;
      break;
    case "breakMinus": // reduce break length
      if ($(this).parent().find('span').text() > 0) {
        breakLength -= 60;
      }
      break;
    case "sessionPlus": //increase session length
      sessionLength += 60;
      break;
    case "sessionMinus": //decrease session length
      if ($(this).parent().find('span').text() > 0) {
        sessionLength -= 60;
      }
      break;
    case "reset": //reset timer to start at selected Session Length
      timer = sessionLength;
      timerSession = true;
      $('#timerType').text('Session');
      displayTime();
      stopSound('mySound');
      
  };
  $('#sessionLength').html(sessionLength / 60);
  $('#breakLength').html(breakLength / 60);
  $('#timerBackground').animate({height:"240px"}, timer*100);
});

function playSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}
function stopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}