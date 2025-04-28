const questions = [
    { 
        question: "Who is known as the father of the computer?", 
        options: ["Charles Babbage", "Alan Turing", "Tim Berners-Lee", "Bill Gates"], 
        correctAnswer: 0 
    },
    { 
        question: "Which programming language is primarily used for Android app development?", 
        options: ["Java", "Python", "C++", "Swift"], 
        correctAnswer: 0 
    },
    { 
        question: "What does 'HTTP' stand for?", 
        options: ["HyperText Transmission Protocol", "HyperText Transfer Protocol", "Hyper Tool Text Protocol", "High Text Transfer Protocol"], 
        correctAnswer: 1 
    },
    { 
        question: "Who invented the World Wide Web?", 
        options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"], 
        correctAnswer: 2 
    },
    { 
        question: "What does 'CPU' stand for in computing?", 
        options: ["Central Programming Unit", "Central Processing Unit", "Central Power Unit", "Central Program Unit"], 
        correctAnswer: 1 
    },
    { 
        question: "Which company developed the first computer mouse?", 
        options: ["Apple", "IBM", "Xerox", "Microsoft"], 
        correctAnswer: 2 
    },
    { 
        question: "What year was the first iPhone released?", 
        options: ["2004", "2005", "2007", "2009"], 
        correctAnswer: 2 
    },
    { 
        question: "Which company is known for developing the Linux operating system?", 
        options: ["Microsoft", "Oracle", "Red Hat", "Google"], 
        correctAnswer: 2 
    },
    { 
        question: "What is the full form of 'Wi-Fi'?", 
        options: ["Wireless Fidelity", "Wireless Internet Finder", "Wide Frequency Internet", "Wide Field Integration"], 
        correctAnswer: 0 
    },
    { 
        question: "Which language is primarily used for web development along with HTML and CSS?", 
        options: ["Java", "JavaScript", "C#", "Ruby"], 
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
