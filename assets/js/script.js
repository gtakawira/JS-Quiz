var questionarea = document.querySelector(".questions");
var win = document.querySelector(".win");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var saveButton = document.querySelector(".save-button");
var resetButton = document.querySelector(".reset-button");
var quizButton = document.querySelector(".return");
var getHS= document.querySelector(".geths");
var scoreDisplay= document.querySelector(".scoredisplay");
var scoreBoard= document.querySelector(".scoreboard");
var scorelist= document.querySelector(".scorelist");
var score;
var inititialsinput=document.querySelector("#initials")
var viewHS=document.querySelector(".highscore");

var isWin = false;
var timer;
var timerCount;

var quizContainer = document.getElementById('quiz');
var questions=[]
var resultsContainer = document.getElementById('results');
var answerelt=(document.querySelectorAll("label"))
var numCorrect=0
var highScores






//Array of questions

var questions = [
{
  question: "Who invented JavaScript?",
  answers: {
    a: "Douglas Crockford",
    b: "Sheryl Sandberg",
    c: "Brendan Eich"
  },
  correctAnswer: "c"
},
{
  question: "Which built-in method returns the character at the specified index?",
  answers: {
    a: "characterAt()",
    b: "charAt()",
    c: "getCharAt()"
  },
  correctAnswer: "b"
},
{
  question: "Which of the following function of Number object returns a string value version of the current number?",
  answers: {
    a: "toString()",
    b: "toFixed()",
    c: "toLacaleString()"
  },
  correctAnswer: "a"
},
{
  question: "Which one of these is a JavaScript package manager?",
  answers: {
    a: "Node.js",
    b: "TypeScript",
    c: "npm"
  },
  correctAnswer: "c"
},
{
  question: "Which tool can you use to ensure code quality?",
  answers: {
    a: "Angular",
    b: "jQuery",
    c: "RequireJS",
    d: "ESLint"
  },
  correctAnswer: "d"
}
];

//this function renders the questions
function showQuestions(){
	// we'll need a place to store the output and the answer choices
	var output = [];
	var answers;

	// for each question...
	for(var i=0; i<questions.length; i++){
		
    // first reset the list of answers
    answers = [];

    // for each available answer to this question...
    for(letter in questions[i].answers){

      // ...add an html radio button
      answers.push(
        
        '<label> <input type="radio" name="question'+i+'" value="'+letter+'" class=answerel>'
          
          + letter + ': '
          + questions[i].answers[letter]
        + '</label>'
        
      );
    }
    // add this question and its answers to the output
    output.push(
      '<div class="question">' + questions[i].question + '</div>'
      + '<div class="answers">' + answers.join('') + '</div>'
    );
  }
  

  
  
  // combine output list into one string of html and put it on the page. Loop for each question.
  for(var j=0; j<=numCorrect; j++){
    if (j<questions.length){ quizContainer.innerHTML = output[j]
    } 

    //End Game 
    else
   winGame();
 
  }
}

//Listener to Show results  when item is selected.
quizContainer.addEventListener("click", correctness) 
 
//Show results


function correctness(){
 
  // gather answer containers from our quiz
  var answerContainers = document.querySelector('.answers');
 

  // keep track of user's answers
  var userAnswer = '';
    

  //Identifys the question number based on the answer name
  var question_num=  document.querySelector('.answerel').getAttribute('name').replace(/[^0-9]/g,'')
  


  // find selected answer
  userAnswer = (answerContainers.querySelector('input[type=radio]:checked')||{}).value;
  

  
  // if answer is correct
  if(userAnswer===(questions[question_num].correctAnswer)){
    // add to the number of correct answers
    numCorrect++;
      
    
    // color the answers green
    answerContainers.style.color = 'lightgreen';
    //Loop back to get next question
    showQuestions()

  }
  // if answer is wrong or blank
  else{
    // color the answers red and reduces the time
    answerContainers.style.color = 'red';
    timerCount=(timerCount-50)

  }
}

// The init function is called when the page loads 
function init() {
  getHS.style.display= 'none';
    scoreBoard.style.display= 'none';
  startButton.style.display= 'unset';
  startButton.disabled = false;
  questionarea.textContent=""
  timerElement.textContent=500
  numCorrect=0
  inititialsinput.value=''
  questionarea.style.display= 'block';
  viewHS.style.opacity="100"
   highScores =JSON.parse(localStorage.getItem('highscore')) || []
  
}


// The startGame function is called when the start button is clicked
function startGame() {
  timerElement.textContent=500
  isWin = false;
  timerCount = 500;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startButton.style.display= 'none';
  questionarea.style.display= 'block';
  startTimer()
  showQuestions(questions, quizContainer)
}

// The winGame function is called when the win condition is met
function winGame() {
  getHS.style.display= 'unset';
  questionarea.textContent = "YOU WON!!!🏆 ";
  score=timerCount
  scoreDisplay.innerHTML =("Yours score is"+" "+score)
  numCorrect=0
  isWin = true;
  
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  questionarea.textContent = "GAME OVER";
  timerElement.textContent=0;
  numCorrect=0;
  startButton.disabled = false;
  startButton.style.display= 'unset';
  
}

// The  function starts and stops the timer 
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}



// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

//to Save initials

saveButton.addEventListener("click",function(event) {
  event.preventDefault();
  numCorrect=0

  //Gets the Highscore from storage
 highScores =JSON.parse(localStorage.getItem('highscore')) || []
 
  // Records a new highscore
  var winner = {
  
 
    initials: inititialsinput.value.trim().replace(/"([^"]+)":/g, '$1:'),
    score: score
  };

  highScores.push(winner);
  highScores=highScores.sort()


  // set new submission to local storage 
  localStorage.setItem("highscore", JSON.stringify(highScores));
 
  

  init()
});
//Reset highscores
resetButton.addEventListener("click",function(event) {
  event.preventDefault();

  //Gets the Highscore from storage
  var highScores = []
 
    
  // clear local storage 
  localStorage.setItem("highscore", JSON.stringify(highScores));
  removeAllChildNodes(scorelist)
});

quizButton.addEventListener("click", init);

// Calls init() so that it fires when page opened


// open array of high scores
viewHS.addEventListener("click",function(event) {
  event.preventDefault();
  getHS.style.display= 'none';
  startButton.style.display= 'none';
  scoreBoard.style.display= 'unset';
  questionarea.style.display= 'none';
  displayhslist();
  clearInterval(timer);
  viewHS.style.opacity="0"
})
init();


//Display Highscores
  function displayhslist(highScores) { 

   var highScores =JSON.parse(localStorage.getItem('highscore')) 
    
    
    
   
    for (let i = 0; i < highScores.length; i++) {
      
        const score = highScores[i].initials + '- ' + highScores[i].score;
        //create li elements
        var scoreListEl = document.createElement('li');
        //set innerText to the const score in the loop
        scoreListEl.innerText =score;
        //append the li to the list
        scorelist.appendChild(scoreListEl) } }


//remove chrildren on reset
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}