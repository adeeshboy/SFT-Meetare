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

// Initialize Firebase (Compat mode)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// --- SFT LESSONS LIST ---
const sftLessonsList = {
    1: "01. මිනුම් විද්‍යාව හා පරිමාණය",
    2: "02. මූලික ඒකක හා මූලික උපකරණ",
    3: "03. ගණිතකරණ සංකල්පය",
    4: "04.1. සෛලීය සංවිධානයක් සහිත ජීවීන්",
    5: "05. බලය",
    6: "06. කාර්යය, ශක්තිය, බලය (යාන්ත්‍රිකව)",
    7: "07. ත්‍රිකෝණමිතික අනුපාත",
    8: "08. ප්‍රකාශ විද්‍යාව",
    9: "09. විද්‍යුතය",
    10: "10. තාපය",
    11: "11. තාප රසායනය",
    12: "12. විද්‍යුත් රසායනය",
    13: "13. පොලිමර",
    14: "14. ඇග්‍රෝඩර්මා",
    15: "15. පෘෂ්ඨීය යාන්ත්‍රික ගුණ",
    16: "16. තරංග",
    17: "17. රසායනික කර්මාන්ත",
    18: "18. ස්වභාවික නිෂ්පාදන",
    19: "19. ඛණ්ඩාංක ජ්‍යාමිතිය - සරල රේඛා හා වෘත්ත ශ්‍රිත",
    20: "20. සංඛ්‍යානය",
    21: "21. පරිගණක පද්ධතිය හා උපාංග",
    22: "22. OS (මෙහෙයුම් පද්ධති)",
    23: "23. යෙදුම් මෘදුකාංග",
    24: "24. අන්තර්ජාලය"
};

// --- PAPERS LIST ---
const papersList = [
    { id: "p1", title: "2024 A/L SFT Past Paper" },
    { id: "p2", title: "2025 A/L SFT Past Paper" },
    { id: "p3", title: "SFT Model Paper - 01" }
];

// Pages Selection
const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');

// Function to Navigate to Dashboard after successful login
function enterDashboard(displayName) {
    document.getElementById('user-display-name').innerText = displayName;
    loginPage.classList.remove('active');
    setTimeout(() => {
        homePage.classList.add('active');
        generateDashboard();
    }, 400);
}

// --- GOOGLE SIGN IN WITH FIREBASE ---
document.getElementById('google-login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("Google Login Successful: ", user.displayName);
            enterDashboard(user.displayName); // Dashboard එකට යනවා Google Name එකත් එක්ක
        })
        .catch((error) => {
            console.error("Error during Google Login: ", error.message);
            alert("Google Login එකේ ගැටළුවක් පවතී. Firebase Console එකේ Google Sign-In සක්‍රීය කර ඇත්දැයි පරීක්ෂා කරන්න: " + error.message);
        });
});

// --- NORMAL EMAIL/PASSWORD LOGIN (BACKUP) ---
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredName = document.getElementById('username').value;
    enterDashboard(enteredName);
});

// Password Visibility Toggle
document.getElementById('toggle-password').addEventListener('click', function() {
    const passInput = document.getElementById('password');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        this.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passInput.type = 'password';
        this.classList.replace('fa-eye-slash', 'fa-eye');
    }
});

// --- HUGE ELEGANT COUNTDOWN TIMER ---
function updateCountdown() {
    const examDate = new Date("August 1, 2027 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = examDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        document.getElementById("days-count").innerText = days < 100 ? (days < 10 ? "00" + days : "0" + days) : days;
    } else {
        document.getElementById("days-count").innerText = "000";
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- SIDEBAR LOGIC ---
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

menuBtn.onclick = () => { sidebar.classList.add('open'); overlay.classList.add('open'); }
closeBtn.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

// --- GENERATE SYLLABUS & PAPERS ---
function generateDashboard() {
    const lessonsContainer = document.getElementById('lessons-container');
    lessonsContainer.innerHTML = "";
    for(let i = 1; i <= 24; i++) {
        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <i class="fas fa-book-open-reader"></i>
            <h3>${sftLessonsList[i]}</h3>
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
            <i class="fas fa-file-lines"></i>
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
    
    let titleName = "";
    if(type === 'syllabus') {
        titleName = sftLessonsList[currentLesson];
    } else {
        const pObj = papersList.find(p => p.id === currentLesson);
        titleName = pObj ? pObj.title : "Paper MCQ";
    }

    const questions = [
        { 
            q: `[${titleName}] සඳහා වන ආදර්ශ ප්‍රශ්නය - ප්‍රශ්න අංක 01?`, 
            options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C (නිවැරදි පිළිතුර)", "පිළිතුර D"], 
            correct: 2 
        }
    ];

    if(currentQuestionIndex >= questions.length) {
        endQuiz(questions.length);
        return;
    }

    const currentQ = questions[currentQuestionIndex];
    document.getElementById('quiz-title').innerText = titleName;
    document.getElementById('question-text').innerText = currentQ.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = "";
    document.getElementById('next-btn').style.display = 'none';

    currentQ.forEachOptions = currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx, currentQ.correct, btn);
        optionsContainer.appendChild(btn);
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-sec').innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            disableOptions();
            document.getElementById('next-btn').style.display = 'block';
        }
    }, 1000);
}

function checkAnswer(selected, correct, clickedBtn) {
    clearInterval(timerInterval);
    disableOptions();
    const optionsButtons = document.querySelectorAll('.option-btn');
    if(selected === correct) {
        clickedBtn.classList.add('correct');
        score++;
    } else {
        clickedBtn.classList.add('wrong');
        optionsButtons[correct].classList.add('correct');
    }
    document.getElementById('next-btn').style.display = 'block';
}

function disableOptions() {
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
}

document.getElementById('next-btn').onclick = () => { currentQuestionIndex++; loadQuestion(); };

function endQuiz(totalQs) {
    document.getElementById('quiz-page').classList.remove('active');
    setTimeout(() => {
        document.getElementById('result-page').classList.add('active');
        document.getElementById('result-text').innerText = `ඔබ ප්‍රශ්න ${totalQs} කින් ${score} ක් නිවැරදිව ලබා ගත්තා!`;
    }, 400);
}

document.getElementById('back-home-btn').onclick = () => {
    document.getElementById('result-page').classList.remove('active');
    setTimeout(() => { homePage.classList.add('active'); }, 400);
};
