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
var choices = document.getElementById("answers-choices")




startGame.addEventListener("click", start)

function generateQuestions() {
    while(choices.firstChild) {
        choices.removeChild(choices.firstChild)
        }

    answerChoices[0].forEach(answer => {
        var options = document.createElement("li");
       // var clickOptions = document.querySelectorAll('li')
           options.textContent = answer;
           choices.appendChild(options)
           options.addEventListener('click', nextQuestion)
        });    
}


function start() {
    var question = document.getElementById("question");
    
    question.textContent = questions[0];
    answers = answerChoices[0];

    generateQuestions()
}

function nextQuestion(e) {
   generateQuestions()

}

function endGame() {
}

function enterInitials() {

}

