const sftLessons = [
    { id: "all", title: "All Lessons", desc: "සියලුම පාඩම් වල මිශ්‍ර ප්‍රශ්න", icon: "📋" },
    // MATHS
    { id: 1, title: "01. වර්ගඵලය හා පරිමාව", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "📐" },
    { id: 3, title: "03. පයිතගරස් සම්බන්ධය", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "🔺" },
    { id: 7, title: "07. ත්‍රිකෝණමිතික අනුපාත", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "📉" },
    { id: 19, title: "19. ඛණ්ඩාංක ජ්‍යාමිතිය", desc: "ඒකජ ශ්‍රිත හා වර්ගජ ශ්‍රිත - 13 ශ්‍රේණිය", icon: "📊" },
    { id: 20, title: "20. සංඛ්‍යානය", desc: "ගණිතය - 13 ශ්‍රේණිය", icon: "🔢" },
    // PHYSICS
    { id: 2, title: "02. මිනුම් ඒකක හා මිනුම් උපකරණ", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "📏" },
    { id: 5, title: "05. බලය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "💥" },
    { id: 6, title: "06. කාර්යය, ශක්තිය, ජවය", desc: "ක්ෂමතාව - 12 ශ්‍රේණිය", icon: "⚡" },
    { id: 8, title: "08. භ්‍රමණ චලිතය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔄" },
    { id: 9, title: "09. විද්‍යුතය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔌" },
    { id: 10, title: "10.概念 තාපය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔥" },
    { id: 16, title: "16. තරල", desc: "භෞතික විද්‍යාව - 13 ශ්‍රේණිය", icon: "💧" },
    // CHEMISTRY
    { id: 11, title: "11. තාප රසායනය", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "🧪" },
    { id: 12, title: "12. චාලක රසායනය", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "⏳" },
    { id: 13, title: "13. ජෛව අණු", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "🧬" },
    { id: 14, title: "14. බහුඅවයවීක", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🧱" },
    { id: 15, title: "15. පදාර්ථයේ යාන්ත්‍රික ගුණ", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "💎" },
    { id: 17, title: "17. රසායනික කර්මාන්ත", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🏭" },
    { id: 18, title: "18. ස්වාභාවික නිෂ්පාදන", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🌿" },
    { id: 25, title: "25. පාරිසරික සමතුලිතතාව", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🌍" },
    // BIO & ICT
    { id: 4, title: "04. ජීව විද්‍යා කොටස්", desc: "සෛල, ශාක පටක, ක්ෂුද්‍ර ජීවීන්", icon: "🌱" },
    { id: 21, title: "21. පරිගණක පද්ධතිය හා උපාංග", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "🖥️" },
    { id: 22, title: "22. Operating Systems (OS)", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "⚙️" },
    { id: 23, title: "23. යෙදුම් මෘදුකාංග", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "📱" },
    { id: 24, title: "24. අන්තර්ජාලය", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "🌐" }
];

// ටෙස්ට් කරන්න ප්‍රශ්න කිහිපයක් ඇතුළත් කළා මචං (ලෙක්චර්ස් වලට අදාළව)
const allQuestions = [
    { lesson: 3, question: "පයිතගරස් ප්‍රමේයය වලංගු වන්නේ කුමන ත්‍රිකෝණ සඳහා පමණද?", options: ["සමපාද ත්‍රිකෝණ", "ඍජුකෝණී ත්‍රිකෝණ", "සමද්වීපාද ත්‍රිකෝණ", "මහා කෝණී ත්‍රිකෝණ"], answer: 1 },
    { lesson: 21, question: "පරිගණකයක ප්‍රධාන මතකය (Main Memory) ලෙස හඳුන්වනු ලබන්නේ කුමක්ද?", options: ["Hard Disk", "RAM", "ROM", "Cache"], answer: 1 },
    { lesson: 2, question: "පහත දැක්වෙන ඒකක අතුරින් SI මූලික ඒකකයක් නොවන්නේ කුමක්ද?", options: ["කිලෝග්‍රෑම් (kg)", "තත්පරය (s)", "සෙල්සියස් (Celsius)", "ඇම්පියරය (A)"], answer: 2 }
];

let questions = []; 
let currentQuestion = 0;
let score = 0;
let totalTime = 600; 
let timerInterval;
let isMenuOpen = false;
let userAnswers = []; // ළමයා තෝරන උත්තර සේව් කරන්න

// Auto Login check වෙබ් එක ලෝඩ් වෙද්දීම
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("sft_username");
    if (savedUser) {
        showDashboard(savedUser);
    }
});

function generateLessonsDashboard() {
    const container = document.getElementById("lessons-container");
    let htmlContent = "";
    sftLessons.forEach(lesson => {
        htmlContent += `
        <div class="dash-card topic-card" onclick="selectLesson('${lesson.id}', '${lesson.title}')" style="transition: 0.2s; cursor: pointer;">
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
    sidebar.style.left = isMenuOpen ? "-260px" : "0px";
    isMenuOpen = !isMenuOpen;
}

function calculateExamCountdown() {
    const examDate = new Date("November 25, 2026").getTime(); 
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
        localStorage.setItem("sft_username", nameInput); // Save user session
        showDashboard(nameInput);
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

function showDashboard(username) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("home-page").style.display = "block";
    document.getElementById("user-display").textContent = username;
    document.getElementById("sidebar-username").textContent = username;
    document.querySelector(".menu-open-btn").style.display = "block"; 
    
    generateLessonsDashboard();
    calculateExamCountdown();
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
        userAnswers = [];
        clearInterval(timerInterval);
        
        document.getElementById("home-page").style.display = "none";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("quiz-page").style.display = "block";
        
        loadQuestion();
        startTimer();
    } else {
        alert("📊 මෙම පාඩමට තවමත් ප්‍රශ්න ඇතුළත් කර නොමැත! ළඟදීම බලාපොරොත්තු වන්න.");
    }
}

function loadQuestion() {
    document.getElementById("progress").innerHTML = `Question ${currentQuestion + 1} / ${questions.length}`;
    let progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progressPercentage + "%";

    let q = questions[currentQuestion];
    let html = `<div class="question"><h3 style="margin-bottom:15px; color:#1e293b; text-align:left;">${q.question}</h3>`;

    q.options.forEach((option, index) => {
        html += `
        <label class="option-label" id="label-${index}" onclick="highlightOption(${index})" style="display:flex; align-items:center; transition:0.2s; margin-bottom:10px;">
            <input type="radio" name="answer" value="${index}" style="margin-right:12px; transform:scale(1.2); display:none;">
            <span>${index + 1}. ${option}</span>
        </label>
        `;
    });

    html += `</div>`;
    document.getElementById("quiz").innerHTML = html;
}

// Option එකක් සිලෙක්ට් කරාම වෙනස් වෙන ලස්සන Style එක
function highlightOption(index) {
    const labels = document.querySelectorAll('.option-label');
    labels.forEach(label => {
        label.style.background = "#f8fafc";
        label.style.borderColor = "#e2e8f0";
        label.style.color = "#1e293b";
    });
    
    const activeLabel = document.getElementById(`label-${index}`);
    activeLabel.style.background = "#ecebbd";
    activeLabel.style.borderColor = "#7c3aed";
    
    const radio = activeLabel.querySelector('input[type="radio"]');
    radio.checked = true;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("කරුණාකර ඉදිරියට යාමට පෙර පිළිතුරක් තෝරන්න!");
        return;
    }

    let answerVal = parseInt(selectedOption.value);
    userAnswers.push(answerVal); // Store answer

    if (answerVal === questions[currentQuestion].answer) {
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
        document.getElementById("timer").textContent = 
            (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);

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

    let reviewHtml = `<div style="margin-top:20px; max-height:250px; overflow-y:auto; text-align:left; padding:5px;">`;
    
    questions.forEach((q, i) => {
        let isCorrect = userAnswers[i] === q.answer;
        reviewHtml += `
            <div style="padding:10px; border-radius:8px; margin-bottom:8px; background:${isCorrect ? '#d1fae5' : '#fee2e2'}; border-left:5px solid ${isCorrect ? '#10b981' : '#ef4444'}">
                <p style="font-size:13px; font-weight:bold;">${i+1}. ${q.question}</p>
                <p style="font-size:12px; color:#475569;">ඔයාගේ පිළිතුර: ${q.options[userAnswers[i]] || 'නොමැත'} ${isCorrect ? '✅' : '❌'}</p>
                ${!isCorrect ? `<p style="font-size:12px; color:#059669; font-weight:500;">නිවැරදි පිළිතුර: ${q.options[q.answer]}</p>` : ''}
            </div>
        `;
    });
    reviewHtml += `</div>`;

    document.getElementById("result").innerHTML = `
        <div style="font-size:18px; font-weight:bold; color:#7c3aed; margin-bottom:15px;">Final Score: ${score} / ${questions.length}</div>
        <p style="font-size:14px; font-weight:500; color:#1e293b;">ප්‍රශ්න පත්‍රයේ විවරණය (Review):</p>
        ${reviewHtml}
    `;
}

function backToHome() {
    clearInterval(timerInterval);
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("home-page").style.display = "block";
}

// Modal Functions
function showSidebarModal(type) {
    if (isMenuOpen) toggleMenu();
    const modal = document.getElementById("info-modal");
    const contentBox = document.getElementById("modal-body-content");
    let html = "";
    if (type === 'about') {
        html = `<h2>ℹ️ About Owner</h2><p style="margin-top:14px; line-height:1.5;">Welcome to <b>SFT Meetare</b>! Created by Adeesha Lakshitha to help Tech stream students.</p>`;
    } else if (type === 'review') {
        html = `<h2>⭐ Reviews</h2><textarea id="feedback-text" style="width:100%; height:80px; margin:15px 0; padding:10px;" placeholder="Write review..."></textarea><button onclick="alert('Thank you!')" class="action-btn">Submit</button>`;
    } else if (type === 'privacy') {
        html = `<h2>🔒 Privacy Policy</h2><p style="margin-top:14px; font-size:12px;">We use Google AdSense cookies to show optimized ads for students.</p>`;
    } else if (type === 'terms') {
        html = `<h2>📜 Terms</h2><p style="margin-top:14px; font-size:12px;">Content is strictly for educational purposes.</p>`;
    }
    contentBox.innerHTML = html;
    modal.style.display = "block";
}
function closeSidebarModal() { document.getElementById("info-modal").style.display = "none"; }
