const questions = [
    { question: "What is the derivative of x^2?", options: ["x", "2x", "x^2", "2"], correctAnswer: 1 },
    { question: "What is the integral of 2x?", options: ["x^2 + C", "x^2", "2x^2", "x^2 - C"], correctAnswer: 0 },
    { question: "Solve: 2(3 + 4) - 5", options: ["11", "7", "9", "8"], correctAnswer: 0 },
    { question: "What is the value of 2^5?", options: ["25", "10", "32", "16"], correctAnswer: 2 },
    { question: "Solve: (3^3) ÷ (3^2)", options: ["3", "9", "27", "1"], correctAnswer: 0 },
    { question: "If f(x) = x^2 + 2x + 1, find f(3)", options: ["16", "12", "14", "18"], correctAnswer: 0 },
    { question: "What is the result of log2(32)?", options: ["3", "5", "4", "6"], correctAnswer: 1 },
    { question: "Solve: √144 + √64", options: ["20", "22", "24", "18"], correctAnswer: 0 },
    { question: "What is the factorial of 5?", options: ["120", "100", "24", "60"], correctAnswer: 0 },
    { question: "Solve: (7x - 14) = 0 for x", options: ["0", "1", "2", "7"], correctAnswer: 2 }
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
