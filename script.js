const sftLessons = [
    { id: "all", title: "All Lessons", desc: "සියලුම පාඩම් වල මිශ්‍ර ප්‍රශ්න", icon: "📋" },
    { id: 1, title: "Lesson 01", desc: "තාක්ෂණවේදය සඳහා ජෛව පද්ධති හැඳින්වීම", icon: "🧬" },
    { id: 2, title: "Lesson 02", desc: "තාක්ෂණවේදය සඳහා කෘෂි තාක්ෂණය හැඳින්වීම", icon: "🌱" },
    { id: 3, title: "Lesson 03", desc: "තොරතුරු හා සන්නිවේදන තාක්ෂණය හැඳින්වීම", icon: "💻" },
    { id: 4, title: "Lesson 04", desc: "ජීවයේ රසායනික පදනම", icon: "🧪" },
    { id: 5, title: "Lesson 05", desc: "සෛලීය පදනම සහ පටක", icon: "🧫" },
    { id: 6, title: "Lesson 06", desc: "පරිගණක පද්ධති සහ දෘඩාංග", icon: "🖥️" },
    { id: 7, title: "Lesson 07", desc: "පරිගණක මෙහෙයුම් පද්ධති", icon: "⚙️" },
    { id: 8, title: "Lesson 08", desc: "දත්ත නිරූපණය සහ තාර්කික ද්වාර", icon: "🔢" },
    { id: 9, title: "Lesson 09", desc: "පරිගණක ජාලකරණය", icon: "🌐" },
    { id: 10, title: "Lesson 10", desc: "ව්‍යවහාරික ජීව විද්‍යාව", icon: "🌿" },
    { id: 11, title: "Lesson 11", desc: "ක්ෂුද්‍රජීව විද්‍යාව සහ ආහාර තාක්ෂණය", icon: "🍞" },
    { id: 12, title: "Lesson 12", desc: "කෘෂිකාර්මික බෝග සහ වගාවන්", icon: "🌾" },
    { id: 13, title: "Lesson 13", desc: "පළිබෝධ පාලනය සහ බෝග ආරක්ෂණය", icon: "🐛" },
    { id: 14, title: "Lesson 14", desc: "සත්ව පාලනය සහ නිෂ්පාදන", icon: "🐄" },
    { id: 15, title: "Lesson 15", desc: "පද්ධති විශ්ලේෂණය සහ සැලසුම්කරණය", icon: "📊" },
    { id: 16, title: "Lesson 16", desc: "දත්ත සමුදාය කළමනාකරණ පද්ධති (DBMS)", icon: "🗄️" },
    { id: 17, title: "Lesson 17", desc: "පරිගණක ක්‍රමලේඛනය (Programming)", icon: "👨‍💻" },
    { id: 18, title: "Lesson 18", desc: "වෙබ් අඩවි නිර්මාණය (Web Design)", icon: "🌍" },
    { id: 19, title: "Lesson 19", desc: "පරිසර තාක්ෂණය සහ කළමනාකරණය", icon: "♻️" },
    { id: 20, title: "Lesson 20", desc: "ජෛව වෛද්‍ය තාක්ෂණය", icon: "🩺" },
    { id: 21, title: "Lesson 21", desc: "ආහාර සුරක්ෂිතතාව සහ පෝෂණය", icon: "🍎" },
    { id: 22, title: "Lesson 22", desc: "කෘෂිකාර්මික ඉංජිනේරු විද්‍යාව", icon: "🚜" },
    { id: 23, title: "Lesson 23", desc: "ඊ-වාණිජ්‍යය සහ තොරතුරු පද්ධති (E-Commerce)", icon: "🛒" },
    { id: 24, title: "Lesson 24", desc: "තාක්ෂණවේදයේ නැඹුරුවීම් සහ අනාගතය", icon: "🚀" }
];

const allQuestions = [
    {
        lesson: 3,
        question: "පරිගණකයක ප්‍රධාන මතකය (Main Memory) ලෙස හඳුන්වනු ලබන්නේ කුමක්ද?",
        options: ["Hard Disk", "RAM", "ROM", "Cache"],
        answer: 1
    }
];

let questions = []; 
let currentQuestion = 0;
let score = 0;
let totalTime = 600; 
let timerInterval;
let isMenuOpen = false;

