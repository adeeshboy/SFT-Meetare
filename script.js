// --- YOUR FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyBBtsKSoSb5_7_C1HNevt66IqeAQH8ASHs",
  authDomain: "sft-meetare.firebaseapp.com",
  projectId: "sft-meetare",
  storageBucket: "sft-meetare.firebasestorage.app",
  messagingSenderId: "333390520435",
  appId: "1:333390520435:web:3ee83fd2e5812160f84a06",
  measurementId: "G-NFFZSJHMM5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Global Variables
let currentSelectedSubject = "ALL";
let currentActiveTab = "all";

// --- OFFICIAL EXAM SYLLABUS MAPPED BY SUBJECTS ---
const sftLessonsList = {
    // ---- MATHS MODULE ----
    1: { name: "01. මිනුම් විද්‍යාව හා පරිමාණය", emoji: "📐", subject: "MATHS" },
    3: { name: "03. ගණිතකරණ සංකල්පය", emoji: "🧮", subject: "MATHS" },
    7: { name: "07. ත්‍රිකෝණමිතික අනුපාත", emoji: "📈", subject: "MATHS" },
    19: { name: "19. ඛණ්ඩාංක ජ්‍යාමිතිය", emoji: "🗺️", subject: "MATHS" },
    20: { name: "20. සංඛ්‍යානය", emoji: "📊", subject: "MATHS" },
    
    // ---- PHYSICS MODULE ----
    2: { name: "02. මූලික ඒකක හා මූලික උපකරණ", emoji: "🔬", subject: "PHYSICS" },
    5: { name: "05. බලය", emoji: "🏋️‍♂️", subject: "PHYSICS" },
    6: { name: "06. කාර්යය, ශක්තිය, බලය", emoji: "⚙️", subject: "PHYSICS" },
    8: { name: "08. ප්‍රකාශ විද්‍යාව", emoji: "🔍", subject: "PHYSICS" },
    9: { name: "09. විද්‍යුතය", emoji: "⚡", subject: "PHYSICS" },
    10: { name: "10. තාපය", emoji: "🔥", subject: "PHYSICS" },
    16: { name: "16. තරංග", emoji: "🌊", subject: "PHYSICS" },
    
    // ---- CHEMISTRY MODULE ----
    11: { name: "11. තාප රසායනය", emoji: "🧪", subject: "CHEMISTRY" },
    12: { name: "12. විද්‍යුත් රසායනය", emoji: "🔋", subject: "CHEMISTRY" },
    13: { name: "13. පොලිමර", emoji: "🧬", subject: "CHEMISTRY" },
    14: { name: "14. ඇග්‍රෝඩර්මා", emoji: "🌱", subject: "CHEMISTRY" },
    15: { name: "15. පෘෂ්ඨීය යාන්ත්‍රික ගුණ", emoji: "💧", subject: "CHEMISTRY" },
    17: { name: "17. රසායනික කර්මාන්ත", emoji: "🏭", subject: "CHEMISTRY" },
    18: { name: "18. ස්වභාවික නිෂ්පාදන", emoji: "🥥", subject: "CHEMISTRY" },
    25: { name: "25. පරිසර පද්ධති", emoji: "🌲", subject: "CHEMISTRY" },
    
    // ---- BIO MODULE ----
    41: { name: "04.1. සෛලීය සංවිධානයක් සහිත ජීවීන්", emoji: "🦠", subject: "BIO" },
    42: { name: "04.2. ශාක වර්ගීකරණය", emoji: "🌿", subject: "BIO" },
    43: { name: "04.3. සත්ව වර්ගීකරණය", emoji: "🦁", subject: "BIO" },
    44: { name: "04.4. ක්ෂුද්‍ර ජීවීන්", emoji: "🧫", subject: "BIO" },
    45: { name: "04.5. ක්ෂුද්‍ර ජීවීන් ආශ්‍රිත කර්මාන්ත", emoji: "🍞", subject: "BIO" },
    46: { name: "04.6. ජෛව පද්ධතිමය තාක්ෂණය", emoji: "🧬", subject: "BIO" },
    47: { name: "04.7. සත්ව කායික විද්‍යාව", emoji: "🫁", subject: "BIO" },
    48: { name: "04.8. ස්වාභාවික වනාන්තර", emoji: "🦊", subject: "BIO" },
    49: { name: "04.9. පාරිසරික ගැටළු", emoji: "⚠️", subject: "BIO" },
    
    // ---- ICT MODULE ----
    21: { name: "21. පරිගණක පද්ධතිය හා උපාංග", emoji: "💻", subject: "ICT" },
    22: { name: "22. OS (මෙහෙයුම් පද්ධති)", emoji: "💽", subject: "ICT" },
    23: { name: "23. යෙදුම් මෘදුකාංග", emoji: "📱", subject: "ICT" },
    24: { name: "24. අන්තර්ජාලය", emoji: "🌐", subject: "ICT" }
};

