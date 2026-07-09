// ==========================================
// SFT MEETARE - OPTIMIZED CORE JAVASCRIPT
// Developed by Adeesha Lakshitha
// Optimized for Production & Security
// ==========================================

// --- App State Management ---
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 0;
let userAnswers = [];
let selectedLessonQuestions = [];
let selectedLessonTitle = "";

// --- Security: Simple Base64 Obfuscation for Answers ---
const decodeAnswer = (encoded) => parseInt(atob(encoded));
const encodeAnswer = (num) => btoa(num.toString());

// --- Core Data: Lessons List ---
const sftLessons = [
    { id: 1, title: "01. තාක්ෂණවේදය සඳහා ගණිතය" },
    { id: 2, title: "02. දත්ත නිරූපණය සහ සංඛ්‍යා පද්ධති" },
    { id: 3, title: "03. පරිගණක පද්ධති සංරචක සහ මෙහෙයුම් පද්ධති" },
    { id: 4, title: "04. තාක්ෂණවේදය සඳහා මූලික භෞතික විද්‍යාව" },
    { id: 5, title: "05. යාන්ත්‍ර විද්‍යාව" },
    { id: 6, title: "06. පදාර්ථයේ යාන්ත්‍රික ගුණ" },
    { id: 7, title: "07. තාපය සහ තාප ගති විද්‍යාව" },
    { id: 8, title: "08. තරංග සහ ආලෝකය" },
    { id: 9, title: "09. ස්ථිති විද්‍යුත් සහ ධාරා විද්‍යුත් ක්ෂේත්‍ර" },
    { id: 10, title: "10. චුම්බක ක්ෂේත්‍ර" },
    { id: 11, title: "11. ඉලෙක්ට්‍රොනික විද්‍යාව" },
    { id: 12, title: "12. රසායන විද්‍යාවේ මූලික සංකල්ප" },
    { id: 13, title: "13. කාබනික රසායනය සහ බහුඅවයව" },
    { id: 14, title: "14. කර්මාන්ත සහ පාරිසරික රසායනය" },
    { id: 15, title: "15. ජීව විද්‍යාවේ මූලික කරුණු" },
    { id: 16, title: "16. ක්ෂුද්‍රජීව විද්‍යාව" },
    { id: 17, title: "17. ජෛව තාක්ෂණය" },
    { id: 18, title: "18. ආහාර තාක්ෂණවේදය" },
    { id: 19, title: "19. කෘෂිකාර්මික තාක්ෂණවේදය" },
    { id: 20, title: "20. පාරිසරික කළමනාකරණය" },
    { id: 21, title: "21. තොරතුරු සන්නිවේදන තාක්ෂණය" },
    { id: 22, title: "22. දත්ත සමුදාය කළමනාකරණ පද්ධති" },
    { id: 23, title: "23. වෙබ් අඩවි නිර්මාණය" },
    { id: 24, title: "24. ක්‍රමලේඛන මූලධර්ම" },
    { id: 25, title: "25. පාරිසරික සමතුලිතතාවය සහ තිරසාර සංවර්ධනය" }
];

// --- Core Data: Questions Matrix ---
const allQuestions = [
    // LESSON 1
    { id: 1, lessonId: 1, text: "පහත දැක්වෙන ප්‍රකාශ අතුරින් සත්‍ය ප්‍රකාශය කුමක්ද?", options: ["SFT යනු කලාවකි", "SFT යනු තාක්ෂණවේදය සඳහා විද්‍යාවයි", "SFT යනු වාණිජ විෂයකි", "ඉහත කිසිවක් නොවේ"], answer: "Mg==" }, // "2" encoded
    { id: 2, lessonId: 1, text: "SI ඒකක ක්‍රමයට අනුව මූලික ඒකක ගණන කොපමණද?", options: ["5", "6", "7", "8"], answer: "Mw==" }, // "3" encoded
    // LESSON 2
    { id: 3, lessonId: 2, text: "දශම සංඛ්‍යා පද්ධතියේ (Decimal) පාදය කුමක්ද?", options: ["2", "8", "10", "16"], answer: "Mw==" } // "3" encoded
];

