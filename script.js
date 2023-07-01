var score = 0
var timeLeft = 200;
var questions = ["How do I test this?"]
var answerChoices = [
    ["By Answering this", "Or this?", "Perhaps This?", "I don't know?"], 
    [""]
] 
var correctAnswer = ["By Answering this"]
var currentQuestion = 0

var playerScore = document.getElementById("score");
var startGame = document.getElementById("start-game");

startGame.addEventListener("click", start)

function start() {
    var question = document.getElementById("question");
    var choices = document.getElementById("answer-choices")
    
    question.textContent = questions[0];
    answers = answerChoices[0];
    
    answers.forEach(answer => {
        var options = document.createElement("li");
        
        options.addEventListener("click", nextQuestion)

        options.textContent = answer;
        choices.appendChild(options)
    });
    
}

function nextQuestion(event) {
}

function endGame() {
}

function enterInitials() {

}

