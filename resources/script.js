var score = 0
var timeLeft = 200;
var questions = ["How do I test this?", "More Testing", "Test 3", "Test 4", "Test 5"]
var highScores = JSON.parse(localStorage.getItem("highScores")) || []
var correctAnswers = ["By Answering this", "Answer More Tests", "answer 3 for 3", "answer 4 for 4", "Test 5 Answers"]
var answerChoices = [
    ["By Answering this", "Or this?", "Perhaps This?", "I don't know?"], 
    ["Test More Answers", "Answer More Tests", "What About This?", "Hey hey hey"],
    ["Test 3 Answers", "answer 2 for 3", "answer 3 for 3", "answer 4 for 3"],
    ["Test 4 Answers", "answer 2 for 4", "answer 3 for 4", "answer 4 for 4"],
    ["Test 5 Answers", "answer 2 for 5", "answer, 3 for 5", "answer 4 for 5"]
] 


var playerScore = document.getElementById("score");
var startGame = document.getElementById("start-game");
var choices = document.getElementById("answers-choices");
var question = document.getElementById("question");
var timer = document.getElementById("timer");
var playerInit = document.getElementById("playername");
var nameForm = document.getElementById("high-score-form");
var highScoreBoard = document.getElementById("high-scores");
var checkScoreBoard = document.getElementById("score-board");
var scoreboardh2 = document.getElementById("score-board-h2");
var answerResults = document.getElementById("result");
var intId;

startGame.addEventListener("click", launchGame)
checkScoreBoard.addEventListener("click", showScoreboard)

function launchGame() {
    startGame.disabled = true;
    checkScoreBoard.disabled = true;

    choices.removeAttribute("hidden", "")
    question.removeAttribute("hidden", "")
    timer.removeAttribute("hidden","");
    playerScore.removeAttribute("hidden","")
    answerResults.removeAttribute("hidden","")
    
    if(highScoreBoard){
        highScoreBoard.setAttribute("hidden", ""); 
    }
    if(nameForm) {
        nameForm.hidden = true;
    }

    score = 0
    generateQuestions()
    intId = setInterval(gameTimer, 1000);
}

function generateQuestions() {
    var randomIdx = Math.floor(Math.random() * questions.length)
    var randomQuestion = questions[randomIdx]
    var correctAnswer = correctAnswers[randomIdx] 

    question.textContent = randomQuestion
    playerScore.textContent = `Your Score: ${score}`;
    timer.textContent = `Time Left!: ${timeLeft}`;
    
    while(choices.firstChild) {
        choices.removeChild(choices.firstChild)
        }

    answerChoices[randomIdx].forEach(answer => {
        var options = document.createElement("li");
           options.textContent = answer;
           choices.appendChild(options)
           options.addEventListener('click', function() {
            checkAnswer(options.textContent, correctAnswer)
            });
        });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score ++;
        answerResults.textContent = "Correct!"
        setTimeout(function() {answerResults.textContent =""}, 900)
        setTimeout(generateQuestions, 500)
    } else {
        timeLeft -= 15;
        answerResults.textContent = "WRONG!"
        setTimeout(function() {answerResults.textContent =""}, 900)
        setTimeout(generateQuestions, 500)
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    // generateQuestions()
}

function gameTimer() {
    if (timeLeft > 0) {
        timer.textContent = `Time Left!: ${timeLeft}`
        timeLeft --;
    } else {
        timer.textContent = `Time's Up!`
        endGame()
    }
}

nameForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var playerName = document.getElementById("playername").value;
        scoreBoard(playerName);
    }) 

function endGame() { 
    clearInterval(intId)
    
    startGame.disabled = false
    startGame.textContent = "Play Again?"
    timeLeft = 200 

    answerResults.setAttribute("hidden", "")
    choices.setAttribute("hidden", "")
    question.setAttribute("hidden", "")
    nameForm.removeAttribute("hidden","") 
}

function showScoreboard() {
    var scores = JSON.parse(localStorage.getItem("highScores"))
    var playerList = document.getElementById("player-names")  
    
    choices.setAttribute("hidden", "");
    question.setAttribute("hidden", "");
    timer.setAttribute("hidden","");
    playerScore.setAttribute("hidden", "");
    checkScoreBoard.disabled = true;

    highScoreBoard.removeAttribute("hidden");

    scores.forEach(function(score) {
        var newScore = document.createElement("li");
        newScore.textContent = `Name: ${score.name} Score: ${score.score}`;
        playerList.appendChild(newScore);
    })    
}    

function scoreBoard(playerName) {
    var highestScores = document.getElementById("player-names");

    highScoreBoard.removeAttribute("hidden");
    nameForm.setAttribute("hidden", "");
    highScores.push({ name: playerName, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    highestScores.innerHTML = ''
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });
    showScoreboard() 
}