// --- DOM Elements & Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    calculateExamCountdown();
    setInterval(calculateExamCountdown, 60000); // විනාඩියෙන් විනාඩියට යාවත්කාලීන වේ

    // ස්වයංක්‍රීය පුරනය වීම් පරීක්ෂාව (Remember Me / Session)
    const savedUser = localStorage.getItem("sft_username");
    if (savedUser) {
        showDashboard(savedUser);
    } else {
        showPage("login-page");
    }
}

// --- Navigation Helper (HTML IDs වලට ගැළපෙන පරිදි සකසා ඇත) ---
function showPage(pageId) {
    const pages = ["login-page", "home-page", "quiz-page", "result-box"];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === pageId) ? "block" : "none";
    });
    
    // Sidebar එක වසා දැමීම
    const sidebar = document.getElementById("sidebar");
    if(sidebar) sidebar.classList.remove("active");
}

// --- Authentication (Password ලොගින් එක) ---
function checkLogin() {
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");
    const rememberMe = document.getElementById("remember-me").checked;

    if (!usernameInput) {
        alert("කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.");
        return;
    }

    if (passwordInput === "1234") {
        if (errorMsg) errorMsg.style.display = "none";
        
        if (rememberMe) {
            localStorage.setItem("sft_username", usernameInput);
        }
        
        showDashboard(usernameInput);
    } else {
        if (errorMsg) errorMsg.style.display = "block";
    }
}

// --- Firebase සාර්ථකව පුරනය වූ පසු (Firebase Interface) ---
window.handleSuccessfulLogin = function(user) {
    showDashboard(user.displayName, user.photoURL);
};

// --- Dashboard පාලනය ---
function showDashboard(name, avatarUrl = "") {
    showPage("home-page");
    
    document.getElementById("user-display").innerText = name;
    document.getElementById("sidebar-username").innerText = name;
    
    // මෙනු සහ ලොගවුට් බොත්තම් පෙන්වීම
    document.querySelector(".menu-open-btn").style.display = "block";
    document.getElementById("firebase-logout-btn").style.display = "block";

    // ප්‍රෝෆයිල් පින්තූරය සැකසීම
    const imgTag = document.getElementById("sidebar-user-img");
    const avatarFallback = document.getElementById("profile-avatar-fallback");
    if (avatarUrl && imgTag && avatarFallback) {
        imgTag.src = avatarUrl;
        imgTag.style.display = "block";
        avatarFallback.style.display = "none";
    }

    generateLessonsDashboard();
}

// --- පාඩම් මාලාව Dashboard එකට එකතු කිරීම ---
window.generateLessonsDashboard = function() {
    const container = document.getElementById("lessons-container");
    if (!container) return;
    container.innerHTML = "";

    sftLessons.forEach(lesson => {
        const count = allQuestions.filter(q => q.lessonId === lesson.id).length;
        const card = document.createElement("div");
        card.className = "dashboard-card";
        card.style.cssText = "background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); cursor: pointer; border-left: 5px solid #7c3aed; margin-bottom: 15px; transition: transform 0.2s;";
        
        card.innerHTML = `
            <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 16px;">${lesson.title}</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b;">${count} ප්‍රශ්න ඇතුළත් වේ</p>
        `;
        
        card.onclick = () => selectLesson(lesson.id, lesson.title);
        card.onmouseenter = () => card.style.transform = "translateY(-3px)";
        card.onmouseleave = () => card.style.transform = "translateY(0)";
        
        container.appendChild(card);
    });
};