// --- PAPERS LIST ---
const papersList = [
    { id: "p1", title: "2024 A/L SFT Past Paper", emoji: "📝", subject: "ALL" },
    { id: "p2", title: "2025 A/L SFT Past Paper", emoji: "📜", subject: "ALL" },
    { id: "p3", title: "SFT Model Paper - 01", emoji: "💎", subject: "ALL" }
];

const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');

// --- NEW FEATURE: FIREBASE ROUTE GUARD SECURITY ---
auth.onAuthStateChanged((user) => {
    if (user) {
        // User logged in successfully
        document.getElementById('user-display-name').innerText = user.displayName || "Student";
        loginPage.classList.remove('active');
        homePage.classList.add('active');
        generateDashboard();
    } else {
        // User is signed out, force go to login page
        homePage.classList.remove('active');
        loginPage.classList.add('active');
    }
});

// Auth Handlers
document.getElementById('google-login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider).catch((error) => { alert("Google Sign-In Error: " + error.message); });
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mockName = document.getElementById('username').value;
    // Mocking a successful dashboard enter for standard forms
    document.getElementById('user-display-name').innerText = mockName;
    loginPage.classList.remove('active');
    homePage.classList.add('active');
    generateDashboard();
});

document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        location.reload(); // Hard refresh to secure auth states safely
    });
});

// View Switcher (Syllabus vs Papers Toolbar)
function switchView(viewType) {
    currentActiveTab = viewType;
    const syllabusSection = document.getElementById('section-syllabus');
    const papersSection = document.getElementById('section-papers');
    const filterBar = document.getElementById('subject-filter-bar');
    const gridLayout = document.getElementById('dashboard-grid');

    document.querySelectorAll('.switch-tab-btn').forEach(btn => btn.classList.remove('active'));

    if (viewType === 'all') {
        document.getElementById('tab-all').classList.add('active');
        syllabusSection.style.display = "block";
        papersSection.style.display = "block";
        filterBar.style.display = "flex";
        gridLayout.style.gridTemplateColumns = window.innerWidth > 992 ? "2.7fr 1.3fr" : "1fr";
    } else if (viewType === 'syllabus') {
        document.getElementById('tab-syllabus').classList.add('active');
        syllabusSection.style.display = "block";
        papersSection.style.display = "none";
        filterBar.style.display = "flex";
        gridLayout.style.gridTemplateColumns = "1fr";
    } else if (viewType === 'papers') {
        document.getElementById('tab-papers').classList.add('active');
        syllabusSection.style.display = "none";
        papersSection.style.display = "block";
        filterBar.style.display = "none"; // Hide subject categorizer on general global papers
        gridLayout.style.gridTemplateColumns = "1fr";
    }
    generateDashboard();
}

