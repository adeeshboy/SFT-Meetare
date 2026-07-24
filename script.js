// ==========================================================================
// 🚀 SFT MEETARE - FINAL PRODUCTION READY CODE (WITH ADMIN PANEL & MCQ DB)
// ==========================================================================

// --- STATE VARIABLES ---
let currentSelectedSubject = "ALL";
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 120; 
let activeQuestionsList = []; 

// Admin Email Validation
const ADMIN_EMAIL = "adeeshboy0@gmail.com".toLowerCase();

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

// --- FULL SFT MCQ QUESTIONS DATABASE ---
const sftQuestionsDatabase = {
    1: [
    { q: "අරය 6 cm වන ඝන ලෝහමය ගෝලයක් සම්පූර්ණයෙන් උණු කර, පතුලේ අරය 2 cm හා සිරස් උස 3 cm වන කුඩා ඝන කේතු සාදන්නේ නම්, සෑදිය හැකි උපරිම කේතු ගණන කීයද?", options: ["36", "72", "144", "18"], correct: 1 },
    { q: "වෘත්තයක අරය 10% කින් වැඩි කළ හොත්, එහි වර්ගඵලය වැඩි වන ප්‍රතිශතය කොපමණද?", options: ["10%", "20%", "21%", "100%"], correct: 2 },
    { q: "හරස්කඩ වර්ගඵලය 45 cm² වන ඒකාකාර ප්‍රිස්මයක දිග 20 cm වේ. එහි පරිමාව කුමක්ද?", options: ["900 cm³", "450 cm³", "90 cm³", "9000 cm³"], correct: 0 },
    { q: "පතුලේ අරය 7 cm හා ආනත උස 10 cm වන ඝන කේතුවක මුළු පෘෂ්ඨ වර්ගඵලය කොපමණද? (π = 22/7)", options: ["220 cm²", "154 cm²", "374 cm²", "474 cm²"], correct: 2 },
    { q: "අරය 7 m සහ ගැඹුර 2 m වන සිලින්ඩරාකාර ටැංකියක අඩංගු කළ හැකි උපරිම ජල පරිමාව ලීටර (Liters) වලින් කොපමණද? (π = 22/7)", options: ["308 L", "308,000 L", "30,800 L", "154,000 L"], correct: 1 },
    { q: "සමාන්තර පාදවල දිග 12 cm හා 8 cm වන ද, එම පාද අතර ලම්බක දුර 5 cm වන ද ත්‍රපීසියමක වර්ගඵලය කුමක්ද?", options: ["100 cm²", "50 cm²", "480 cm²", "25 cm²"], correct: 1 },
    { q: "අරය 14 cm සහ කේන්ද්‍රික කෝණය 90° වන වෘත්ත ඛණ්ඩයක පරිමිතිය කොපමණද? (π = 22/7)", options: ["22 cm", "36 cm", "50 cm", "44 cm"], correct: 2 },
    { q: "අරය r වන ඝන අර්ධ ගෝලයක මුළු පෘෂ්ඨ වර්ගඵලය සෙවීම සඳහා නිවැරදි සූත්‍රය කුමක්ද?", options: ["2πr²", "3πr²", "4πr²", "(2/3)πr³"], correct: 1 },
    { q: "දිග, පළල සහ උස පිළිවෙළින් 8 cm, 6 cm සහ 4 cm වන ඝනකාභයකින් සම්පූර්ණයෙන් කපා ඉවත් කළ හැකි පැත්තක දිග 2 cm වන කුඩා ඝනක ගණන කීයද?", options: ["12", "24", "48", "96"], correct: 1 },
    { q: "කේතුවක පතුලේ අරය දෙගුණ කර එහි සිරස් උස අඩක් කළහොත්, එහි නව පරිමාව හා මුල් පරිමාව අතර අනුපාතය කුමක්ද?", options: ["1:1", "2:1", "4:1", "1:2"], correct: 1 },
    { q: "හරස්කඩ වර්ගඵලය 5 cm² වන නළයක් තුලින් තත්පරයට 10 cm වේගයකින් ජලය ගලා යයි. මිනිත්තුවකදී ගලා යන ජල පරිමාව ලීටර වලින් කොපමණද?", options: ["3 L", "30 L", "50 L", "300 L"], correct: 0 },
    { q: "වක්‍ර පෘෂ්ඨ වර්ගඵලය 440 cm² ද, උස 10 cm ද වන සෘජු වෘත්තාකාර සිලින්ඩරයක පතුලේ අරය කොපමණද? (π = 22/7)", options: ["7 cm", "14 cm", "21 cm", "3.5 cm"], correct: 0 },
    { q: "සමාන්තරාස්‍රයක ආධාරක පාදයේ දිග 15 cm හා එහි වර්ගඵලය 120 cm² වේ නම්, එහි ලම්බක උස කොපමණද?", options: ["6 cm", "8 cm", "10 cm", "12 cm"], correct: 1 },
    { q: "පදනම සමචතුරස්‍රාකාර වන පිරමීඩයක පදනමේ පැත්තක දිග 10 cm වේ. එහි සිරස් උස 12 cm නම්, පිරමීඩයේ පරිමාව කොපමණද?", options: ["1200 cm³", "600 cm³", "400 cm³", "300 cm³"], correct: 2 },
    { q: "අරය r වන ඝන අර්ධ ගෝලයක් මත, පතුලේ අරය r හා සිරස් උස h වන කේතුවක් හරියටම සවිකර ඇත. මෙම සංයුක්ත ඝනයේ මුළු පරිමාව කුමක්ද?", options: ["(1/3)πr²(2r + h)", "(1/3)πr²(r + h)", "(2/3)πr²(r + h)", "(1/3)πr²(r + 2h)"], correct: 0 },
    { q: "පැත්තක දිග 4 cm වන සමපාද ත්‍රිකෝණයක වර්ගඵලය කුමක්ද?", options: ["4√3 cm²", "8√3 cm²", "16√3 cm²", "12 cm²"], correct: 0 },
    { q: "පැත්තක දිග 14 cm වන සමචතුරස්‍රයක් තුළ හරියටම ස්පර්ශ වන සේ ඇඳිය හැකි විශාලතම වෘත්තයේ වර්ගඵලය කොපමණද? (π = 22/7)", options: ["196 cm²", "154 cm²", "44 cm²", "88 cm²"], correct: 1 },
    { q: "ගෝලයක අරය 10% කින් අඩු කළහොත්, එහි පරිමාව අඩුවන ආසන්න ප්‍රතිශතය කොපමණද?", options: ["10%", "20%", "27.1%", "30%"], correct: 2 },
    { q: "කේතුවක පරිමාව 12π cm³ වේ. එහි සිරස් උස 4 cm නම්, පතුලේ අරය කොපමණද?", options: ["3 cm", "4 cm", "6 cm", "9 cm"], correct: 0 },
    { q: "දිග 10 m වන ඇළක හරස්කඩ ත්‍රපීසියම් හැඩයක් ගනී. එහි පතුලේ පළල 2 m ද, මතුපිට ජල මට්ටමේ පළල 4 m ද, ජලයේ ගැඹුර 1.5 m ද වේ. එහි ඇති ජල පරිමාව කොපමණද?", options: ["30 m³", "45 m³", "60 m³", "15 m³"], correct: 1 }
    ],
    2: [
        { q: "පහත දැක්වෙන ඒකක අතුරින් SI මූලික ඒකකයක් නොවන්නේ කුමක්ද?", options: ["කෙල්වින් (K)", "ඇම්පියරය (A)", "නිව්ටන් (N)", "කැන්ඩෙලා (cd)"], correct: 2 },
        { q: "පීඩනය මැනීමේ SI ව්‍යුත්පන්න ඒකකය කුමක්ද?", options: ["පැස්කල් (Pa)", "ජූල් (J)", "වොට් (W)", "නිව්ටන් (N)"], correct: 0 }
    ],
    3: [
        { q: "සෘජුකෝණී ත්‍රිකෝණයක කර්ණය හඳුන්වන්නේ කෙසේද?", options: ["සෘජුකෝණයට ඉදිරියෙන් ඇති පාදය", "ලම්භක පාදය", "භූමිය", "පරිධිය"], correct: 0 }
    ],
    5: [
        { q: "බලයේ SI ඒකකය කුමක්ද?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
        { q: "F = ma සූත්‍රයෙන් දැක්වෙන්නේ නිව්ටන්ගේ කීවැනි චලිත නියමයද?", options: ["පළමුවන නියමය", "දෙවන නියමය", "තෙවන නියමය", "සියල්ලම"], correct: 1 }
    ],
    6: [
        { q: "කාර්යය (Work Done) ගණනය කරනු ලබන නිවැරදි සූත්‍රය කුමක්ද?", options: ["W = F / d", "W = F * d", "W = m * g", "W = P * t"], correct: 1 }
    ],
    7: [
        { q: "සෘජුකෝණී ත්‍රිකෝණයක Sin θ අනුපාතය සමාන වන්නේ?", options: ["සම්මුඛ / කර්ණය", "සන්නිහිත / කර්ණය", "සම්මුඛ / සන්නිහිත", "කර්ණය / සම්මුඛ"], correct: 0 }
    ],
    8: [
        { q: "කෝණික ප්‍රවේගය මැනීමේ SI ඒකකය කුමක්ද?", options: ["m/s", "rad/s", "deg/s", "rpm"], correct: 1 }
    ],
    9: [
        { q: "ඕම්ගේ නියමයට (Ohm's Law) අදාළ නිවැරදි සූත්‍රය තෝරන්න.", options: ["V = I / R", "V = I * R", "I = V * R", "P = V * I"], correct: 1 }
    ],
    10: [
        { q: "තාපය මැනීමේ SI ඒකකය කුමක්ද?", options: ["Celsius", "Kelvin", "Joule", "Calorie"], correct: 2 }
    ],
    21: [
        { q: "පරිගණකයක ප්‍රධාන සැකසුම් ඒකකය (CPU) තුළ අඩංගු නොවන කොටස කුමක්ද?", options: ["CU", "ALU", "RAM", "Registers"], correct: 2 },
        { q: "1 GB සමාන වන්නේ මෙයින් කුමකටද?", options: ["1024 MB", "1024 KB", "1000 MB", "1024 Bytes"], correct: 0 }
    ],
    22: [{ q: "OS යනු කුමක්ද?", options: ["මෘදුකාංගයක්", "දෘඩාංගයක්", "ප්‍රතිදාන උපාංගයක්", "Input එකක්"], correct: 0 }],
    23: [{ q: "Excel යනු කුමක්ද?", options: ["Spreadsheet", "Word", "Browser", "Game"], correct: 0 }],
    24: [{ q: "HTTP හි අර්ථය?", options: ["Hypertext Transfer Protocol", "Hyper Transfer Tool", "High Tech Protocol", "Hyper Text Tool"], correct: 0 }]
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
const db = firebase.firestore(); // Firestore එක Add කළා
const provider = new firebase.auth.GoogleAuthProvider();

// Database එකෙන් අනුමත කරපු ප්‍රශ්න ටික App එකට Load කරගැනීම
async function loadApprovedQuestions() {
    try {
        const snapshot = await db.collection('approved_mcqs').get();
        snapshot.forEach(doc => {
            const data = doc.data();
            if(!sftQuestionsDatabase[data.lessonId]) {
                sftQuestionsDatabase[data.lessonId] = [];
            }
            sftQuestionsDatabase[data.lessonId].push({
                q: data.question,
                options: data.options,
                correct: parseInt(data.correctOption)
            });
        });
        console.log("Approved Community Questions Loaded!");
    } catch (e) {
        console.error("Error loading approved questions", e);
    }
}
loadApprovedQuestions();

// App State Check (Firebase Auth Observer)
auth.onAuthStateChanged((user) => {
    if (user) {
        loginSuccess(user.displayName || "Student");
        
        // ADMIN CHECK ⚙️
        if (user.email && user.email.toLowerCase() === ADMIN_EMAIL) {
            const adminTab = document.getElementById('tab-admin');
            if(adminTab) adminTab.style.display = "inline-block";
        }
    } else {
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

document.getElementById('google-login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider).catch((error) => {
        alert("Google ගිණුම හරහා ඇතුළු වීමේදී ගැටළුවක්! Error: " + error.message);
    });
});

document.getElementById('login-form').addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const usernameValue = document.getElementById('username').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    if (passwordValue === "1234") {
        sessionStorage.setItem('sft_user', usernameValue); loginSuccess(usernameValue);
    } else { alert("වැරදි මුරපදයක්! (නැවත උත්සාහ කරන්න)"); }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => { sessionStorage.removeItem('sft_user'); location.reload(); });
});

