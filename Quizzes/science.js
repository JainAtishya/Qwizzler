const questions = [
    { 
        question: "What is the chemical symbol for gold?", 
        options: ["Au", "Ag", "Pt", "Hg"], 
        correctAnswer: 0 
    },
    { 
        question: "What is the powerhouse of the cell?", 
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], 
        correctAnswer: 1 
    },
    { 
        question: "Which planet is known as the Red Planet?", 
        options: ["Venus", "Mars", "Jupiter", "Saturn"], 
        correctAnswer: 1 
    },
    { 
        question: "What is the speed of light in vacuum?", 
        options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^5 m/s", "3 × 10^7 m/s"], 
        correctAnswer: 0 
    },
    { 
        question: "What is the chemical formula of water?", 
        options: ["H2O2", "H2O", "HO", "OH"], 
        correctAnswer: 1 
    },
    { 
        question: "Which gas is most abundant in the Earth's atmosphere?", 
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 
        correctAnswer: 1 
    },
    { 
        question: "What is the SI unit of force?", 
        options: ["Pascal", "Newton", "Joule", "Watt"], 
        correctAnswer: 1 
    },
    { 
        question: "What type of bond is formed between two water molecules?", 
        options: ["Ionic Bond", "Covalent Bond", "Hydrogen Bond", "Metallic Bond"], 
        correctAnswer: 2 
    },
    { 
        question: "What is the primary gas responsible for the greenhouse effect?", 
        options: ["Methane", "Carbon Dioxide", "Nitrous Oxide", "Oxygen"], 
        correctAnswer: 1 
    },
    { 
        question: "What is the boiling point of water at standard atmospheric pressure?", 
        options: ["100°C", "212°F", "373 K", "All of the above"], 
        correctAnswer: 3 
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