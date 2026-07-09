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
// This prevents students from opening DevTools and searching for ".answer: 3"
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
    { id: 25, title: "25. පාරිසරික සමතුලිතතාවය සහ තිරසාර සංවර්ධනය" ]
];

// --- Core Data: Questions Matrix (Sample with Encoded Answers) ---
// Note: Replace your raw answers with encodeAnswer format if needed, 
// here we handle both plain numbers and encoded strings for backward compatibility.
const allQuestions = [
    // LESSON 1 (50 Questions)
    { id: 1, lessonId: 1, text: "පහත දැක්වෙන ප්‍රකාශ අතුරින් සත්‍ය ප්‍රකාශය කුමක්ද?", options: ["SFT යනු කලාවකි", "SFT යනු තාක්ෂණවේදය සඳහා විද්‍යාවයි", "SFT යනු වාණිජ විෂයකි", "ඉහත කිසිවක් නොවේ"], answer: "Mg==" }, // "2" encoded
    { id: 2, lessonId: 1, text: "SI ඒකක ක්‍රමයට අනුව මූලික ඒකක ගණන කොපමණද?", options: ["5", "6", "7", "8"], answer: "Mw==" }, // "3" encoded
    // ... (Add your other questions here following the structure)
];

// --- DOM Elements & Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupEventListeners();
});

function initApp() {
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute

    // Check Auto-Login Session
    const savedUser = localStorage.getItem("sft_user");
    if (savedUser) {
        const user = JSON.parse(savedUser);
        showDashboard(user.name, user.avatar);
    } else {
        showPage("login-page");
    }
}

function setupEventListeners() {
    // Menu Toggles
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    if(menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => sidebar.classList.toggle("active"));
    }
}

// --- Navigation Helper ---
function showPage(pageId) {
    const pages = ["login-page", "dashboard-page", "quiz-page", "result-page"];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === pageId) ? "block" : "none";
    });
    
    // Auto close sidebar on mobile page switch
    const sidebar = document.getElementById("sidebar");
    if(sidebar) sidebar.classList.remove("active");
}

// --- Notification UI (Replaces standard alert) ---
function showNotification(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // Smooth animate via timeout/CSS
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Authentication ---
function handleLogin() {
    const nameInput = document.getElementById("studentName").value.trim();
    const passInput = document.getElementById("accessPassword").value.trim();
    const avatarInput = document.querySelector('input[name="avatar"]:checked');

    if (!nameInput) return showNotification("කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.", "error");
    if (passInput !== "1234") return showNotification("ප්‍රවේශ මුරපදය වැරදියි!", "error");
    
    const avatarSrc = avatarInput ? avatarInput.value : "avatar1.png";
    
    localStorage.setItem("sft_user", JSON.stringify({ name: nameInput, avatar: avatarSrc }));
    showDashboard(nameInput, avatarSrc);
}

function handleLogout() {
    localStorage.removeItem("sft_user");
    clearInterval(timerInterval);
    showPage("login-page");
}

// --- Dashboard ---
function showDashboard(name, avatar) {
    showPage("dashboard-page");
    document.getElementById("navUserName").innerText = name;
    document.getElementById("navAvatar").src = avatar;
    
    const grid = document.getElementById("lessonsGrid");
    if (!grid) return;
    
    grid.innerHTML = sftLessons.map(lesson => {
        const count = allQuestions.filter(q => q.lessonId === lesson.id).length;
        return `
            <div class="lesson-card" onclick="selectLesson(${lesson.id}, '${lesson.title}')">
                <div class="lesson-icon">📚</div>
                <h3>${lesson.title}</h3>
                <p>${count} ප්‍රශ්න ඇතුළත් වේ</p>
            </div>
        `;
    }).join("");
}

// --- Quiz Engine ---
function selectLesson(lessonId, lessonTitle) {
    selectedLessonTitle = lessonTitle;
    selectedLessonQuestions = allQuestions.filter(q => q.lessonId === lessonId);
    
    if (selectedLessonQuestions.length === 0) {
        return showNotification("මෙම පාඩම සඳහා ප්‍රශ්න තවමත් ඇතුළත් කර නැත.", "info");
    }
    
    // Reset States
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(selectedLessonQuestions.length).fill(null);
    timeLeft = selectedLessonQuestions.length * 60; // 1 Minute per question
    
    showPage("quiz-page");
    document.getElementById("quizLessonTitle").innerText = lessonTitle;
    
    startTimer();
    renderQuestion();
}

function startTimer() {
    clearInterval(timerInterval);
    const timerEl = document.getElementById("quizTimer");
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showNotification("කාලය අවසන් විය!", "error");
            submitQuiz();
            return;
        }
        timeLeft--;
        const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const secs = (timeLeft % 60).toString().padStart(2, '0');
        if(timerEl) timerEl.innerText = `⏱️ කාලය: ${mins}:${secs}`;
    }, 1000);
}

