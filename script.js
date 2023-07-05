var score = 0
var timeLeft = 200;
var questions = ["Who is Nintendo's Mascot?", "Which of these Disney animated films starred Robin Williams?", 'Which actor said the line "Say hello to my little friend"?', 
                'What movie series includes the infamous "Lightsaber" weapon?', "Ryu and Ken are characters that belong to which video game franchise?", "Which of these Pokemon are NOT part of the first 151?",
                'Which Star Trek character famously says "Live long and prosper"?', 'Finish this movie quote "Do or do not, _____']
var highScores = JSON.parse(localStorage.getItem("highScores")) || []
var correctAnswers = ["Mario", "Aladdin", "Al Pacino", "Star Wars", "Street Fighter", "Wobbuffet", "Spock", "There is no try"]
var answerChoices = [
    ["Mario", "Pikachu", "Zelda", "Luigi"], 
    ["Snow White and the Seven Dwarves", "The Lion King", "Aladdin", "The Little Mermaid"],
    ["Danny Devito", "Al Pacino", "Robert DeNiro", "Ray Liotta"],
    ["Harry Potter", "Aliens", "Marvel Cinematic Universe", "Star Wars"],
    ["Street Fighter", "Tekken", "Soul Calibur", "Mortal Kombat"],
    ["Wobbuffet", "Squirtle", "Kabutops", "Nidoking"],
    ["Captain James T. Kirk", "Lieutenant Hikari Sulu", "Spock", "Jean-Luc Picard"],
    ["There is no try", "I know Kung Fu", "I'll never let go", "1.21 Jigawatts"],


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
        setTimeout(function() {answerResults.textContent =""}, 600)
        setTimeout(generateQuestions, 400)
    } else {
        timeLeft -= 15;
        answerResults.textContent = "WRONG!"
        setTimeout(function() {answerResults.textContent =""}, 600)
        setTimeout(generateQuestions, 400)
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
    
    scores.sort(function(a, b) {
           return b.score - a.score;
       });

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
   
    showScoreboard() 
}
