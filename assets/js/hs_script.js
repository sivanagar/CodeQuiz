var clearButton = document.getElementById("clear");

var clearHighScore = function (){
    localStorage.removeItem("highScore"); 
    var highScoreList = document.querySelector("#high-score")
    while (highScoreList.children.length> 0) {
        highScoreList.removeChild(highScoreList.lastElementChild);  
    }
  }

  var loadHighScore = function (){
    var savedHighScore = localStorage.getItem("highScore");
  
    if (!savedHighScore) {
        return false;
    }
    savedHighScore = JSON.parse(savedHighScore);
    
    for (var i = 0; i < savedHighScore.length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.innerHTML = savedHighScore[i].initial + " - " + savedHighScore[i].score;
        console.log(savedHighScore[i])
        console.log(scoreItem);
        var highScoreList = document.querySelector("#high-score");
        console.log(highScoreList);
        highScoreList.appendChild(scoreItem);
        
    }
  }


clearButton.addEventListener("click", clearHighScore);
loadHighScore();