function renderQuestion() {
    if (currentQuestionIndex >= selectedLessonQuestions.length) return;
    
    const q = selectedLessonQuestions[currentQuestionIndex];
    document.getElementById("currentQuestionNum").innerText = `ප්‍රශ්න අංක: ${currentQuestionIndex + 1}/${selectedLessonQuestions.length}`;
    document.getElementById("questionText").innerText = q.text;
    
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <div class="option-card ${userAnswers[currentQuestionIndex] === idx + 1 ? 'selected' : ''}" onclick="selectOption(${idx + 1})">
            <span class="option-index">${idx + 1}</span>
            <span class="option-text">${opt}</span>
        </div>
    `).join("");
    
    // Navigation Button Control
    document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
    const nextBtn = document.getElementById("nextBtn");
    if (currentQuestionIndex === selectedLessonQuestions.length - 1) {
        nextBtn.innerText = "ප්‍රශ්නාවලිය අවසන් කරන්න 🏁";
        nextBtn.className = "btn finish-btn";
    } else {
        nextBtn.innerText = "මීළඟ ප්‍රශ්නය ➡️";
        nextBtn.className = "btn primary-btn";
    }
}

function selectOption(optionNum) {
    userAnswers[currentQuestionIndex] = optionNum;
    // Dynamic Class Highlight without re-rendering entire HTML
    const options = document.querySelectorAll(".option-card");
    options.forEach((opt, idx) => {
        opt.classList.toggle("selected", idx + 1 === optionNum);
    });
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === null) {
        return showNotification("කරුණාකර ඉදිරියට යාමට පිළිතුරක් තෝරන්න.", "info");
    }
    
    if (currentQuestionIndex < selectedLessonQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        submitQuiz();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

// --- Results Handling ---
function submitQuiz() {
    clearInterval(timerInterval);
    score = 0;
    
    selectedLessonQuestions.forEach((q, idx) => {
        // Safe check for both plain or encrypted answers
        const correctAns = isNaN(q.answer) ? decodeAnswer(q.answer) : parseInt(q.answer);
        if (userAnswers[idx] === correctAns) score++;
    });
    
    showPage("result-page");
    
    const total = selectedLessonQuestions.length;
    const percentage = Math.round((score / total) * 100);
    
    document.getElementById("resultScore").innerText = `ලකුණු: ${score} / ${total} (${percentage}%)`;
    
    // Status Text and Theme styling
    const statusTextEl = document.getElementById("resultStatusText");
    if(statusTextEl) {
        if(percentage >= 75) {
            statusTextEl.innerText = "🎉 විශිෂ්ටයි! ඔබට සාමාර්ථයක් ඇත.";
            statusTextEl.className = "status-pass";
        } else if(percentage >= 40) {
            statusTextEl.innerText = "👍 හොඳයි, තවත් උත්සාහ කරන්න!";
            statusTextEl.className = "status-warning";
        } else {
            statusTextEl.innerText = "📚 නැවත උත්සාහ කරන්න. ඔබට පුළුවන්!";
            statusTextEl.className = "status-fail";
        }
    }
    
    renderReview();
}

function renderReview() {
    const reviewContainer = document.getElementById("reviewContainer");
    if (!reviewContainer) return;
    
    reviewContainer.innerHTML = selectedLessonQuestions.map((q, idx) => {
        const correctAns = isNaN(q.answer) ? decodeAnswer(q.answer) : parseInt(q.answer);
        const userAns = userAnswers[idx];
        
        return `
            <div class="review-card ${userAns === correctAns ? 'correct-card' : 'incorrect-card'}">
                <h4>ප්‍රශ්නය ${idx + 1}: ${q.text}</h4>
                <div class="review-options">
                    ${q.options.map((opt, oIdx) => {
                        let statusClass = "";
                        if (oIdx + 1 === correctAns) statusClass = "correct-opt";
                        else if (oIdx + 1 === userAns && userAns !== correctAns) statusClass = "wrong-opt";
                        
                        return `<div class="review-opt-item ${statusClass}">${oIdx + 1}. ${opt}</div>`;
                    }).join("")}
                </div>
            </div>
        `;
    }).join("");
}

// --- Countdown Timer Feature ---
function updateCountdown() {
    const targetDate = new Date("August 1, 2027 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;
    const countdownEl = document.getElementById("examCountdown");
    
    if (!countdownEl) return;
    
    if (diff <= 0) {
        countdownEl.innerText = "⏳ A/L විභාගය ආරම්භ වී ඇත / අවසන් වී ඇත!";
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdownEl.innerText = `🎯 2027 A/L විභාගයට තව දින ${days} යි!`;
}