function generateLessonsDashboard() {
    const container = document.getElementById("lessons-container");
    let htmlContent = "";
    sftLessons.forEach(lesson => {
        htmlContent += `
        <div class="dash-card topic-card" onclick="selectLesson('${lesson.id}', '${lesson.title}')">
            <span class="card-icon">${lesson.icon}</span>
            <div class="card-text">
                <h4>${lesson.title}</h4>
                <p>${lesson.desc}</p>
            </div>
        </div>
        `;
    });
    container.innerHTML = htmlContent;
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (isMenuOpen) {
        sidebar.style.left = "-260px";
    } else {
        sidebar.style.left = "0px";
    }
    isMenuOpen = !isMenuOpen;
}

// ⏳ විභාගයට ඇති දවස් ගණන ගණනය කරන Function එක
function calculateExamCountdown() {
    const examDate = new Date("November 25, 2026").getTime(); // 👈 ඔයාට ඕන දිනයක් මෙතනට දාන්න
    const now = new Date().getTime();
    const difference = examDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        document.getElementById("days-count").textContent = days;
    } else {
        document.getElementById("days-count").textContent = "00";
    }
}

function checkLogin() {
    const nameInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value;

    if (nameInput !== "" && passInput === "1234") {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";
        document.getElementById("user-display").textContent = nameInput;
        
        // Sidebar එකේ යූසර් ප්‍රොෆයිල් එකට නම දානවා
        document.getElementById("sidebar-username").textContent = nameInput;
        document.querySelector(".menu-open-btn").style.display = "block"; 
        
        generateLessonsDashboard();
        calculateExamCountdown(); // Countdown එක සක්‍රීය කිරීම
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// 📑 AdSense අවශ්‍යතා සඳහා Sidebar එකේ බටන්ස් වල Popup Modals
function showSidebarModal(type) {
    if (isMenuOpen) toggleMenu();
    const modal = document.getElementById("info-modal");
    const contentBox = document.getElementById("modal-body-content");
    
    let html = "";
    if (type === 'about') {
        html = `<h2>ℹ️ About Owner</h2>
                <p style="margin-top:10px;">Welcome to <b>SFT Meetare</b>! This platform was created to help Advanced Level Technology stream students score high in their SFT MCQ papers.</p>
                <p style="margin-top:10px;"><b>Owner/Developer:</b> Adeesha Boy<br><b>Mission:</b> Delivering top-notch educational resources digitally.</p>`;
    } else if (type === 'review') {
        html = `<h2>⭐ Reviews & Feedback</h2>
                <p style="margin-top:10px;">We value your feedback! Rate your experience with SFT Meetare.</p>
                <textarea id="feedback-text" style="width:100%; height:80px; margin:10px 0; padding:10px; border-radius:8px;" placeholder="Write your review here..."></textarea>
                <button onclick="alert('Thank you for your valuable review!')" class="action-btn" style="padding:10px;">Submit Review</button>`;
    } else if (type === 'privacy') {
        html = `<h2>🔒 Privacy Policy</h2>
                <p style="margin-top:10px; font-size:13px; text-align:left;">At SFT Meetare, accessible from your domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SFT Meetare and how we use it. We use cookies and web beacons for Google AdSense to serve personalized ads based on your visits.</p>`;
    } else if (type === 'terms') {
        html = `<h2>📜 Terms & Conditions</h2>
                <p style="margin-top:10px; font-size:13px; text-align:left;">By accessing SFT Meetare, we assume you accept these terms and conditions. Do not continue to use this web application if you do not agree to take all of the terms and conditions stated on this page. Content is strictly for educational purposes.</p>`;
    }
    
    contentBox.innerHTML = html;
    modal.style.display = "block";
}

function closeSidebarModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Window එකෙන් පිට ක්ලික් කරත් Modal එක වැහෙනවා
window.onclick = function(event) {
    const modal = document.getElementById("info-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function selectLesson(lessonId, lessonTitle) {
    if (isMenuOpen) toggleMenu(); 

    if (lessonId === 'all') {
        questions = [...allQuestions];
        document.getElementById("quiz-topic-title").textContent = "SFT Meetare - All Lessons";
    } else {
        questions = allQuestions.filter(q => q.lesson == lessonId);
        document.getElementById("quiz-topic-title").textContent = "SFT Meetare - " + lessonTitle;
    }

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

function backToHome() {
    clearInterval(timerInterval);
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("home-page").style.display = "block";
}
