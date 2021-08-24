var startBtn = document.querySelector("#start");
var timerEl = document.getElementById("time");
var mainEl = document.getElementById("main");
var titleEl = document.querySelector("h1");
var answerOptions =document.createElement("div");
var answerDisplay = document.createElement("span");
answerDisplay.className = "result";
answerDisplay.textContent = "";
mainEl.appendChild(answerDisplay);  


// list of all questions, choices, and answers
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

var score = 75;
var questionCount = 0;
var answerClicked = "";

var clickHandler = function(event) {
  var targetEl = event.target;
  //start button clicked with
  if (targetEl.matches("#start")){
    startQuiz();
  } else if (targetEl.matches(".answer")){
    //check if the answer correct and show
    var answerId = targetEl.getAttribute("data-answer-id");
    checkAnswer(answerId);
  }
};

function checkAnswer(id) {
  
  if (questions[questionCount].answer==questions[questionCount].choices[id]) {
    answerDisplay.textContent = "Correct!";   //display correct answer div
  } else {
    //wrong answer 
    score -= 10;
    answerDisplay.textContent = "Wrong!"; //display wrong answer div
  }
  mainEl.appendChild(answerDisplay);
  
  //call next question
  questionCount ++;
  if (questionCount !== questions.length) {
    for (var i = 0; i < 4; i++) { //remove old answers
      var oldAnswers = document.querySelector(".answer");
        oldAnswers.remove();
      }
    showQuestion(questionCount); //call for next question
  }
}

function startQuiz() {
  countdown();  //start timer
  //hide the start message and show question
  var subTitle = document.querySelector("h2");
  subTitle.remove();
  startBtn.remove();
  //show question from array 
  mainEl.className = "main-question"; 
  answerOptions.className = "main-question";
  mainEl.appendChild(answerOptions);
  showQuestion(questionCount);
}

function countdown() {
  var timeInterval = setInterval(function () {
    if (score == 0 || questionCount == questions.length ) {
      // stop timer and go to end of quiz
      clearInterval(timeInterval);
      timerEl.textContent = score;
      endQuiz();
    } else {
      timerEl.textContent = score;
      score--;
    }
  }, 1000);
}

function showQuestion(questionID) {
  //get  index so it can be called for each question in array of questions
  titleEl.textContent = questions[questionID].title;
  //add answers 
  for (var i = 0; i < 4; i++) {
    var answer1 = document.createElement("button");
    answer1.className = "answer";
    answer1.setAttribute("data-answer-id" , i);
    answer1.textContent = ((i+1) + ". " + questions[questionID].choices[i]);
    answerOptions.appendChild(answer1);
  }
}

function endQuiz() {
  titleEl.textContent = "All done!";
  answerOptions.remove(); //remove answers from screen
  answerDisplay.remove(); //remove result display from screen
  var showScore = document.createElement("h2"); 
  showScore.textContent = "Your final score is " + score;
  mainEl.appendChild(showScore);
  //add form element
}

// event listener to button click and call function to start
mainEl.addEventListener("click", clickHandler);
