var score = 0
var timeLeft = 200;
var questions = ["How do I test this?"]
var answerChoices = [["By Answering this", "Or this?", "Perhaps This?", "I don't know?"], [""]] 
var correctAnswer = ["By Answering this"]
var currentQuestion = 0

var questionEl = document.querySelector("question");
var answers = document.getElementsByClassName("answer");

var playerScore = document.getElementById("score");
var startGame = document.getElementById("start-game");

startGame.addEventListener("click", start)

function start() {
    questionEl = questions[0]
    playerScore.textContent = score;
debugger
    }

function nextQuestion(event) {
}

function endGame() {
}

function enterInitials() {

}

