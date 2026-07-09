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
    // LESSON 1 (තාක්ෂණවේදය සඳහා ගණිතය)
    { id: 1, lessonId: 1, text: "පහත දැක්වෙන ප්‍රකාශ අතුරින් සත්‍ය ප්‍රකාශය කුමක්ද?", options: ["SFT යනු කලාවකි", "SFT යනු තාක්ෂණවේදය සඳහා විද්‍යාවයි", "SFT යනු වාණිජ විෂයකි", "ඉහත කිසිවක් නොවේ"], answer: "Mg==" }, // "2" encoded
    { id: 2, lessonId: 1, text: "SI ඒකක ක්‍රමයට අනුව මූලික ඒකක ගණන කොපමණද?", options: ["5", "6", "7", "8"], answer: "Mw==" }, // "3" encoded
    
    // LESSON 2 (දත්ත නිරූපණය සහ සංඛ්‍යා පද්ධති)
    { id: 3, lessonId: 2, text: "දශම සංඛ්‍යා පද්ධතියේ (Decimal) පාදය කුමක්ද?", options: ["2", "8", "10", "16"], answer: "Mw==" } // "3" encoded
];

// --- DOM Elements & Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupEventListeners();
});

function initApp() {
    updateCountdown();
    setInterval(updateCountdown, 60000); // විනාඩියෙන් විනාඩියට යාවත්කාලීන වේ

    // ස්වයංක්‍රීය පුරනය වීම් පරීක්ෂාව (Auto-Login Session)
    const savedUser = localStorage.getItem("sft_user");
    if (savedUser) {
        const user = JSON.parse(savedUser);
        showDashboard(user.name, user.avatar);
    } else {
        showPage("login-page");
    }
}

function setupEventListeners() {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    if(menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => sidebar.classList.toggle("active"));
    }

    // HTML එකේ inline onclick නැතිනම් බොත්තම් සඳහා Event Listeners එකතු කිරීම
    const loginBtn = document.getElementById("loginActionBtn");
    if (loginBtn) loginBtn.addEventListener("click", handleLogin);

    const logoutBtn = document.getElementById("firebase-logout-btn");
    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) prevBtn.addEventListener("click", prevQuestion);

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
    
    const backHomeBtn = document.getElementById("backHomeBtn");
    if (backHomeBtn) backHomeBtn.addEventListener("click", backToHome);
}

// --- Navigation Helper ---
function showPage(pageId) {
    const pages = ["login-page", "dashboard-page", "quiz-page", "result-page"];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === pageId) ? "block" : "none";
    });
    
    const sidebar = document.getElementById("sidebar");
    if(sidebar) sidebar.classList.remove("active");
}

