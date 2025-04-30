const questions = [
    { 
        question: "Who wrote the play 'Romeo and Juliet'?", 
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Homer"], 
        correctAnswer: 0 
    },
    { 
        question: "In which novel does the character 'Atticus Finch' appear?", 
        options: ["Pride and Prejudice", "To Kill a Mockingbird", "Moby Dick", "1984"], 
        correctAnswer: 1 
    },
    { 
        question: "Which famous author wrote '1984'?", 
        options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "F. Scott Fitzgerald"], 
        correctAnswer: 0 
    },
    { 
        question: "What is the title of the first Harry Potter book?", 
        options: ["Harry Potter and the Chamber of Secrets", "Harry Potter and the Philosopher's Stone", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Goblet of Fire"], 
        correctAnswer: 1 
    },
    { 
        question: "Who wrote 'The Great Gatsby'?", 
        options: ["Ernest Hemingway", "F. Scott Fitzgerald", "Mark Twain", "J.K. Rowling"], 
        correctAnswer: 1 
    },
    { 
        question: "Which book begins with the line 'Call me Ishmael'?", 
        options: ["The Great Gatsby", "Moby Dick", "Huckleberry Finn", "The Catcher in the Rye"], 
        correctAnswer: 1 
    },
    { 
        question: "Who is the author of 'Pride and Prejudice'?", 
        options: ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "Louisa May Alcott"], 
        correctAnswer: 2 
    },
    { 
        question: "Which famous writer created the character 'Sherlock Holmes'?", 
        options: ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe", "J.R.R. Tolkien"], 
        correctAnswer: 1 
    },
    { 
        question: "What is the title of the novel written by George Orwell about a dystopian society ruled by 'Big Brother'?", 
        options: ["Brave New World", "1984", "The Handmaid's Tale", "Fahrenheit 451"], 
        correctAnswer: 1 
    },
    { 
        question: "Who wrote 'The Chronicles of Narnia' series?", 
        options: ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "Philip Pullman"], 
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