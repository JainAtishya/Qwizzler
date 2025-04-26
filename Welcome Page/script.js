document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('startQuiz');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Event listener for the "Start Quiz" button
    startQuizBtn.addEventListener('click', () => {
        // Simulating a login check (can be replaced with actual login check)
        const loggedIn = false; // Set to true if user is logged in

        if (!loggedIn) {
            // Show modal to prompt user to sign in
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        } else {
            alert('Quiz Starting! Redirecting to the quiz page...');
            // Add redirection logic here, e.g., window.location.href = "quiz.html";
        }
    });

    // Ensure that the button is available before attaching the event listener
    const loginRedirectBtn = document.getElementById('loginRedirect');
    if (loginRedirectBtn) {
        loginRedirectBtn.addEventListener('click', () => {
            window.location.href = '../Login%20Page/index.html'; // Use forward slash here
        });
    }

    // Event listener for the dark mode toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.innerHTML = body.classList.contains('dark-mode')
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon"></i>';
    });
});
