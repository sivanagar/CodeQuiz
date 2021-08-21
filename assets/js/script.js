var startBtn = document.querySelector("#start"); 
var timerEl = document.getElementById('time');

function startQuiz () {
    //start timer
    countdown();
    //show question
}

function countdown() {
    var timeLeft = 75;
    var timeInterval = setInterval(function() {
    if (timeLeft >0){
        timerEl.textContent= timeLeft;
        timeLeft --;
    } else {
        timerEl.textContent= 0;
        clearInterval(timeInterval);
    }
    },1000);
}

console.log(startBtn);
//add event listener to button click and call function to start
startBtn.addEventListener("click", startQuiz );