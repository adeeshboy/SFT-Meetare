const questions = [
    {
        question: "පහත සඳහන් ඒවායින් ප්‍රධාන පද්ධති ඒකකයක් (SI Unit) නොවන්නේ කුමක්ද?",
        options: ["මීටරය (m)", "කිලෝග්‍රෑමය (kg)", "සෙල්සියස් (°C)", "තත්පරය (s)"],
        answer: 2
    },
    {
        question: "පරිගණකයක ප්‍රධාන මතකය (Main Memory) ලෙස හඳුන්වනු ලබන්නේ කුමක්ද?",
        options: ["Hard Disk", "RAM", "ROM", "Cache"],
        answer: 1
    },
    {
        question: "ජලයේ තාපාංකය සෙල්සියස් අංශක කීයද?",
        options: ["0°C", "50°C", "100°C", "120°C"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let totalTime = 600; 
let timerInterval;

// 1. LOGIN පරීක්ෂා කිරීමේ Function එක
function checkLogin() {
    const nameInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value;

    // මෙතන Password එක 1234 ලෙස දමා ඇත. නම හිස් නොවිය යුතුය.
    if (nameInput !== "" && passInput === "1234") {
        document.getElementById("login-page").style.display = "none"; // Login මකනවා
        document.getElementById("home-page").style.display = "block";  // Home පෙන්වනවා
        document.getElementById("user-display").textContent = nameInput; // නම දානවා
    } else {
        document.getElementById("login-error").style.display = "block"; // Error එක පෙන්වනවා
    }
}

// 2. HOME එකෙන් QUIZ එක පටන් ගන්නා Function එක
function startActualQuiz() {
    document.getElementById("home-page").style.display = "none"; // Home මකනවා
    document.getElementById("quiz-page").style.display = "block"; // Quiz පෙන්වනවා
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    document.getElementById("progress").innerHTML = `Question ${currentQuestion + 1} / ${questions.length}`;

    let progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progressPercentage + "%";

    let q = questions[currentQuestion];

    let html = `
    <div class="question">
        <h2>${q.question}</h2>
        <div class="options-container">
    `;

    q.options.forEach((option, index) => {
        html += `
        <label class="option-label">
            <input type="radio" name="answer" value="${index}">
            ${option}
        </label>
        `;
    });

    html += `
        </div>
    </div>
    `;
    
    document.getElementById("quiz").innerHTML = html;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("කරුණාකර ඉදිරියට යාමට පෙර පිළිතුරක් තෝරන්න!");
        return;
    }

    if (parseInt(selectedOption.value) === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        document.getElementById("timer").textContent = minutes + ":" + seconds;

        if (totalTime <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
        totalTime--;
    }, 1000);
}

function showResults() {
    clearInterval(timerInterval);
    
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-box").style.display = "block";

    document.getElementById("result").innerHTML = `
        <div class="result-stat" style="color: #28a745;">✅ නිවැරදි පිළිතුරු: ${score}</div>
        <div class="result-stat" style="color: #dc3545;">❌ වැරදි පිළිතුරු: ${questions.length - score}</div>
        <div class="score-badge">Final Score: ${score} / ${questions.length}</div>
    `;
}
