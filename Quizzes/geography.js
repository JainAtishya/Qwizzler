const questions = [
    { 
        question: "What is the capital city of Japan?", 
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], 
        correctAnswer: 2 
    },
    { 
        question: "Which river is the longest in the world?", 
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"], 
        correctAnswer: 1 
    },
    { 
        question: "Which continent is known as the 'Dark Continent'?", 
        options: ["Asia", "Africa", "South America", "Australia"], 
        correctAnswer: 1 
    },
    { 
        question: "Mount Everest is located in which country?", 
        options: ["China", "India", "Nepal", "Pakistan"], 
        correctAnswer: 2 
    },
    { 
        question: "Which country has the largest land area in the world?", 
        options: ["Canada", "United States", "China", "Russia"], 
        correctAnswer: 3 
    },
    { 
        question: "The Great Barrier Reef is located off the coast of which country?", 
        options: ["New Zealand", "Australia", "South Africa", "Canada"], 
        correctAnswer: 1 
    },
    { 
        question: "Which desert is the largest in the world?", 
        options: ["Sahara", "Gobi", "Kalahari", "Arabian"], 
        correctAnswer: 0 
    },
    { 
        question: "What is the largest island in the world?", 
        options: ["Australia", "Greenland", "New Guinea", "Borneo"], 
        correctAnswer: 1 
    },
    { 
        question: "Which mountain range separates Europe and Asia?", 
        options: ["Himalayas", "Andes", "Ural Mountains", "Alps"], 
        correctAnswer: 2 
    },
    { 
        question: "Which country is known as the 'Land of the Rising Sun'?", 
        options: ["South Korea", "Japan", "China", "Thailand"], 
        correctAnswer: 1 
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 10;
let timerInterval;

// Initialize the quiz
function startQuiz() {
    displayQuestion(currentQuestionIndex);
    startTimer();
}

function displayQuestion(index) {
    const questionData = questions[index];
    const questionContainer = document.getElementById('questionText');
    questionContainer.textContent = questionData.question;
    
    const optionsContainer = document.getElementById('optionList');
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, idx) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(idx, button);
        optionsContainer.appendChild(button);
    });

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('questionTotal').textContent = `${currentQuestionIndex + 1} of 10 Questions`;

    // Reset timer for the current question
    timer = 10;
    document.getElementById('timer').textContent = `00:${padZero(timer)}`;
}

function checkAnswer(selectedIndex, button) {
    const correctAnswerIndex = questions[currentQuestionIndex].correctAnswer;

    // Highlight the correct and wrong answers
    const buttons = document.querySelectorAll('.option');
    buttons.forEach((btn, idx) => {
        if (idx === correctAnswerIndex) {
            btn.style.backgroundColor = 'green'; // Correct answer
        } else if (idx === selectedIndex && selectedIndex !== correctAnswerIndex) {
            btn.style.backgroundColor = 'red'; // Wrong answer
        }
    });

    if (selectedIndex === correctAnswerIndex) {
        score++;
        updateScore();
    }

    setTimeout(() => nextQuestion(), 1000); // Proceed to next question after 1 second
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById('timer').textContent = `00:${padZero(timer)}`;
        } else {
            nextQuestion();
        }
    }, 1000);
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function endQuiz() {
    clearInterval(timerInterval);
    alert(`Quiz Over! Your score: ${score}`);
    window.location.href = "quiz.html";
}

// Only "Next" button functionality remains now
document.getElementById('nextBtn').onclick = nextQuestion;

startQuiz();