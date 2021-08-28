var startBtn = document.querySelector("#start");
var timerEl = document.getElementById("time");
var mainEl = document.getElementById("main");
var titleEl = document.querySelector("h1");
var answerOptions = document.createElement("div");
var answerDisplay = document.createElement("span");

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

var clickHandler = function (event) {
  var targetEl = event.target;
  
  if (targetEl.matches("#start")) { //start button clicked 
    startQuiz();
  } else if (targetEl.matches(".answer")) {
    //check if the answer correct and show
    var answerId = targetEl.getAttribute("data-answer-id");
    checkAnswer(answerId);
  } else if (targetEl.matches("#submit")) {
    event.preventDefault();
    submitScore();
    var subTitle = document.querySelector("h2");
    subTitle.remove();
    var form = document.querySelector("form");
    form.remove();
    //open high score page
    window.location = "highScore.html";
  }
};

var submitScore = function () {
  var initial = document.querySelector("input").value; //get the input
  var newScore = {
    initial: initial,
    score: score,
  };
  var savedHighScore = localStorage.getItem("highScore");
  
    if (!savedHighScore) {
        savedHighScore=[];
    } else {
    savedHighScore = JSON.parse(savedHighScore);
    }
    savedHighScore.push(newScore);
    localStorage.setItem("highScore", JSON.stringify(savedHighScore));
};

function checkAnswer(id) {
  if (questionCount === 0) {
    answerDisplay.className = "result";
    answerDisplay.textContent = "";
    mainEl.appendChild(answerDisplay);
  }
  if (questions[questionCount].answer == questions[questionCount].choices[id]) {
    answerDisplay.textContent = "Correct!"; //display correct answer div
  } else {
    //wrong answer
    score -= 10;
    answerDisplay.textContent = "Wrong!"; //display wrong answer div
  }
  mainEl.appendChild(answerDisplay);

  //prepare to call next question
  questionCount++;
  if (questionCount !== questions.length) {
    var oldAnswers = document.querySelectorAll(".answer");
    oldAnswers.forEach(item => {item.remove()});
    showQuestion(questionCount); //call for next question
  }
}

function startQuiz() {
  countdown(); //start timer
  //hide the start message and show question
  var subTitle = document.querySelector("h2");
  subTitle.remove();
  startBtn.remove();
  //show question from array
  mainEl.className = "main-question main";
  answerOptions.className = "main-question";
  mainEl.appendChild(answerOptions);
  showQuestion(questionCount);
}

function countdown() {
  var timeInterval = setInterval(function () {
    if (score === 0 || questionCount == questions.length) {
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
    answer1.setAttribute("data-answer-id", i);
    answer1.textContent = i + 1 + ". " + questions[questionID].choices[i];
    answerOptions.appendChild(answer1);
  }
}

function endQuiz() {
  mainEl.classList.add = "end-quiz";
  titleEl.textContent = "All done!";
  answerOptions.remove(); //remove answers from screen
  answerDisplay.remove(); //remove result display from screen
  var showScore = document.createElement("h2");
  showScore.textContent = "Your final score is " + score;
  mainEl.appendChild(showScore);
  //add form element
  var formEl = document.createElement("form");
  formEl.className = "form";
  var initialLabel = document.createElement("label");
  initialLabel.textContent = "Enter initials:";
  formEl.appendChild(initialLabel);
  var initialInput = document.createElement("input");
  formEl.appendChild(initialInput);
  var buttonSubmit = document.createElement("button");
  buttonSubmit.textContent = "Submit";
  buttonSubmit.id = "submit";
  formEl.appendChild(buttonSubmit);
  mainEl.appendChild(formEl);
}

// event listener to button click and call function to start
mainEl.addEventListener("click", clickHandler);