// --- Notification UI ---
function showNotification(message, type = "info") {
    // පද්ධතියේ වෙනත් alert ඇත්නම් ඒවා වෙනුවට ලස්සන custom toast එකක් පෙන්වීම
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.style.cssText = "position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;
    toast.style.cssText = `padding: 12px 24px; border-radius: 8px; color: white; font-weight: bold; background: ${type === 'error' ? '#ef4444' : '#7c3aed'}; opacity: 0; transition: opacity 0.3s ease;`;
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    setTimeout(() => toast.style.opacity = "1", 50);
    
    setTimeout(() => {
        toast.style.opacity = "0";
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
    
    const avatarSrc = avatarInput ? avatarInput.value : "👨‍🎓";
    
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
    
    const navUserName = document.getElementById("navUserName");
    const navAvatar = document.getElementById("navAvatar");
    
    if (navUserName) navUserName.innerText = name;
    if (navAvatar) {
        if (avatar.includes("http") || avatar.includes(".png")) {
            navAvatar.src = avatar;
            navAvatar.style.display = "block";
        } else {
            // Emoji එකක් නම් පෙළක් ලෙස පෙන්වන්න
            navAvatar.parentNode.innerHTML = `<div id="navAvatar" style="font-size:30px;">${avatar}</div>`;
        }
    }
    
    const grid = document.getElementById("lessonsGrid");
    if (!grid) return;
    
    grid.innerHTML = sftLessons.map(lesson => {
        const count = allQuestions.filter(q => q.lessonId === lesson.id).length;
        return `
            <div class="lesson-card" onclick="selectLesson(${lesson.id}, '${lesson.title}')" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); cursor: pointer; border-left: 5px solid #7c3aed; margin-bottom:12px; transition: transform 0.2s;">
                <div class="lesson-icon" style="font-size: 24px; margin-bottom: 8px;">📚</div>
                <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size:16px;">${lesson.title}</h3>
                <p style="margin: 0; font-size: 13px; color: #64748b;">${count} ප්‍රශ්න ඇතුළත් වේ</p>
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
    
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(selectedLessonQuestions.length).fill(null);
    timeLeft = selectedLessonQuestions.length * 60; // එක් ප්‍රශ්නයකට විනාඩිය බැගින්
    
    showPage("quiz-page");
    const titleEl = document.getElementById("quizLessonTitle");
    if (titleEl) titleEl.innerText = lessonTitle;
    
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
    
    const progressEl = document.getElementById("currentQuestionNum");
    if (progressEl) progressEl.innerText = `ප්‍රශ්න අංක: ${currentQuestionIndex + 1}/${selectedLessonQuestions.length}`;
    
    const textEl = document.getElementById("questionText");
    if (textEl) textEl.innerText = q.text;
    
    const optionsContainer = document.getElementById("optionsContainer");
    if (optionsContainer) {
        optionsContainer.innerHTML = q.options.map((opt, idx) => `
            <div class="option-card ${userAnswers[currentQuestionIndex] === idx + 1 ? 'selected' : ''}" 
                 onclick="selectOption(${idx + 1})" 
                 style="text-align: left; padding: 14px; border: 2px solid #e2e8f0; border-radius: 10px; background: white; font-size: 15px; cursor: pointer; margin-bottom: 8px; font-weight: 500; display: flex; gap: 10px; align-items: center;">
                <span class="option-index" style="background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-weight: bold;">${idx + 1}</span>
                <span class="option-text">${opt}</span>
            </div>
        `).join("");
    }
    
    // බොත්තම් පාලනය (Navigation)
    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
        if (currentQuestionIndex === selectedLessonQuestions.length - 1) {
            nextBtn.innerText = "ප්‍රශ්නාවලිය අවසන් කරන්න 🏁";
            nextBtn.className = "btn finish-btn";
        } else {
            nextBtn.innerText = "මීළඟ ප්‍රශ්නය ➡️";
            nextBtn.className = "btn primary-btn";
        }
    }
}

function selectOption(optionNum) {
    userAnswers[currentQuestionIndex] = optionNum;
    const options = document.querySelectorAll(".option-card");
    options.forEach((opt, idx) => {
        if (idx + 1 === optionNum) {
            opt.style.borderColor = "#7c3aed";
            opt.style.background = "#f3e8ff";
        } else {
            opt.style.borderColor = "#e2e8f0";
            opt.style.background = "white";
        }
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

function backToHome() {
    clearInterval(timerInterval);
    showPage("dashboard-page");
}

// --- Results Handling ---
function submitQuiz() {
    clearInterval(timerInterval);
    score = 0;
    
    selectedLessonQuestions.forEach((q, idx) => {
        const correctAns = isNaN(q.answer) ? decodeAnswer(q.answer) : parseInt(q.answer);
        if (userAnswers[idx] === correctAns) score++;
    });
    
    showPage("result-page");
    
    const total = selectedLessonQuestions.length;
    const percentage = Math.round((score / total) * 100);
    
    const scoreEl = document.getElementById("resultScore");
    if (scoreEl) scoreEl.innerText = `ලකුණු: ${score} / ${total} (${percentage}%)`;
    
    const statusTextEl = document.getElementById("resultStatusText");
    if(statusTextEl) {
        if(percentage >= 75) {
            statusTextEl.innerText = "🎉 විශිෂ්ටයි! ඔබට සාමාර්ථයක් ඇත.";
            statusTextEl.style.color = "#22c55e";
        } else if(percentage >= 40) {
            statusTextEl.innerText = "👍 හොඳයි, තවත් උත්සාහ කරන්න!";
            statusTextEl.style.color = "#eab308";
        } else {
            statusTextEl.innerText = "📚 නැවත උත්සාහ කරන්න. ඔබට පුළුවන්!";
            statusTextEl.style.color = "#ef4444";
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
        const isCorrect = userAns === correctAns;
        
        return `
            <div class="review-card" style="padding: 15px; border-radius: 8px; border: 2px solid ${isCorrect ? '#22c55e' : '#ef4444'}; background: ${isCorrect ? '#f0fdf4' : '#fef2f2'}; margin-bottom: 12px;">
                <h4 style="margin: 0 0 10px 0; color: #1e293b;">ප්‍රශ්නය ${idx + 1}: ${q.text}</h4>
                <div class="review-options" style="display:flex; flex-direction:column; gap:6px;">
                    ${q.options.map((opt, oIdx) => {
                        let style = "padding: 8px; border-radius: 6px; background: white; border: 1px solid #e2e8f0;";
                        if (oIdx + 1 === correctAns) {
                            style = "padding: 8px; border-radius: 6px; background: #dcfce7; border: 1px solid #22c55e; font-weight: bold; color: #166534;";
                        } else if (oIdx + 1 === userAns && !isCorrect) {
                            style = "padding: 8px; border-radius: 6px; background: #fee2e2; border: 1px solid #ef4444; color: #991b1b;";
                        }
                        
                        return `<div style="${style}">${oIdx + 1}. ${opt}</div>`;
                    }).join("")}
                </div>
            </div>
        `;
    }).join("");
}

// --- Countdown Timer Feature ---
function updateCountdown() {
    // 2027 උසස් පෙළ විභාගය ඉලක්ක කර දින ගණනය (2027 අගෝස්තු 1 දිනට සාපේක්ෂව)
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
