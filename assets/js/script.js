var startBtn = document.querySelector("#start");
var timerEl = document.getElementById("time");
var mainEl = document.getElementById("main");
var titleEl = document.querySelector("h1");
console.log(mainEl);

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
    console.log(targetEl);
    //check if the answer correct and show
    var answerId = targetEl.getAttribute("data-answer-id");
    checkAnswer(answerId);

  }

};

function checkAnswer(id) {
  console.log(id);
  console.log()
  if (questions[questionCount].answer==questions[questionCount].choices[id]) {
    //correct answer
    console.log("correct");
    //display correct answer div
  } else {
    //wrong answer
    score -= 10;
    //display wrong answer div
    console.log("wrong");
  }
  //call next question
  if (questionCount == questions.length - 1) {
    endQuiz();
  } else {
    questionCount ++;
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
  showQuestion(questionCount);
  //wait for click and

  //check if correct

  //if incorrect
  // score -= 10;

  //show next question

  // remove q and a and endQuiz();
}

function countdown() {
  var timeInterval = setInterval(function () {
    if (score > 0) {
      timerEl.textContent = score;
      score--;
    } else {
      timerEl.textContent = 0;
      // should stop questions and go to end of quiz
      endQuiz();
      clearInterval(timeInterval);
    }
  }, 1000);
}

function showQuestion(questionID) {
  //should get  index so it can be called for each question in array of questions
  titleEl.textContent = questions[questionID].title;
  mainEl.className = "main-question";
  
  
  //add answers 
  for (var i = 0; i < 4; i++) {

    var answer1 = document.createElement("button");
    answer1.className = "answer";
    answer1.setAttribute("data-answer-id" , i);
    answer1.textContent = ((i+1) + ". " + questions[questionID].choices[i]);
    mainEl.appendChild(answer1);
  }
}

//write endQuiz function
function endQuiz() {
  //stop timer
  titleEl.textContent = "All done!";
  //remove answers from screen
  var showScore = document.createElement("h2");
  showScore.textContent = "Your final score is " + score;
  mainEl.appendChild(showScore);
  //add form element
}

// event listener to button click and call function to start
mainEl.addEventListener("click", clickHandler);
