// Game information is set up for the user's game session to play
var score = 0
var timeLeft = 200;

// These three arrays are related to each other in terms of index for the purpose of game functionality. All indexes of these arrays must remain in order
// or else the quiz game's functionality will break.
var questions = ["Who is Nintendo's Mascot?", "Which of these Disney animated films starred Robin Williams?", 'Which actor said the line "Say hello to my little friend"?', 
                'What movie series includes the infamous "Lightsaber" weapon?', "Ryu and Ken are characters that belong to which video game franchise?", "Which of these Pokemon are NOT part of the first 151?",
                'Which Star Trek character famously says "Live long and prosper"?', 'Finish this movie quote "Do or do not, _____', "This film was directed by James Cameron in 1991 and Starred Arnold Schwarzenegger", 'What film featured the one-hit-wonder, "Eye of the Tiger"?',
                'Which "Chris" is known for playing Captain America?', 'Which animated show featured the video game "World of Warcraft" for an episode?']

var correctAnswers = ["Mario", "Aladdin", "Al Pacino", "Star Wars", "Street Fighter", "Wobbuffet", "Spock", "There is no try", "Terminator 2", "Rocky", "Chris Evans", "South Park"]

var answerChoices = [
    ["Mario", "Pikachu", "Zelda", "Luigi"], 
    ["Snow White and the Seven Dwarves", "The Lion King", "Aladdin", "The Little Mermaid"],
    ["Danny Devito", "Al Pacino", "Robert DeNiro", "Ray Liotta"],
    ["Harry Potter", "Aliens", "Marvel Cinematic Universe", "Star Wars"],
    ["Street Fighter", "Tekken", "Soul Calibur", "Mortal Kombat"],
    ["Wobbuffet", "Squirtle", "Kabutops", "Nidoking"],
    ["Captain James T. Kirk", "Lieutenant Hikari Sulu", "Spock", "Jean-Luc Picard"],
    ["There is no try", "I know Kung Fu", "I'll never let go", "1.21 Jigawatts"],
    ["True Lies", "Terminator 2", "Predator", "Commando"],
    ["Creed", "Rambo", "Demolition Man", "Rocky"],
    ["Chris Pine", "Chris Pratt", "Chris Hemsworth", "Chris Evans"],
    ["Family Guy", "South Park", "The Simpsons", "Rick and Morty"]
] 

// call the localstorage for any highscores. If none exist, set highScores as an empty array
var highScores = JSON.parse(localStorage.getItem("highScores")) || []

// all the various selectors
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

// establish the intId variable to be called on later
var intId;

// add event listeners to the start game and scoreboard buttons
startGame.addEventListener("click", launchGame)
checkScoreBoard.addEventListener("click", showScoreboard)

// function that executes once a player presses start game
function launchGame() {
    // disable the start game and scoreboard buttons while the game is running
    startGame.disabled = true;
    checkScoreBoard.disabled = true;

    // remove hidden attributes on all required game elements
    choices.hidden = false;
    question.hidden = false;
    timer.hidden = false;
    playerScore.hidden = false;
    answerResults.hidden = false;
    
    // perform a check if the highscore or the enter name form are displayed and hide them if they are 
    if(highScoreBoard){
        highScoreBoard.hidden = true;
        // highScoreBoard.setAttribute("hidden", ""); 
    }
    if(nameForm) {
        nameForm.hidden = true;
    }

    // set the score to 0 in case the user had a previous score. Start the game clock using intId created on line 46
    // call generateQuestions to display a random question from the question array and a matching set of answers from the answers array
    score = 0
    intId = setInterval(gameTimer, 1000);
    generateQuestions()
}
// the function called by setinterval responsible for managing the game clock
function gameTimer() {
    if (timeLeft > 0) {
        timer.textContent = `Time Left!: ${timeLeft}`
        timeLeft --;
    } else {
        timer.textContent = `Time's Up!`
        endGame()
    }
}


// This function will display the question and answer options to the user
function generateQuestions() {
    // select an index at random
    var randomIdx = Math.floor(Math.random() * questions.length)
    // obtain the value of said random index from the questions array
    var randomQuestion = questions[randomIdx]
    // obtains a "correct answer" from correctAnswers array using the same index
    var correctAnswer = correctAnswers[randomIdx] 

    // displays the question for the user to answer as well as displays their current score and time remaining in the round
    question.textContent = randomQuestion
    playerScore.textContent = `Your Score: ${score}`;
    timer.textContent = `Time Left!: ${timeLeft}`;
    
    // if the ul of answers choices has any elements in it, remove them
    while(choices.firstChild) {
        choices.removeChild(choices.firstChild)
        }

    // iterate through the answerChoices array at the same index that was generated earlier. For each index in the random index,
    // create an li element, set the text content to contain the potential answer, add a click event listener, then append it to the ul element
    answerChoices[randomIdx].forEach(answer => {
        var options = document.createElement("li");
           options.textContent = answer;
           choices.appendChild(options)
           options.addEventListener('click', function() {
            checkAnswer(options.textContent, correctAnswer)
            });
        });
}

// this funtion will compare the answer the player clicked on with the correct answer from the correctAnswer array
// it will display a result to the user based on a correct or incorrect answer and then generate a new question in a set amount of time
function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score ++;
        answerResults.textContent = "Correct!"
        setTimeout(function() {answerResults.textContent =""}, 900)
        setTimeout(generateQuestions, 400)
    } else {
        timeLeft -= 15;
        answerResults.textContent = "WRONG!"
        setTimeout(function() {answerResults.textContent =""}, 900)
        setTimeout(generateQuestions, 400)
        // This was added to prevent the user from seeing a negative value for the remaining time
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
}


// form that appears once the game is over. it will pass the player name to the scoreboard
nameForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var playerName = document.getElementById("playername").value;
        scoreBoard(playerName);
    }) 

// stops the timer from counting down, resets the startgame button back to clickable. Hides all the game elements.
//  and displays the name entry form
function endGame() { 
    clearInterval(intId)
    
    startGame.disabled = false;
    startGame.textContent = "Play Again?"
    timeLeft = 200 

    answerResults.hidden = true;
    choices.hidden = true; 
    question.hidden = true;
    
    nameForm.hidden = false
}

// Takes the player's name input from the form as well as their score and pushes that value into the hiScore array, 
// then stores the array in local storage
function scoreBoard(playerName) {
    var highestScores = document.getElementById("player-names");

    highScoreBoard.hidden = false;
    nameForm.hidden = true;
    highScores.push({ name: playerName, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    // resets the innerHTML. this step was added because player's high scores were being appended to the scoreboard twice.
    highestScores.innerHTML = ''
   
    showScoreboard() 
}
// hides all the game elments again and displays the highscores. Then sorts the scores in order from highest to lowest.
// creates an li element for each score and appends them to the scoreboard 
function showScoreboard() {
    var scores = JSON.parse(localStorage.getItem("highScores"))
    var playerList = document.getElementById("player-names")  
    
    choices.hidden = true;
    question.hidden = true;
    timer.hidden = true;
    playerScore.hidden = true;
    checkScoreBoard.disabled = true;

    highScoreBoard.hidden = false
    
    scores.sort(function(a, b) {
           return b.score - a.score;
       });

    scores.forEach(function(score) {
        var newScore = document.createElement("li");
        newScore.textContent = `Name: ${score.name} Score: ${score.score}`;
        playerList.appendChild(newScore);
    })    
}    


