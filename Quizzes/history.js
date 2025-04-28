const questions = [
    { 
        question: "Who was the first President of the United States?", 
        options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], 
        correctAnswer: 1 
    },
    { 
        question: "Which war was fought between the North and South regions in the United States?", 
        options: ["World War I", "Civil War", "American Revolution", "Vietnam War"], 
        correctAnswer: 1 
    },
    { 
        question: "In which year did World War II end?", 
        options: ["1940", "1942", "1945", "1948"], 
        correctAnswer: 2 
    },
    { 
        question: "Who was the Prime Minister of the United Kingdom during most of World War II?", 
        options: ["Winston Churchill", "Neville Chamberlain", "Margaret Thatcher", "Tony Blair"], 
        correctAnswer: 0 
    },
    { 
        question: "The Great Wall of China was primarily built to protect against which group?", 
        options: ["Japanese Pirates", "Mongols", "Huns", "Tibetan Rebels"], 
        correctAnswer: 1 
    },
    { 
        question: "What was the name of the ship on which the Pilgrims traveled to America in 1620?", 
        options: ["Santa Maria", "Mayflower", "Endeavour", "Beagle"], 
        correctAnswer: 1 
    },
    { 
        question: "Who was known as the 'Iron Lady' of British politics?", 
        options: ["Queen Elizabeth I", "Margaret Thatcher", "Theresa May", "Angela Merkel"], 
        correctAnswer: 1 
    },
    { 
        question: "Which ancient civilization built the pyramids?", 
        options: ["Babylonian", "Egyptian", "Roman", "Mayan"], 
        correctAnswer: 1 
    },
    { 
        question: "What was the name of the first human civilization in Mesopotamia?", 
        options: ["Sumer", "Akkadian", "Babylonian", "Assyrian"], 
        correctAnswer: 0 
    },
    { 
        question: "Who was the famous conqueror known as the 'King of Macedonia'?", 
        options: ["Alexander the Great", "Julius Caesar", "Genghis Khan", "Napoleon Bonaparte"], 
        correctAnswer: 0 
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