// --- Quiz Engine ---
function selectLesson(lessonId, lessonTitle) {
    selectedLessonTitle = lessonTitle;
    selectedLessonQuestions = allQuestions.filter(q => q.lessonId === lessonId);
    
    if (selectedLessonQuestions.length === 0) {
        alert("මෙම පාඩම සඳහා ප්‍රශ්න තවමත් ඇතුළත් කර නැත.");
        return;
    }
    
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(selectedLessonQuestions.length).fill(null);
    timeLeft = selectedLessonQuestions.length * 60; // එක් ප්‍රශ්නයකට තත්පර 60 බැගින්
    
    showPage("quiz-page");
    document.getElementById("quizTopic-title") ? document.getElementById("quizTopic-title").innerText = lessonTitle : document.getElementById("quiz-topic-title").innerText = lessonTitle;
    
    startTimer();
    renderQuestion();
}

function startTimer() {
    clearInterval(timerInterval);
    const timerEl = document.getElementById("timer");
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ කාලය අවසන් විය!");
            submitQuiz();
            return;
        }
        timeLeft--;
        const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const secs = (timeLeft % 60).toString().padStart(2, '0');
        if(timerEl) timerEl.innerText = `${mins}:${secs}`;
    }, 1000);
}

function renderQuestion() {
    if (currentQuestionIndex >= selectedLessonQuestions.length) return;
    
    const q = selectedLessonQuestions[currentQuestionIndex];
    
    // ප්‍රගතිය පෙන්වීම
    const totalQuestions = selectedLessonQuestions.length;
    document.getElementById("progress").innerText = `Question ${currentQuestionIndex + 1} / ${totalQuestions}`;
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = `${progressPercent}%`;

    const quizBox = document.getElementById("quiz");
    quizBox.innerHTML = `
        <h3 style="margin-top: 15px; margin-bottom: 20px; color: #0f172a; font-size: 18px;">${q.text}</h3>
        <div id="options-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
    `;
    
    const optionsContainer = document.getElementById("options-list");
    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.innerText = `${idx + 1}. ${opt}`;
        btn.style.cssText = "text-align: left; padding: 14px; border: 2px solid #e2e8f0; border-radius: 10px; background: white; font-size: 15px; cursor: pointer; font-weight: 500; transition: all 0.2s;";
        
        if (userAnswers[currentQuestionIndex] === idx + 1) {
            btn.style.borderColor = "#7c3aed";
            btn.style.background = "#f3e8ff";
        }

        btn.onclick = () => selectOption(idx + 1, btn);
        optionsContainer.appendChild(btn);
    });
    
    // බොත්තම් පාලනය
    const nextBtn = document.getElementById("next-btn");
    if (currentQuestionIndex === selectedLessonQuestions.length - 1) {
        nextBtn.innerText = "ප්‍රශ්නාවලිය අවසන් කරන්න 🏁";
    } else {
        nextBtn.innerText = "Next Question ➡️";
    }
}

function selectOption(optionNum, selectedBtn) {
    userAnswers[currentQuestionIndex] = optionNum;
    const buttons = document.getElementById("options-list").children;
    for (let btn of buttons) {
        btn.style.borderColor = "#e2e8f0";
        btn.style.background = "white";
    }
    selectedBtn.style.borderColor = "#7c3aed";
    selectedBtn.style.background = "#f3e8ff";
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === null) {
        alert("කරුණාකර ඉදිරියට යාමට පිළිතුරක් තෝරන්න.");
        return;
    }
    
    if (currentQuestionIndex < selectedLessonQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        submitQuiz();
    }
}

// --- ප්‍රශ්නාවලිය අවසන් කර ප්‍රතිඵල පෙන්වීම ---
function submitQuiz() {
    clearInterval(timerInterval);
    score = 0;
    
    selectedLessonQuestions.forEach((q, idx) => {
        const correctAns = isNaN(q.answer) ? decodeAnswer(q.answer) : parseInt(q.answer);
        if (userAnswers[idx] === correctAns) score++;
    });
    
    showPage("result-box");
    
    const total = selectedLessonQuestions.length;
    const percentage = Math.round((score / total) * 100);
    
    document.getElementById("result").innerHTML = `
        <div style="font-size: 50px; margin-bottom: 15px;">📊</div>
        <p style="font-size: 18px; color: #475569; margin-bottom: 5px;">Your Final Score</p>
        <h2 style="font-size: 36px; margin: 0 0 15px 0; color: #7c3aed;">${score} / ${total}</h2>
        <div style="font-size: 16px; font-weight: 600; padding: 8px 16px; background: #f1f5f9; display: inline-block; border-radius: 20px; color: #1e293b; margin-bottom:20px;">
            Success Rate: ${percentage}%
        </div>
        <div id="reviewContainer" style="text-align:left; max-height: 300px; overflow-y: auto; padding: 10px;"></div>
    `;
    
    renderReview();
}

