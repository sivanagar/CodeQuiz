var startBtn = document.querySelector("#start"); 
var timerEl = document.getElementById('time');
var mainEl = document.getElementById('main')
var titleEl = document.querySelector("h1");
console.log(mainEl);

var score = 75;

function startQuiz () {
    //start timer
    countdown();
    //hide the start message
    //show question
    showQuestion();
}

function countdown() {
    var timeInterval = setInterval(function() {
    if (score >0 ){
        timerEl.textContent= score;
        score --;
    } else {
        timerEl.textContent= 0;
        clearInterval(timeInterval);
    }
    },1000);
}

function showQuestion(){
    titleEl.textContent ="A QUESTION";
    //remove first page content
    var subTitle = document.querySelector("h2");
    subTitle.remove();
    startBtn.remove();
    mainEl.className ="main-question";
    answers = ["answer1", "answer2", "answer3", "answer4"];
    
    for(var i=0 ; i<4 ; i++){
        var answer1 = document.createElement("button");
        answer1.className = "answer"
        answer1.textContent = (i+1)+". " +answers[i];
        mainEl.appendChild(answer1);
}



}

//add event listener to button click and call function to start
startBtn.addEventListener("click", startQuiz );


