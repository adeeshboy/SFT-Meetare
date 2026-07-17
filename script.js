// ==========================================================================
// 🚀 SFT MEETARE - FINAL PRODUCTION READY CODE (WITH FIREBASE AUTH & API)
// ==========================================================================

// --- STATE VARIABLES ---
let currentSelectedSubject = "ALL";
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 120; 
let activeQuestionsList = []; 

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

const sftQuestionsDatabase = {
    1: [
        { q: "සිලින්ඩරයක වක්‍ර පෘෂ්ඨ වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["2 * pi * r * h", "pi * r^2 * h", "2 * pi * r", "pi * r * l"], correct: 0 },
        { q: "අරය 7cm වන ගෝලයක මතුපිට වර්ගඵලය සොයන්න.", options: ["154 cm^2", "616 cm^2", "308 cm^2", "44 cm^2"], correct: 1 }
    ]
    // (අවශ්‍ය පරිදි ප්‍රශ්න ඇතුළත් කරන්න)
};

const papersList = [
    { id: "p1", title: "2024 A/L SFT Past Paper", emoji: "📝" },
    { id: "p2", title: "2025 A/L SFT Past Paper", emoji: "📜" },
    { id: "p3", title: "SFT Model Paper - 01", emoji: "💎" }
];

// ==========================================
// 🔴 FIREBASE CONFIGURATION & AUTHENTICATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyBBtsKSoSb5_7_C1HNevt66IqeAQH8ASHs",
    authDomain: "sft-meetare.firebaseapp.com",
    projectId: "sft-meetare",
    storageBucket: "sft-meetare.firebasestorage.app",
    messagingSenderId: "333390520435",
    appId: "1:333390520435:web:3ee83fd2e5812160f84a06",
    measurementId: "G-NFFZSJHMM5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// App State Check (Firebase Auth Observer)
auth.onAuthStateChanged((user) => {
    if (user) {
        loginSuccess(user.displayName || "Student");
    } else {
        // Fallback for custom password login
        const savedUser = sessionStorage.getItem('sft_user');
        if (savedUser) {
            loginSuccess(savedUser);
        } else {
            showLoginPage();
        }
    }
});

function loginSuccess(username) {
    document.getElementById('user-display-name').innerText = username;
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
    generateDashboard();
    fetchPapers(); 
}

function showLoginPage() {
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');
}

// --- Real Google Login Event ---
document.getElementById('google-login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider).catch((error) => {
        alert("Google ගිණුම හරහා ඇතුළු වීමේදී ගැටළුවක්! Error: " + error.message);
    });
});

// --- Custom Password Login Event ---
document.getElementById('login-form').addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const usernameValue = document.getElementById('username').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    
    if (passwordValue === "1234") {
        sessionStorage.setItem('sft_user', usernameValue); 
        loginSuccess(usernameValue);
    } else {
        alert("වැරදි මුරපදයක්! (නැවත උත්සාහ කරන්න)");
    }
});

// --- Logout Button ---
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        sessionStorage.removeItem('sft_user');
        location.reload();
    });
});

// --- Toggle Password Visibility ---
document.getElementById('toggle-password').addEventListener('click', function() { 
    const p = document.getElementById('password'); 
    p.type = (p.type === 'password') ? 'text' : 'password'; 
    this.classList.toggle('fa-eye'); 
    this.classList.toggle('fa-eye-slash');
});