// --- NEW FEATURE: SUBJECT FILTER LOGIC ---
function filterSubject(subjectName) {
    currentSelectedSubject = subjectName;
    
    // Manage active visual state classes
    const buttons = document.querySelectorAll('.sub-filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    generateDashboard();
}

// Render Premium Dashboard Items Dynamically
function generateDashboard() {
    const lessonsContainer = document.getElementById('lessons-container');
    lessonsContainer.innerHTML = "";
    
    Object.keys(sftLessonsList).forEach(key => {
        const item = sftLessonsList[key];
        
        // Filter verification check
        if (currentSelectedSubject !== "ALL" && item.subject !== currentSelectedSubject) return;

        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <span class="box-emoji">${item.emoji}</span>
            <h3>${item.name}</h3>
            <span class="subject-tag tag-${item.subject.toLowerCase()}">${item.subject}</span>
        `;
        box.onclick = () => startQuiz(key, 'syllabus');
        lessonsContainer.appendChild(box);
    });

    const papersContainer = document.getElementById('papers-container');
    papersContainer.innerHTML = "";
    papersList.forEach(paper => {
        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <span class="box-emoji">${paper.emoji}</span>
            <h3>${paper.title}</h3>
        `;
        box.onclick = () => startQuiz(paper.id, 'paper');
        papersContainer.appendChild(box);
    });
}

// --- QUIZ ENGINE ---
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 20;

function startQuiz(id, type) {
    currentLesson = id;
    currentQuestionIndex = 0;
    score = 0;
    homePage.classList.remove('active');
    setTimeout(() => {
        document.getElementById('quiz-page').classList.add('active');
        loadQuestion(type);
    }, 400);
}

function loadQuestion(type) {
    clearInterval(timerInterval);
    timeLeft = 20;
    document.getElementById('time-sec').innerText = timeLeft;
    
    let titleName = (type === 'syllabus') ? sftLessonsList[currentLesson].name : (papersList.find(p => p.id === currentLesson)?.title || "MCQ Paper");

    const questions = [{ q: `Sample MCQ Question for [${titleName}]: Select the most accurate statement.`, options: ["Option A", "Option B", "Option C (Correct Answer)", "Option D"], correct: 2 }];

    if(currentQuestionIndex >= questions.length) { endQuiz(questions.length); return; }

    const currentQ = questions[currentQuestionIndex];
    document.getElementById('quiz-title').innerText = titleName;
    document.getElementById('question-text').innerText = currentQ.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = "";
    document.getElementById('next-btn').style.display = 'none';

    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx, currentQ.correct, btn);
        optionsContainer.appendChild(btn);
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-sec').innerText = timeLeft;
        if(timeLeft <= 0) { clearInterval(timerInterval); disableOptions(); document.getElementById('next-btn').style.display = 'block'; }
    }, 1000);
}

function checkAnswer(selected, correct, clickedBtn) {
    clearInterval(timerInterval);
    disableOptions();
    if(selected === correct) { clickedBtn.classList.add('correct'); score++; } 
    else { clickedBtn.classList.add('wrong'); document.querySelectorAll('.option-btn')[correct].classList.add('correct'); }
    document.getElementById('next-btn').style.display = 'block';
}

function disableOptions() { document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true); }
document.getElementById('next-btn').onclick = () => { currentQuestionIndex++; loadQuestion(); };

function endQuiz(totalQs) {
    document.getElementById('quiz-page').classList.remove('active');
    setTimeout(() => {
        document.getElementById('result-page').classList.add('active');
        document.getElementById('result-text').innerText = `You scored ${score} out of ${totalQs} questions!`;
    }, 400);
}

document.getElementById('back-home-btn').onclick = () => {
    document.getElementById('result-page').classList.remove('active');
    setTimeout(() => { homePage.classList.add('active'); }, 400);
};

// Password Toggle & Countdown Timer Logic
document.getElementById('toggle-password').addEventListener('click', function() {
    const passInput = document.getElementById('password');
    passInput.type = (passInput.type === 'password') ? 'text' : 'password';
    this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');
});

function updateCountdown() {
    const examDate = new Date("August 1, 2027 00:00:00").getTime();
    const difference = examDate - new Date().getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    document.getElementById("days-count").innerText = difference > 0 ? (days < 100 ? (days < 10 ? "00" + days : "0" + days) : days) : "000";
}
setInterval(updateCountdown, 1000); updateCountdown();

// Sidebar Navigation
const menuBtn = document.getElementById('menu-btn'), closeBtn = document.getElementById('close-btn'), sidebar = document.getElementById('sidebar'), overlay = document.getElementById('sidebar-overlay');
menuBtn.onclick = () => { sidebar.classList.add('open'); overlay.classList.add('open'); }
closeBtn.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