function renderReview() {
    const reviewContainer = document.getElementById("reviewContainer");
    if (!reviewContainer) return;
    
    reviewContainer.innerHTML = selectedLessonQuestions.map((q, idx) => {
        const correctAns = isNaN(q.answer) ? decodeAnswer(q.answer) : parseInt(q.answer);
        const userAns = userAnswers[idx];
        const isCorrect = userAns === correctAns;
        
        return `
            <div style="padding: 12px; border-radius: 8px; border: 2px solid ${isCorrect ? '#22c55e' : '#ef4444'}; background: ${isCorrect ? '#f0fdf4' : '#fef2f2'}; margin-bottom: 10px;">
                <h4 style="margin: 0 0 8px 0;">Q${idx + 1}: ${q.text}</h4>
                <p style="margin: 4px 0; font-size:14px;">ඔබේ පිළිතුර: <span style="color:${isCorrect ? '#22c55e' : '#ef4444'}; font-weight:bold;">${userAns}. ${q.options[userAns-1]}</span></p>
                ${!isCorrect ? `<p style="margin: 4px 0; font-size:14px; color:#22c55e;">නිවැරදි පිළිතුර: <b>${correctAns}. ${q.options[correctAns-1]}</b></p>` : ''}
            </div>
        `;
    }).join("");
}

function backToHome() {
    clearInterval(timerInterval);
    showPage("home-page");
}

// --- Sidebar Menu පාලනය ---
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-280px";
    } else {
        sidebar.style.left = "0px";
    }
}

// --- A/L Exam Countdown (2027) ---
window.calculateExamCountdown = function() {
    const examDate = new Date("August 1, 2027 00:00:00").getTime();
    const now = new Date().getTime();
    const discrepancy = examDate - now;

    const remainingDays = Math.floor(discrepancy / (1000 * 60 * 60 * 24));
    const countDisplay = document.getElementById("days-count");

    if (countDisplay) {
        if (remainingDays > 0) {
            countDisplay.innerText = remainingDays;
        } else if (remainingDays === 0) {
            countDisplay.innerText = "Today!";
        } else {
            countDisplay.innerText = "Ended";
        }
    }
};

// --- Modal පාලනය ---
window.showSidebarModal = function(type) {
    const modal = document.getElementById("info-modal");
    const container = document.getElementById("modal-body-content");
    let template = "";
    
    switch (type) {
        case 'about':
            template = `<h2>ℹ️ About Owner</h2><p>SFT Meetare පද්ධතිය තාක්ෂණවේදය හදාරන දරුවන්ගේ දැනුම මිනුම වැඩිදියුණු කිරීමට නිපදවා ඇත.</p>`;
            break;
        case 'review':
            template = `<h2>⭐ User Reviews</h2><p>තවමත් සමාලෝචන ලැබී නොමැත.</p>`;
            break;
        case 'privacy':
            template = `<h2>🔒 Privacy Policy</h2><p>ඔබගේ දත්ත සුරක්ෂිතව පවතිනු ඇත.</p>`;
            break;
        case 'terms':
            template = `<h2>📜 Terms & Conditions</h2><p>අධ්‍යාපනික අරමුණු සඳහා පමණක් භාවිත කරන්න.</p>`;
            break;
    }
    container.innerHTML = template;
    modal.style.display = "block";
    toggleMenu();
};

window.closeSidebarModal = function() {
    document.getElementById("info-modal").style.display = "none";
};