// ==========================================
// --- UI CONTROL & FILTERS ---
// ==========================================
function switchView(viewType) {
    const sSection = document.getElementById('section-syllabus');
    const pSection = document.getElementById('section-papers');
    const fBar = document.getElementById('subject-filter-bar');
    
    document.querySelectorAll('.switch-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${viewType}`).classList.add('active');
    
    if (viewType === 'all') { 
        sSection.style.display = "block"; pSection.style.display = "block"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'syllabus') { 
        sSection.style.display = "block"; pSection.style.display = "none"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'papers') { 
        sSection.style.display = "none"; pSection.style.display = "block"; fBar.style.display = "none"; 
    }
    generateDashboard();
    fetchPapers();
}

function filterSubject(sub) { 
    currentSelectedSubject = sub; 
    document.querySelectorAll('.sub-filter-btn').forEach(btn => btn.classList.remove('active'));
    if(window.event && window.event.target) window.event.target.classList.add('active');
    generateDashboard(); 
}

function generateDashboard() {
    const lContainer = document.getElementById('lessons-container'); 
    lContainer.innerHTML = "";
    
    Object.keys(sftLessonsList).forEach(key => {
        if (currentSelectedSubject !== "ALL" && sftLessonsList[key].subject !== currentSelectedSubject) return;
        const div = document.createElement('div'); div.className = 'lesson-box';
        div.innerHTML = `<span class="box-emoji">${sftLessonsList[key].emoji}</span><h3>${sftLessonsList[key].name}</h3>`;
        div.onclick = () => startQuiz(key, 'syllabus'); 
        lContainer.appendChild(div);
    });
}

// ==========================================
// --- API FETCHING & PAPER RENDERING ---
// ==========================================
async function fetchPapers() {
    const pContainer = document.getElementById('papers-container');
    const searchInput = document.getElementById('paper-search-input');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    pContainer.innerHTML = ""; 

    // 1. Local Papers List
    papersList.forEach(p => {
        if(query === "" || p.title.toLowerCase().includes(query)) {
            const div = document.createElement('div'); div.className = 'lesson-box';
            div.innerHTML = `<span class="box-emoji">${p.emoji}</span><h3>${p.title}</h3>`;
            div.onclick = () => startQuiz(p.id, 'paper'); 
            pContainer.appendChild(div);
        }
    });

    // 2. Fetch from Cloudflare Worker API
    if (query.length >= 3) { 
        pContainer.innerHTML += `<div id="api-loading" style="text-align:center; width:100%; color:#007bff; margin-top:20px;">🔄 "${query}" සඳහා API එකෙන් සොයමින්...</div>`;
        
        try {
            const response = await fetch(`https://pastpaperapi.dileepatechyt.workers.dev/search?q=${encodeURIComponent(query)}`);
            const apiData = await response.json();
            
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();

            let papersArray = [];
            if (Array.isArray(apiData)) {
                papersArray = apiData;
            } else if (apiData.data && Array.isArray(apiData.data)) {
                papersArray = apiData.data;
            } else if (apiData.results && Array.isArray(apiData.results)) {
                papersArray = apiData.results;
            }

            if (papersArray.length > 0) {
                papersArray.forEach(p => {
                    const div = document.createElement('div'); div.className = 'lesson-box';
                    
                    const paperTitle = p.title || p.name || "SFT Past Paper";
                    const paperUrl = p.url || p.link || "";

                    div.innerHTML = `
                        <div style="font-size: 10px; background: #1a2332; display: inline-block; padding: 3px 8px; border-radius: 4px; color: #9ca3af; margin-bottom: 5px; font-weight: bold;">WIKI PAPER</div>
                        <h3 style="font-size: 15px; margin-bottom: 15px;">${paperTitle}</h3>
                        <button onclick="downloadPaper('${paperUrl}', this)" class="btn-primary" style="border: none; cursor: pointer; display:inline-block; padding: 10px 15px; font-size: 14px; background:#001f3f; color:#fff; border-radius:8px; width:100%; text-align:center; border: 1px solid #004080;">
                            💻 ඇප් එක තුළින්ම කියවන්න
                        </button>
                    `;
                    pContainer.appendChild(div);
                });
            } else {
                 pContainer.innerHTML += `<p style='text-align:center; width:100%; color:#9ca3af; margin-top:15px;'>මෙම නමින් ප්‍රශ්න පත්‍ර හමුවුණේ නැත.</p>`;
            }
        } catch (e) {
            console.error("API Fetch Error:", e);
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();
            pContainer.innerHTML += `<p style='text-align:center; width:100%; color:#ff4d4d; margin-top:15px; font-size: 13px;'>API සම්බන්ධතා දෝෂයක්!</p>`;
        }
    }
}

// අලුත් ෆන්ක්ෂන් එක: බටන් එක එබුවම PDF ලින්ක් එක හොයාගෙන ඕපන් කරනවා
async function downloadPaper(originalUrl, btnElement) {
    const originalText = btnElement.innerHTML;
    
    btnElement.innerHTML = "⏳ කරුණාකර රැඳී සිටින්න...";
    btnElement.style.pointerEvents = "none";
    btnElement.style.opacity = "0.7";

    try {
        const response = await fetch(`https://pastpaperapi.dileepatechyt.workers.dev/dl?url=${encodeURIComponent(originalUrl)}`);
        const data = await response.json();

        if (data && data.links) {
            const linkKeys = Object.keys(data.links);
            if (linkKeys.length > 0) {
                const actualPdfUrl = data.links[linkKeys[0]];
                window.open(actualPdfUrl, '_blank');
            } else {
                alert("PDF ලින්ක් එක සොයාගැනීමට නොහැකි විය!");
            }
        } else {
            alert("API එකෙන් නිවැරදි දත්ත ලැබුණේ නැත!");
        }
    } catch (e) {
        console.error("Download Error:", e);
        alert("බාගත කිරීමේදී දෝෂයක්! අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කරන්න.");
    } finally {
        btnElement.innerHTML = originalText;
        btnElement.style.pointerEvents = "auto";
        btnElement.style.opacity = "1";
    }
}

// ==========================================
// --- DYNAMIC QUIZ ENGINE ---
// ==========================================
function startQuiz(id, type) {
    currentLesson = id; 
    currentQuestionIndex = 0; 
    score = 0;
    
    if (type === 'syllabus' && sftQuestionsDatabase[id]) {
        activeQuestionsList = sftQuestionsDatabase[id];
    } else {
        activeQuestionsList = [
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 01:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 0 },
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 02:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 1 },
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 03:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 2 }
        ];
    }

    document.getElementById('home-page').classList.remove('active');
    setTimeout(() => { 
        document.getElementById('quiz-page').classList.add('active'); 
        loadQuestion(type); 
    }, 400);
}

