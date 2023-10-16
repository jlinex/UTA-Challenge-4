// quiz questions

let questions = [ 
	{ 
	prompt: `What does HTML stand for?`, 
	options: [ 
			"HyperText Main Language", 
			"HyperTest Markup Language", 
			"HyperText Markup Language", 
			"Happy To Make Language", 
			], 
	answer: "HyperText Markup Language", 
	}, 
	
	{ 
	prompt: `Arrays in JavaScript are defined by which of the following statements?`, 
	options: [ 
			"It is an ordered list of values", 
			"It is an ordered list of standard", 
			"It is an unordered list of objects", 
			"It is an unordered list of standards",
			], 
	answer: "It is an ordered list of objects", 
	}, 

	{ 
	prompt: `How does a for loop start?`, 
	options: [ 
			"for (i = 0; i <= 5; i++)", 
			"for (i = 0; i <= 5)", 
			"for i = 1 to 5", 
			" for (i <= 5; i++)", 
			], 
	answer: "for (i = 0; i <= 5; i++)", 
	}, 

	{ 
	prompt: `A named element in a JavaScript program that is used to store and retrieve data is a _____.`, 
	options: [ 
			"method", 
			"assignment operator", 
			"letiable", 
			"string", 
			], 
	answer: "letiable", 
	}, 
]; 

let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#quizstart"); 
let initialsEl = 
	document.querySelector("#initials"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 

let currentQuestionIndex = 0; 
let time = questions.length * 10; 
let timerId; 

// starts the quiz, hides the homepage

function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 

// loops through questions/answers, creates list 

function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 

// checks for correct answers and deducts time for wrong answer

function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 10; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Incorrect! The correct answer is 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 

// End quiz by hiding questions, 
// Stop timer and show final score 

function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 

// End quiz if timer reaches 0 

function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 

function saveHighscore() { 
	let initials = initialsEl.value.trim(); 
	if (initials !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			initials: initials, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 

// saves score

function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 

initialsEl.onkeyup = checkForEnter; 

submitBtn.onclick = saveHighscore; 

// starts the quiz when button is clicked

startBtn.onclick = quizStart;

// Add a click event listener to the "View High Scores" button
const viewHighScoresButton = document.getElementById("view-high-scores");
viewHighScoresButton.addEventListener("click", function () {
    displayHighScores();
});

// shows high scores
function displayHighScores() {


const highScoresContainer = document.getElementById("high-scores-container");
highScoresContainer.classList.remove("hide");
const highScoresList = document.getElementById("high-scores-list");
highScoresList.innerHTML = "";

// grabs and displays high scores from local storage or any other source
const highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

if (highscores.length === 0) {
    highScoresList.innerHTML = "<li>No recorded high scores yet.</li>";
    } else {
//sorts high scores by score in descending order
    highscores.sort((a, b) => b.score - a.score);

        highscores.forEach((score, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${score.initials}: ${score.score}`;
            highScoresList.appendChild(listItem);
        });
    }
}