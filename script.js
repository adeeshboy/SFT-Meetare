// ==========================================================================
// 🚀 SFT MEETARE - PREMIUM JAVASCRIPT ENGINE (COMPLETE & INTEGRATED)
// ==========================================================================

// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyBBtsKSoSb5_7_C1HNevt66IqeAQH8ASHs",
  authDomain: "sft-meetare.firebaseapp.com",
  projectId: "sft-meetare",
  storageBucket: "sft-meetare.firebasestorage.app",
  messagingSenderId: "333390520435",
  appId: "1:333390520435:web:3ee83fd2e5812160f84a06",
  measurementId: "G-NFFZSJHMM5"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// --- STATE VARIABLES ---
let currentSelectedSubject = "ALL";
let currentActiveTab = "all";
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 20;

// --- DATA LISTS ---
const sftLessonsList = {
    1: { name: "01. වර්ගඵලය හා පරිමාව", emoji: "📐", subject: "MATHS" },
    3: { name: "03. පයිතගරස් සම්බන්ධය", emoji: "🧮", subject: "MATHS" },
    7: { name: "07. ත්‍රිකෝණමිතික අනුපාත", emoji: "📈", subject: "MATHS" },
    19: { name: "19. ඛණ්ඩාංක ජ්‍යාමිතිය", emoji: "🗺️", subject: "MATHS" },
    20: { name: "20. සංඛ්‍යානය", emoji: "📊", subject: "MATHS" },
    2: { name: "02. මිනුම් ඒකක", emoji: "🔬", subject: "PHYSICS" },
    5: { name: "05. බලය", emoji: "🏋️‍♂️", subject: "PHYSICS" },
    6: { name: "06. කාර්යය, ශක්තිය, ජවය", emoji: "⚙️", subject: "PHYSICS" },
    8: { name: "08. භ්‍රමණ චලිතය", emoji: "🔄", subject: "PHYSICS" },
    9: { name: "09. විද්‍යුතය", emoji: "⚡", subject: "PHYSICS" },
    10: { name: "10. තාපය", emoji: "🔥", subject: "PHYSICS" },
    16: { name: "16. තරල", emoji: "🌊", subject: "PHYSICS" },
    11: { name: "11. තාප රසායනය", emoji: "🧪", subject: "CHEMISTRY" },
    12: { name: "12. චාලක රසායනය", emoji: "⏳", subject: "CHEMISTRY" },
    13: { name: "13. ජෛව පරමාණු", emoji: "🧬", subject: "CHEMISTRY" },
    14: { name: "14. බහුඅවයවික", emoji: "💎", subject: "CHEMISTRY" },
    15: { name: "15. පදාර්ථයේ යාන්ත්‍රික ගුණ", emoji: "🧱", subject: "CHEMISTRY" },
    17: { name: "17. රසායනික කර්මාන්ත", emoji: "🏭", subject: "CHEMISTRY" },
    18: { name: "18. ස්වභාවික නිෂ්පාදන", emoji: "🥥", subject: "CHEMISTRY" },
    25: { name: "25. පාරිසරික සමතුලිතතාව", emoji: "🌲", subject: "CHEMISTRY" },
    41: { name: "04.1. සෛල සංවිධානය", emoji: "🦠", subject: "BIO" },
    42: { name: "04.2. ශාක පටක", emoji: "🌿", subject: "BIO" },
    43: { name: "04.3. ජීවීන් වර්ගීකරණය", emoji: "🦁", subject: "BIO" },
    44: { name: "04.4. ක්ෂුද්‍ර ජීවීන්", emoji: "🧫", subject: "BIO" },
    45: { name: "04.5. ක්ෂුද්‍ර ජීවීන් ආශ්‍රිත කර්මාන්ත", emoji: "🍞", subject: "BIO" },
    46: { name: "04.6. පටක රෝපණය", emoji: "🌱", subject: "BIO" },
    47: { name: "04.7. ශාක වර්ගීකරණය", emoji: "🌾", subject: "BIO" },
    48: { name: "04.8. ස්වභාවික වනාන්තර", emoji: "🦊", subject: "BIO" },
    49: { name: "04.9. පෘෂ්ඨවංශීන් සහ අපෘෂ්ඨවංශීන්", emoji: "🐟", subject: "BIO" },
    21: { name: "21. පරිගණක පද්ධතිය", emoji: "💻", subject: "ICT" },
    22: { name: "22. OS", emoji: "💽", subject: "ICT" },
    23: { name: "23. යෙදුම් මෘදුකාංග", emoji: "📱", subject: "ICT" },
    24: { name: "24. අන්තර්ජාලය", emoji: "🌐", subject: "ICT" }
};

const papersList = [
    { id: "p1", title: "2024 A/L SFT Past Paper", emoji: "📝" },
    { id: "p2", title: "2025 A/L SFT Past Paper", emoji: "📜" },
    { id: "p3", title: "SFT Model Paper - 01", emoji: "💎" }
];

