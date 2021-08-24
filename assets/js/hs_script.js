var clearButton = document.getElementById("clear");

var loadHighScore = function (){
    var savedHighScore = localStorage.getItem("highScore");

    if (!savedHighScore) {
        return false;
    }
    savedHighScore = JSON.parse(savedHighScore);
    console.log(savedHighScore);
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

var clearHighScore = function (){
    localStorage.removeItem("highScore");
    var highScoreList = document.querySelectorAll("li");
    console.log(highScoreList);
    //need to remove
}

clearButton.addEventListener("click", clearHighScore);
loadHighScore();