document.getElementById('toggle-password').addEventListener('click', function() { 
    const p = document.getElementById('password'); 
    p.type = (p.type === 'password') ? 'text' : 'password'; 
    this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');
});

// ==========================================
// ➕ ADD MCQ TO DATABASE SYSTEM
// ==========================================
function showAddMcqModal() {
    const select = document.getElementById('mcq-lesson');
    if(select) {
        select.innerHTML = "";
        Object.keys(sftLessonsList).forEach(key => {
            select.innerHTML += `<option value="${key}">${sftLessonsList[key].name}</option>`;
        });
        document.getElementById('add-mcq-modal').style.display = "flex";
    }
}
function closeAddMcqModal() {
    const modal = document.getElementById('add-mcq-modal');
    if(modal) modal.style.display = "none";
}

async function submitNewMcq() {
    const user = auth.currentUser;
    if(!user) return alert("ප්‍රශ්න යැවීමට කරුණාකර Google ගිණුම හරහා ලොග් වෙන්න!");

    const lessonId = document.getElementById('mcq-lesson').value;
    const q = document.getElementById('mcq-q').value.trim();
    const o0 = document.getElementById('mcq-opt0').value.trim();
    const o1 = document.getElementById('mcq-opt1').value.trim();
    const o2 = document.getElementById('mcq-opt2').value.trim();
    const o3 = document.getElementById('mcq-opt3').value.trim();
    const correct = document.getElementById('mcq-correct').value;

    if(!q || !o0 || !o1 || !o2 || !o3) {
        return alert("කරුණාකර ප්‍රශ්නය සහ පිළිතුරු 4 ම සම්පූර්ණ කරන්න!");
    }

    try {
        await db.collection('pending_mcqs').add({
            lessonId: lessonId,
            question: q,
            options: [o0, o1, o2, o3],
            correctOption: correct,
            author: user.displayName || "Student",
            email: user.email || "No Email",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("ඔබේ ප්‍රශ්නය සාර්ථකව යැව්වා! Admin එය පරීක්ෂා කර පබ්ලිශ් කරනු ඇත.");
        closeAddMcqModal();
        
        document.getElementById('mcq-q').value = "";
        document.getElementById('mcq-opt0').value = "";
        document.getElementById('mcq-opt1').value = "";
        document.getElementById('mcq-opt2').value = "";
        document.getElementById('mcq-opt3').value = "";
    } catch (e) {
        console.error(e);
        alert("දෝෂයක්! අන්තර්ජාලය පරීක්ෂා කරන්න. (Database Rules Error එකක් විය හැක)");
    }
}

// ==========================================
// ⚙️ ADMIN PANEL SYSTEM
// ==========================================
async function loadAdminPanel() {
    const container = document.getElementById('admin-pending-container');
    if(!container) return;
    container.innerHTML = "<p style='color:#007bff; text-align:center;'>🔄 පරීක්ෂා කරමින් පවතී...</p>";
    
    try {
        const snapshot = await db.collection('pending_mcqs').orderBy('timestamp', 'asc').get();
        container.innerHTML = "";
        
        if(snapshot.empty) {
            container.innerHTML = "<p style='color:#9ca3af; text-align:center;'>මේ මොහොතේ අලුතින් ප්‍රශ්න කිසිවක් ලැබී නැත.</p>";
            return;
        }
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const div = document.createElement('div');
            div.style = "background:#1a2332; padding:15px; border-radius:10px; border:1px solid #374151;";
            div.innerHTML = `
                <p style="color:#fbbf24; font-size:12px; margin-bottom:5px;"><strong>පාඩම:</strong> ${sftLessonsList[data.lessonId]?.name || data.lessonId}</p>
                <p style="font-size:15px; margin-bottom:10px;"><strong>Q:</strong> ${data.question}</p>
                <ul style="list-style:none; padding:0; font-size:14px; margin-bottom:10px; color:#d1d5db;">
                    <li style="margin-bottom:3px;">1. ${data.options[0]} ${data.correctOption == 0 ? "✅" : ""}</li>
                    <li style="margin-bottom:3px;">2. ${data.options[1]} ${data.correctOption == 1 ? "✅" : ""}</li>
                    <li style="margin-bottom:3px;">3. ${data.options[2]} ${data.correctOption == 2 ? "✅" : ""}</li>
                    <li>4. ${data.options[3]} ${data.correctOption == 3 ? "✅" : ""}</li>
                </ul>
                <p style="font-size:11px; color:#9ca3af; margin-bottom:15px;">යැව්වේ: ${data.author} (${data.email})</p>
                <div style="display:flex; gap:10px;">
                    <button onclick="approveMcq('${doc.id}')" style="padding:8px 15px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">Approve ✅</button>
                    <button onclick="rejectMcq('${doc.id}')" style="padding:8px 15px; background:#dc3545; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">Reject ❌</button>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (e) {
        container.innerHTML = "<p style='color:red;'>දෝෂයක්! Admin Panel Load කිරීමට නොහැක.</p>";
        console.error(e);
    }
}

async function approveMcq(docId) {
    try {
        const docRef = db.collection('pending_mcqs').doc(docId);
        const docSnap = await docRef.get();
        if(docSnap.exists) {
            const data = docSnap.data();
            await db.collection('approved_mcqs').add(data);
            await docRef.delete();
            
            alert("ප්‍රශ්නය සාර්ථකව පබ්ලිශ් කළා!");
            loadAdminPanel(); 
            
            if(!sftQuestionsDatabase[data.lessonId]) sftQuestionsDatabase[data.lessonId] = [];
            sftQuestionsDatabase[data.lessonId].push({
                q: data.question,
                options: data.options,
                correct: parseInt(data.correctOption)
            });
        }
    } catch(e) { alert("දෝෂයක්! Approve කිරීමට නොහැක."); console.error(e); }
}

async function rejectMcq(docId) {
    if(confirm("මෙම ප්‍රශ්නය ප්‍රතික්ෂේප කර මකා දැමීමට අවශ්‍ය බව විශ්වාසද?")) {
        await db.collection('pending_mcqs').doc(docId).delete();
        loadAdminPanel();
    }
}

// ==========================================
// --- UI CONTROL & FILTERS ---
// ==========================================
function switchView(viewType) {
    const sSection = document.getElementById('section-syllabus');
    const pSection = document.getElementById('section-papers');
    const aSection = document.getElementById('section-admin'); // Admin section
    const fBar = document.getElementById('subject-filter-bar');
    
    document.querySelectorAll('.switch-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${viewType}`).classList.add('active');
    
    // ඔක්කොම සඟවන්න
    sSection.style.display = "none";
    pSection.style.display = "none";
    if(aSection) aSection.style.display = "none";
    fBar.style.display = "none";

    // අදාළ දේවල් පමණක් පෙන්නන්න
    if (viewType === 'all') { 
        sSection.style.display = "block"; pSection.style.display = "block"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'syllabus') { 
        sSection.style.display = "block"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'papers') { 
        pSection.style.display = "block"; 
    }
    else if (viewType === 'admin') {
        if(aSection) aSection.style.display = "block";
        loadAdminPanel(); // Load Data from Firebase
    }
    
    generateDashboard();
    if(viewType === 'papers' || viewType === 'all') fetchPapers();
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
    papersList.forEach(p => {
        if(query === "" || p.title.toLowerCase().includes(query)) {
            const div = document.createElement('div'); div.className = 'lesson-box';
            div.innerHTML = `<span class="box-emoji">${p.emoji}</span><h3>${p.title}</h3>`;
            div.onclick = () => startQuiz(p.id, 'paper'); 
            pContainer.appendChild(div);
        }
    });

    if (query.length >= 3) { 
        pContainer.innerHTML += `<div id="api-loading" style="text-align:center; width:100%; color:#007bff; margin-top:20px;">🔄 "${query}" සඳහා API එකෙන් සොයමින්...</div>`;
        try {
            const response = await fetch(`https://pastpaperapi.dileepatechyt.workers.dev/search?q=${encodeURIComponent(query)}`);
            const apiData = await response.json();
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();
            let papersArray = Array.isArray(apiData) ? apiData : (apiData.data || apiData.results || []);

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
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();
            pContainer.innerHTML += `<p style='text-align:center; width:100%; color:#ff4d4d; margin-top:15px; font-size: 13px;'>API සම්බන්ධතා දෝෂයක්!</p>`;
        }
    }
}

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
                window.open(data.links[linkKeys[0]], '_blank');
            } else { alert("PDF ලින්ක් එක සොයාගැනීමට නොහැකි විය!"); }
        } else { alert("API එකෙන් නිවැරදි දත්ත ලැබුණේ නැත!"); }
    } catch (e) {
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
    
    // ප්‍රශ්න තිබේදැයි පරීක්ෂා කිරීම
    if (type === 'syllabus' && sftQuestionsDatabase[id] && sftQuestionsDatabase[id].length > 0) {
        activeQuestionsList = sftQuestionsDatabase[id];
    } else {
        activeQuestionsList = [
            { q: `මෙම කොටසට අදාළ ප්‍රශ්න තවම එකතු කර නොමැත. ("Add MCQ" හරහා ඔබටත් ප්‍රශ්න යැවිය හැක!)`, options: ["හරි", "එලකිරි", "මම දාන්නම්", "කවුරුහරි දායි"], correct: 2 }
        ];
    }

    document.getElementById('home-page').classList.remove('active');
    setTimeout(() => { 
        document.getElementById('quiz-page').classList.add('active'); 
        loadQuestion(); 
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