function loadQuestion() {
    clearInterval(timerInterval); 
    timeLeft = 120; 
    document.getElementById('time-sec').innerText = timeLeft;
    document.getElementById('next-btn').style.display = 'none'; 

    const currentQ = activeQuestionsList[currentQuestionIndex];
    document.getElementById('question-text').innerText = `(${currentQuestionIndex + 1}/${activeQuestionsList.length}) ${currentQ.q}`;
    
    const container = document.getElementById('options-container'); 
    container.innerHTML = "";
    
    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button'); 
        btn.className = 'option-btn'; 
        btn.innerText = opt;
        
        btn.onclick = () => { 
            clearInterval(timerInterval); 
            document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');
            
            if(idx === currentQ.correct) { 
                btn.classList.add('correct'); 
                score++; 
            } else { 
                btn.classList.add('wrong'); 
                container.children[currentQ.correct].classList.add('correct');
            } 
            document.getElementById('next-btn').style.display = 'block'; 
        };
        container.appendChild(btn);
    });
    
    timerInterval = setInterval(() => { 
        timeLeft--; 
        document.getElementById('time-sec').innerText = timeLeft; 
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');
            container.children[currentQ.correct].classList.add('correct'); 
            document.getElementById('next-btn').style.display = 'block'; 
        }
    }, 1000);
}

document.getElementById('next-btn').onclick = () => { 
    currentQuestionIndex++;
    if(currentQuestionIndex < activeQuestionsList.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-page').classList.remove('active'); 
        document.getElementById('result-page').classList.add('active'); 
        document.getElementById('result-text').innerText = `ඔබේ ලකුණු සංඛ්‍යාව: ${activeQuestionsList.length} න් ${score} කි!`; 
    }
};

document.getElementById('back-home-btn').onclick = () => { 
    document.getElementById('result-page').classList.remove('active'); 
    document.getElementById('home-page').classList.add('active'); 
};

// --- SIDEBAR & COUNTDOWN ---
document.getElementById('menu-btn').onclick = () => { 
    document.getElementById('sidebar').classList.add('open'); 
    document.getElementById('sidebar-overlay').classList.add('open'); 
};
document.getElementById('close-btn').onclick = () => { 
    document.getElementById('sidebar').classList.remove('open'); 
    document.getElementById('sidebar-overlay').classList.remove('open'); 
};

function updateCountdown() {
    const diff = new Date("August 1, 2027").getTime() - new Date().getTime();
    document.getElementById("days-count").innerText = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}
setInterval(updateCountdown, 1000); 
updateCountdown();
