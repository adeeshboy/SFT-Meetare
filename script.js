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

// --- SFT LESSONS WITH MATCHING EMOJIS (KEEP IN SINHALA) ---
const sftLessonsList = {
    1: { name: "01. මිනුම් විද්‍යාව හා පරිමාණය", emoji: "📐" },
    2: { name: "02. මූලික ඒකක හා මූලික උපකරණ", emoji: "🔬" },
    3: { name: "03. ගණිතකරණ සංකල්පය", emoji: "🧮" },
    4: { name: "04.1. සෛලීය සංවිධානයක් සහිත ජීවීන්", emoji: "🦠" },
    5: { name: "05. බලය", emoji: "🏋️‍♂️" },
    6: { name: "06. කාර්යය, ශක්තිය, බලය (යාන්ත්‍රිකව)", emoji: "⚙️" },
    7: { name: "07. ත්‍රිකෝණමිතික අනුපාත", emoji: "📈" },
    8: { name: "08. ප්‍රකාශ විද්‍යාව", emoji: "🔍" },
    9: { name: "09. විද්‍යුතය", emoji: "⚡" },
    10: { name: "10.  තාපය", emoji: "🔥" },
    11: { name: "11. තාප රසායනය", emoji: "🧪" },
    12: { name: "12. විද්‍යුත් රසායනය", emoji: "🔋" },
    13: { name: "13. පොලිමර", emoji: "🧬" },
    14: { name: "14. ඇග්‍රෝඩර්මා", emoji: "🌱" },
    15: { name: "15. පෘෂ්ඨීය යාන්ත්‍රික ගුණ", emoji: "💧" },
    16: { name: "16. තරංග", emoji: "🌊" },
    17: { name: "17. රසායනික කර්මාන්ත", emoji: "🏭" },
    18: { name: "18. ස්වභාවික නිෂ්පාදන", emoji: "🥥" },
    19: { name: "19. ඛණ්ඩාංක ජ්‍යාමිතිය", emoji: "🗺️" },
    20: { name: "20. සංඛ්‍යානය", emoji: "📊" },
    21: { name: "21. පරිගණක පද්ධතිය හා උපාංග", emoji: "💻" },
    22: { name: "22. OS (මෙහෙයුම් පද්ධති)", emoji: "💽" },
    23: { name: "23. යෙදුම් මෘදුකාංග", emoji: "📱" },
    24: { name: "24. අන්තර්ජාලය", emoji: "🌐" }
};

// --- PAPERS LIST (KEEP IN SINHALA) ---
const papersList = [
    { id: "p1", title: "2024 A/L SFT පසුගිය විභාග ප්‍රශ්න පත්‍රය", emoji: "📝" },
    { id: "p2", title: "2025 A/L SFT පසුගිය විභාග ප්‍රශ්න පත්‍රය", emoji: "📜" },
    { id: "p3", title: "SFT ආදර්ශ ප්‍රශ්න පත්‍රය - 01", emoji: "💎" }
];

const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');

function enterDashboard(displayName) {
    document.getElementById('user-display-name').innerText = displayName;
    loginPage.classList.remove('active');
    setTimeout(() => {
        homePage.classList.add('active');
        generateDashboard();
    }, 400);
}

// --- GOOGLE AUTH ---
document.getElementById('google-login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then((result) => { enterDashboard(result.user.displayName); })
        .catch((error) => { alert("Google Authentication Error: " + error.message); });
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    enterDashboard(document.getElementById('username').value);
});

// View Switcher Tabs Logic
function switchView(viewType) {
    const syllabusSection = document.getElementById('section-syllabus');
    const papersSection = document.getElementById('section-papers');
    const gridLayout = document.getElementById('dashboard-grid');

    document.querySelectorAll('.switch-tab-btn').forEach(btn => btn.classList.remove('active'));

    if (viewType === 'all') {
        document.getElementById('tab-all').classList.add('active');
        syllabusSection.style.display = "block";
        papersSection.style.display = "block";
        gridLayout.style.gridTemplateColumns = window.innerWidth > 992 ? "2.7fr 1.3fr" : "1fr";
    } else if (viewType === 'syllabus') {
        document.getElementById('tab-syllabus').classList.add('active');
        syllabusSection.style.display = "block";
        papersSection.style.display = "none";
        gridLayout.style.gridTemplateColumns = "1fr";
    } else if (viewType === 'papers') {
        document.getElementById('tab-papers').classList.add('active');
        syllabusSection.style.display = "none";
        papersSection.style.display = "block";
        gridLayout.style.gridTemplateColumns = "1fr";
    }
}

// Generate Dashboard Elements
function generateDashboard() {
    const lessonsContainer = document.getElementById('lessons-container');
    lessonsContainer.innerHTML = "";
    for(let i = 1; i <= 24; i++) {
        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <span class="box-emoji">${sftLessonsList[i].emoji}</span>
            <h3>${sftLessonsList[i].name}</h3>
        `;
        box.onclick = () => startQuiz(i, 'syllabus');
        lessonsContainer.appendChild(box);
    }

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

    const questions = [{ q: `Sample MCQ Question for: [${titleName}]?`, options: ["Option A", "Option B", "Option C (Correct)", "Option D"], correct: 2 }];

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

// Password Toggle & Countdown Logic
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
