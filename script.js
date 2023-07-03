var score = 0
var timeLeft = 200;
var questions = ["How do I test this?", "More Testing", "Test 3", "Test 4", "Test 5"]
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
var timer = document.getElementById("timer")

var intId;

startGame.addEventListener("click", launchGame)

function launchGame() {
    startGame.disabled = true;
    
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
    } else {
        timeLeft -= 15;
    }
    generateQuestions()

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

function endGame() {
    var playerInit = document.getElementById("high-score-form")

    clearInterval(intId)
    
    startGame.disabled = false
    startGame.textContent = "Play Again?"
    timeLeft = 200
    score = 0
    
    choices.setAttribute("hidden", "")
    question.setAttribute("hidden", "")
    
    playerInit.removeAttribute("hidden","") 
    playerInit.addEventListener("submit", enterInitials);
    
}

function enterInitials(e) {
    var form = document.getElementById("high-score-form");
   
    e.preventDefault()

    localStorage.setItem("highScore", form) 
    }