// --- AUTHENTICATION ---
auth.onAuthStateChanged((user) => {
    if (user) {
        // Name & Profile Picture Update
        document.getElementById('user-display-name').innerText = user.displayName || "Student";
        if(user.photoURL) {
            document.getElementById('user-profile-pic').src = user.photoURL;
        }

        document.getElementById('login-page').classList.remove('active');
        document.getElementById('home-page').classList.add('active');
        generateDashboard();
    } else {
        document.getElementById('home-page').classList.remove('active');
        document.getElementById('login-page').classList.add('active');
    }
});

document.getElementById('google-login-btn').addEventListener('click', () => auth.signInWithPopup(provider));
document.getElementById('login-form').addEventListener('submit', (e) => { e.preventDefault(); document.getElementById('login-page').classList.remove('active'); document.getElementById('home-page').classList.add('active'); generateDashboard(); });
document.getElementById('logout-btn').addEventListener('click', () => auth.signOut().then(() => location.reload()));

// --- UI CONTROL ---
function switchView(viewType) {
    const sSection = document.getElementById('section-syllabus'), pSection = document.getElementById('section-papers'), fBar = document.getElementById('subject-filter-bar');
    if (viewType === 'all') { sSection.style.display = "block"; pSection.style.display = "block"; fBar.style.display = "flex"; }
    else if (viewType === 'syllabus') { sSection.style.display = "block"; pSection.style.display = "none"; fBar.style.display = "flex"; }
    else if (viewType === 'papers') { sSection.style.display = "none"; pSection.style.display = "block"; fBar.style.display = "none"; }
    generateDashboard();
}

function filterSubject(sub) { currentSelectedSubject = sub; generateDashboard(); }

function generateDashboard() {
    const lContainer = document.getElementById('lessons-container'); lContainer.innerHTML = "";
    Object.keys(sftLessonsList).forEach(key => {
        if (currentSelectedSubject !== "ALL" && sftLessonsList[key].subject !== currentSelectedSubject) return;
        const div = document.createElement('div'); div.className = 'lesson-box';
        div.innerHTML = `<span class="box-emoji">${sftLessonsList[key].emoji}</span><h3>${sftLessonsList[key].name}</h3>`;
        div.onclick = () => startQuiz(key, 'syllabus'); lContainer.appendChild(div);
    });
    const pContainer = document.getElementById('papers-container'); pContainer.innerHTML = "";
    papersList.forEach(p => {
        const div = document.createElement('div'); div.className = 'lesson-box';
        div.innerHTML = `<span class="box-emoji">${p.emoji}</span><h3>${p.title}</h3>`;
        div.onclick = () => startQuiz(p.id, 'paper'); pContainer.appendChild(div);
    });
}

// --- QUIZ ENGINE ---
function startQuiz(id, type) {
    currentLesson = id; currentQuestionIndex = 0; score = 0;
    document.getElementById('home-page').classList.remove('active');
    setTimeout(() => { document.getElementById('quiz-page').classList.add('active'); loadQuestion(type); }, 400);
}

function loadQuestion(type) {
    clearInterval(timerInterval); timeLeft = 20; document.getElementById('time-sec').innerText = timeLeft;
    const questions = [{ q: "නිවැරදි පිළිතුර තෝරන්න:", options: ["පිළිතුර 1", "පිළිතුර 2", "පිළිතුර 3", "පිළිතුර 4"], correct: 2 }];
    const currentQ = questions[0];
    document.getElementById('question-text').innerText = currentQ.q;
    const container = document.getElementById('options-container'); container.innerHTML = "";
    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button'); btn.className = 'option-btn'; btn.innerText = opt;
        btn.onclick = () => { clearInterval(timerInterval); if(idx === currentQ.correct) { btn.classList.add('correct'); score++; } else { btn.classList.add('wrong'); } document.getElementById('next-btn').style.display = 'block'; };
        container.appendChild(btn);
    });
    timerInterval = setInterval(() => { timeLeft--; document.getElementById('time-sec').innerText = timeLeft; if(timeLeft <= 0) clearInterval(timerInterval); }, 1000);
}

document.getElementById('next-btn').onclick = () => { document.getElementById('quiz-page').classList.remove('active'); document.getElementById('result-page').classList.add('active'); document.getElementById('result-text').innerText = `Score: ${score}`; };
document.getElementById('back-home-btn').onclick = () => { document.getElementById('result-page').classList.remove('active'); document.getElementById('home-page').classList.add('active'); };

// --- MISC ---
document.getElementById('toggle-password').onclick = function() { const p = document.getElementById('password'); p.type = (p.type === 'password') ? 'text' : 'password'; };
function updateCountdown() { const diff = new Date("August 1, 2027").getTime() - new Date().getTime(); document.getElementById("days-count").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)); }
setInterval(updateCountdown, 1000);
document.getElementById('menu-btn').onclick = () => { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebar-overlay').classList.add('open'); };
document.getElementById('close-btn').onclick = () => { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebar-overlay').classList.remove('open'); };
