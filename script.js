// 📋 ප්‍රශ්න ටික පාඩම් අනුව (topic) වෙන් කරලා තියෙන්නේ මචං
const allQuestions = [
    {
        topic: "ict",
        question: "පරිගණකයක ප්‍රධාන මතකය (Main Memory) ලෙස හඳුන්වනු ලබන්නේ කුමක්ද?",
        options: ["Hard Disk", "RAM", "ROM", "Cache"],
        answer: 1
    },
    {
        topic: "ict",
        question: "පහත සඳහන් ඒවායින් Operating System (OS) එකක් නොවන්නේ කුමක්ද?",
        options: ["Windows", "Linux", "HTML", "macOS"],
        answer: 2
    },
    {
        topic: "agri",
        question: "ශාක වල ප්‍රභාසංස්ලේෂණය සඳහා අත්‍යවශ්‍ය නොවන සාධකය කුමක්ද?",
        options: ["සූර්යාලෝකය", "කාබන් ඩයොක්සයිඩ්", "ඔක්සිජන්", "හරිතප්‍රද"],
        answer: 2
    },
    {
        topic: "bio",
        question: "පහත සඳහන් ඒවායින් ප්‍රධාන පද්ධති ඒකකයක් (SI Unit) නොවන්නේ කුමක්ද?",
        options: ["මීටරය (m)", "කිලෝග්‍රෑමය (kg)", "සෙල්සියස් (°C)", "තත්පරය (s)"],
        answer: 2
    },
    {
        topic: "bio",
        question: "ජලයේ තාපාංකය සෙල්සියස් අංශක කීයද?",
        options: ["0°C", "50°C", "100°C", "120°C"],
        answer: 2
    }
];

let questions = []; // තෝරාගන්නා පාඩමට අදාළ ප්‍රශ්න මෙතනට ලෝඩ් වේ
let currentQuestion = 0;
let score = 0;
let totalTime = 600; 
let timerInterval;
let isMenuOpen = false;

// 1. Sidebar Menu එක Open/Close කරන Function එක
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (isMenuOpen) {
        sidebar.style.left = "-260px";
    } else {
        sidebar.style.left = "0px";
    }
    isMenuOpen = !isMenuOpen;
}

// 2. Login Check කිරීම
function checkLogin() {
    const nameInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value;

    if (nameInput !== "" && passInput === "1234") {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";
        document.getElementById("user-display").textContent = nameInput;
        document.querySelector(".menu-open-btn").style.display = "block"; // Login වුණාම මෙනු බටන් එක පෙන්වනවා
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// 3. පාඩමක් තෝරාගැනීම (Topic Selection)
function selectTopic(topicName) {
    if (isMenuOpen) toggleMenu(); // මෙනු එක ඕපන් නම් වහනවා

    // පාඩම අනුව ප්‍රශ්න filter කරගැනීම
    if (topicName === 'all') {
        questions = [...allQuestions];
        document.getElementById("quiz-topic-title").textContent = "All Lessons";
    } else {
        questions = allQuestions.filter(q => q.topic === topicName);
        
        let titles = { ict: "ICT Quiz", agri: "Agri Quiz", bio: "Bio Quiz" };
        document.getElementById("quiz-topic-title").textContent = titles[topicName];
    }

    // ප්‍රශ්න තිබේ නම් පමණක් ක්විස් එක පටන් ගන්නවා
    if (questions.length > 0) {
        currentQuestion = 0;
        score = 0;
        totalTime = 600;
        clearInterval(timerInterval);
        
        document.getElementById("home-page").style.display = "none";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("quiz-page").style.display = "block";
        
        loadQuestion();
        startTimer();
    } else {
        alert("මෙම පාඩමට තවමත් ප්‍රශ්න ඇතුළත් කර නොමැත!");
    }
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

    html += `</div></div>`;
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

// 🏠 නැවත මුල් පිටුවට යාම සඳහා
function backToHome() {
    clearInterval(timerInterval);
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("home-page").style.display = "block";
}
