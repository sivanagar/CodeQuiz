var clearButton = document.getElementById("clear");

var clearHighScore = function () {
  localStorage.removeItem("highScore"); //delete high score from localStorage
  var highScoreList = document.querySelector("#high-score");
  while (highScoreList.children.length > 0) {
    highScoreList.removeChild(highScoreList.lastElementChild); //remove each item in highscore form html
  }
};

var loadHighScore = function () {
  var savedHighScore = localStorage.getItem("highScore"); //get high score from localStorage
  if (!savedHighScore) {
    return false; //if empty exit function.
  }
  savedHighScore = JSON.parse(savedHighScore);

  for (var i = 0; i < savedHighScore.length; i++) {  //Add high score items to html
    var scoreItem = document.createElement("li");
    scoreItem.innerHTML = savedHighScore[i].initial + " - " + savedHighScore[i].score;
    var highScoreList = document.querySelector("#high-score");
    highScoreList.appendChild(scoreItem);
  }
};

clearButton.addEventListener("click", clearHighScore);
loadHighScore(); 
