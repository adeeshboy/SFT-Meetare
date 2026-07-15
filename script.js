// ==========================================================================
// 🚀 SFT MEETARE - FINAL PRODUCTION READY CODE (WITHOUT FIREBASE)
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

// --- SFT MCQ QUESTIONS DATABASE ---
const sftQuestionsDatabase = {
    1: [
        { q: "සිලින්ඩරයක වක්‍ර පෘෂ්ඨ වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["2 * pi * r * h", "pi * r^2 * h", "2 * pi * r", "pi * r * l"], correct: 0 },
        { q: "අරය 7cm වන ගෝලයක මතුපිට වර්ගඵලය සොයන්න.", options: ["154 cm^2", "616 cm^2", "308 cm^2", "44 cm^2"], correct: 1 },
        { q: "ඝනකයක පැත්තක දිග 2m නම් එහි මුළු පෘෂ්ඨ වර්ගඵලය කොපමණද?", options: ["4 m^2", "8 m^2", "24 m^2", "16 m^2"], correct: 2 },
        { q: "සෘජුකෝණාස්‍රාකාර ප්‍රිස්මයක පරිමාව සෙවීමට භාවිත කරන්නේ?", options: ["දිග x පළල", "දිග x පළල x උස", "1/3 x පාද වර්ගඵලය x උස", "හරස්කඩ වර්ගඵලය"], correct: 1 },
        { q: "කේතුවක පරිමාව, සමාන අරයක් සහ උසක් ඇති සිලින්ඩරයක පරිමාවෙන් කොපමණ කොටසක්ද?", options: ["අඩක්", "හතරෙන් පංගුවක්", "තුනෙන් එකක්", "දෙගුණයක්"], correct: 2 }
    ],
    2: [
        { q: "පහත දැක්වෙන ඒකක අතුරින් SI මූලික ඒකකයක් නොවන්නේ කුමක්ද?", options: ["කෙල්වින් (K)", "ඇම්පියරය (A)", "නිව්ටන් (N)", "කැන්ඩෙලා (cd)"], correct: 2 },
        { q: "පීඩනය මැනීමේ SI ව්‍යුත්පන්න ඒකකය කුමක්ද?", options: ["පැස්කල් (Pa)", "ජූල් (J)", "වොට් (W)", "නිව්ටන් (N)"], correct: 0 },
        { q: "මයික්‍රොමීටර 1ක් (1 micrometer) මීටර වලින් කොපමණද?", options: ["10^-3 m", "10^-6 m", "10^-9 m", "10^-12 m"], correct: 1 },
        { q: "වර්නියර් කැලිපරයක ප්‍රධාන පරිමාණ කොටසක් 1mm ද වර්නියර් කොටස් ගණන 50ක් ද නම් එහි කුඩාම මිනුම?", options: ["0.1 mm", "0.01 mm", "0.02 mm", "0.05 mm"], correct: 2 },
        { q: "ස්කන්ධය මැනීමේ ජාත්‍යන්තර සම්මත මූලික ඒකකය කුමක්ද?", options: ["ග්‍රෑම් (g)", "මිලිග්‍රෑම් (mg)", "කිලෝග්‍රෑම් (kg)", "තොන් (t)"], correct: 2 }
    ],
    3: [
        { q: "සෘජුකෝණී ත්‍රිකෝණයක සෘජුකෝණයට ඉදිරියෙන් ඇති පාදය හඳුන්වන්නේ කුමන නමකින්ද?", options: ["සන්නිහිත පාදය", "සම්මුඛ පාදය", "කර්ණය", "ලම්භය"], correct: 2 },
        { q: "පාදවල දිග 3cm සහ 4cm වන සෘජුකෝණී ත්‍රිකෝණයක කර්ණයේ දිග කොපමණද?", options: ["5 cm", "7 cm", "25 cm", "6 cm"], correct: 0 },
        { q: "පයිතගරස් ප්‍රමේයයට අනුව සත්‍ය ප්‍රකාශය තෝරන්න.", options: ["a^2 + b^2 = c^2", "a + b = c", "a^2 - b^2 = c^2", "a * b = c"], correct: 0 },
        { q: "කර්ණයේ දිග 13cm ද එක් පාදයක් 5cm ද වන සෘජුකෝණී ත්‍රිකෝණයක අනෙක් පාදයේ දිග?", options: ["8 cm", "12 cm", "14 cm", "10 cm"], correct: 1 },
        { q: "පහත සඳහන් සංඛ්‍යා ත්‍රිත්ව අතුරින් පයිතගරස් ත්‍රිත්වයක් වන්නේ කුමක්ද?", options: ["2, 3, 4", "5, 10, 15", "6, 8, 10", "4, 5, 6"], correct: 2 }
    ],
    5: [
        { q: "බලයේ SI ඒකකය කුමක්ද?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
        { q: "F = ma සූත්‍රයෙන් දැක්වෙන්නේ නිව්ටන්ගේ කීවැනි චලිත නියමයද?", options: ["පළමුවන නියමය", "දෙවන නියමය", "තෙවන නියමය", "සියල්ලම"], correct: 1 },
        { q: "වස්තුවක නිශ්චලතාව හෝ චලිත ස්වභාවය වෙනස් කිරීමට දක්වන අකමැත්ත හඳුන්වන්නේ?", options: ["වේගය", "ත්වරණය", "status", "ස්කන්ධය/ජඩත්වය"], correct: 3 },
        { q: "ඝර්ෂණ බලය සැමවිටම ක්‍රියා කරන්නේ කුමන දිශාවටද?", options: ["චලිත දිශාවට සමාන්තරව ඒ දෙසටම", "චලිත දිශාවට ලම්බකව", "චලිතය සිදුවන දිශාවට ප්‍රතිවිරුද්ධ දිශාවට", "පහළට"], correct: 2 },
        { q: "ස්කන්ධය 5kg වන වස්තුවක් මත 20N බලයක් යෙදූ විට ඇතිවන ත්වරණය කොපමණද?", options: ["4 m/s^2", "100 m/s^2", "0.25 m/s^2", "25 m/s^2"], correct: 0 }
    ],
    6: [
        { q: "කාර්යය (Work Done) ගණනය කරනු ලබන නිවැරදි සූත්‍රය කුමක්ද?", options: ["W = F / d", "W = F * d", "W = m * g", "W = P * t"], correct: 1 },
        { q: "පෘථිවි පෘෂ්ඨයේ සිට h උසකින් පිහිටි ස්කන්ධය m වන වස්තුවක ගබඩා වන ගුරුත්වාකර්ෂණ විභව ශක්තිය?", options: ["1/2 m v^2", "m g h", "F * d", "m v"], correct: 1 },
        { q: "ජවය (Power) මැනීමේ SI ඒකකය කුමක්ද?", options: ["ජූල් (J)", "නිව්ටන් (N)", "වොට් (W)", "පැස්කල් (Pa)"], correct: 2 },
        { q: "ප්‍රවේගය v සහ ස්කන්ධය m වන වස්තුවක චාලක ශක්තිය (Kinetic Energy) සමාන වන්නේ?", options: ["mgh", "mv", "1/2 m v^2", "F * v"], correct: 2 },
        { q: "තත්පර 10ක් තුළ ජූල් 500ක කාර්යයක් සිදු කරන යන්ත්‍රයක ජවය කොපමණද?", options: ["5000 W", "50 W", "0.02 W", "5 W"], correct: 1 }
    ],
    7: [
        { q: "සෘජුකෝණී ත්‍රිකෝණයක Sin තීටා (Sin θ) අනුපාතය සමාන වන්නේ?", options: ["සම්මුඛ පාදය / කර්ණය", "සන්නිහිත පාදය / කර්ණය", "සම්මුඛ පාදය / සන්නිහිත පාදය", "කර්ණය / සම්මුඛ පාදය"], correct: 0 },
        { q: "Tan θ අනුපාතය ලබා දෙන්නේ කුමන පාද අතර සබඳතාවයෙන්ද?", options: ["සම්මුඛ / කර්ණය", "සන්නිහිත / කර්ණය", "සම්මුඛ / සන්නිහිත", "කර්ණය / සන්නිහිත"], correct: 2 },
        { q: "Sin 30 හි අගය කුමක්ද?", options: ["1", "0.5", "0.707", "0.866"], correct: 1 },
        { q: "Cos θ යනු පහත කුමන අනුපාතයද?", options: ["සම්මුඛ / කර්ණය", "සන්නිහිත / කර්ණය", "සම්මුඛ / සන්නිහිත", "1 / Sin θ"], correct: 1 },
        { q: "පහත ප්‍රකාශන අතුරින් සැමවිටම සත්‍ය වන්නේ කුමක්ද?", options: ["Sin^2 θ + Cos^2 θ = 1", "Sin θ + Cos θ = 1", "Tan θ = Cos θ / Sin θ", "Sin θ = 1 / Tan θ"], correct: 0 }
    ],
    8: [
        { q: "කෝණික ප්‍රවේගය මැනීමේ SI ඒකකය කුමක්ද?", options: ["m/s", "rad/s", "deg/s", "rpm"], correct: 1 },
        { q: "භ්‍රමණ චලිතයේදී ස්කන්ධයට අනුරූපව සලකන භෞතික රාශිය කුමක්ද?", options: ["කෝණික ගම්‍යතාව", "ඝූර්ණ අරය", "භ්‍රමණ ජඩත්ව ඝූර්ණය (I)", "බල ඝූර්ණය"], correct: 2 },
        { q: "බලයක ඝූර්ණය (Torque) සෙවීමට බලය ගුණ කළ යුත්තේ කුමන දුරකින්ද?", options: ["භ්‍රමණ අක්ෂයේ සිට ඇති සෘජු දුරින්", "මුළු දුරින්", "ලම්බක දුරින්", "පරිධියේ දිගින්"], correct: 2 },
        { q: "වස්තුවක් තත්පරයකට වට 5ක් භ්‍රමණය වේ නම් එහි සංඛ්‍යාතය කොපමණද?", options: ["5 Hz", "10 Hz", "2.5 Hz", "0.2 Hz"], correct: 0 },
        { q: "කෝණික විස්ථාපනය මැනීමට භාවිත කරන ප්‍රධාන ඒකකය කුමක්ද?", options: ["මීටර්", "රේඩියන් (rad)", "අංශක", "නිව්ටන්"], correct: 1 }
    ],
    9: [
        { q: "ඕම්ගේ නියමයට (Ohm's Law) අදාළ නිවැරදි සූත්‍රය තෝරන්න.", options: ["V = I / R", "V = I * R", "I = V * R", "P = V * I"], correct: 1 },
        { q: "විද්‍යුත් ධාරාවක් මැනීම සඳහා පරිපථයකට ශ්‍රේණිගතව සම්බන්ධ කරන උපකරණය කුමක්ද?", options: ["වෝල්ට්මීටරය", "ඕම්මීටරය", "ඇමීටරය", "ගැල්වනෝමීටරය"], correct: 2 },
        { q: "ප්‍රතිරෝධක දෙකක් ශ්‍රේණිගතව (Series) සම්බන්ධ කළ විට මුළු පාලක ප්‍රතිරෝධය?", options: ["වැඩි වේ", "අඩු වේ", "වෙනස් නොවේ", "ශුන්‍ය වේ"], correct: 0 },
        { q: "විද්‍යුත් ජවය (Electrical Power) සෙවීමේ සූත්‍රයක් නොවන්නේ?", options: ["P = VI", "P = I^2 * R", "P = V^2 / R", "P = V / I"], correct: 3 },
        { q: "විද්‍යුත් ධාරිතාව (Capacitance) මැනීමේ ඒකකය කුමක්ද?", options: ["Farad (F)", "Henry (H)", "Ohm", "Coulomb"], correct: 0 }
    ],
    10: [
        { q: "තාපය මැනීමේ SI ඒකකය කුමක්ද?", options: ["Celsius", "Kelvin", "Joule", "Calorie"], correct: 2 },
        { q: "සෙල්සියස් අංශක 0 (0°C) කෙල්වින් අගයෙන් කොපමණද?", options: ["100 K", "273.15 K", "0 K", "-273.15 K"], correct: 1 },
        { q: "ද්‍රව්‍යයක උෂ්ණත්වය 1K කින් ඉහළ නැංවීමට අවශ්‍ය තාප ප්‍රමාණය හඳුන්වන්නේ?", options: ["විශිෂ්ට තාප ධාරිතාව", "තාප ධාරිතාව", "ගුප්ත තාපය", "එන්තැල්පිය"], correct: 1 },
        { q: "ඝන ද්‍රව්‍ය හරහා තාපය ගමන් කරන ප්‍රධාන ක්‍රමය කුමක්ද?", options: ["තාප සන්නයනය", "තාප සංවහනය", "තාප විකිරණය", "වාෂ්පීකරණය"], correct: 0 },
        { q: "තාපමානයක් නිෂ්පාදනය කිරීමේදී භාවිත වන රසදියවල ඇති විශේෂ ගුණය කුමක්ද?", options: ["ඒකාකාර තාප ප්‍රසාරණය", "ඉහළ තාපාංකය", "පාරදෘශ්‍ය නොවීම", "සියල්ලම"], correct: 3 }
    ],
    21: [
        { q: "පරිගණකයක ප්‍රධාන සැකසුම් ඒකකය (CPU) තුළ අඩංගු නොවන කොටස කුමක්ද?", options: ["පාලන ඒකකය (CU)", "ගණිත හා තර්කන ඒකකය (ALU)", "ප්‍රධාන මතකය (RAM)", "රෙජිස්ටර (Registers)"], correct: 2 },
        { q: "පරිගණකය ක්‍රියා විරහිත කළ විට දත්ත මැකී යන තාවකාලික මතකය කුමක්ද?", options: ["ROM", "Hard Disk", "RAM (Random Access Memory)", "Flash Drive"], correct: 2 },
        { q: "පහත දැක්වෙන උපාංග අතුරින් ආදාන උපාංගයක් (Input Device) පමණක් වන්නේ කුමක්ද?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: 2 },
        { q: "පරිගණකය පණගැන්වීමේදී (Booting) ක්‍රියාත්මක වන BIOS වැඩසටහන ගබඩා කර ඇත්තේ?", options: ["RAM", "ROM", "Hard Disk", "Cache Memory"], correct: 1 },
        { q: "දත්ත ගබඩා කිරීමේ පරිමාණ අනුව 1 GB (Gigabyte) සමාන වන්නේ මෙයින් කුමකටද?", options: ["1024 MB", "1024 KB", "1000 MB", "1024 Bytes"], correct: 0 }
    ]
};

const papersList = [
    { id: "p1", title: "2024 A/L SFT Past Paper", emoji: "📝" },
    { id: "p2", title: "2025 A/L SFT Past Paper", emoji: "📜" },
    { id: "p3", title: "SFT Model Paper - 01", emoji: "💎" }
];

// ==========================================
// 🔐 LOCAL AUTHENTICATION SYSTEM (NO FIREBASE)
// ==========================================

// Page load වෙද්දි Session එකක් තියෙනවද බලනවා
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = sessionStorage.getItem('sft_user');
    if (savedUser) {
        loginSuccess(savedUser);
    } else {
        showLoginPage();
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

// --- Custom Password Login Event ---
document.getElementById('login-form').addEventListener('submit', (e) => { 
    e.preventDefault(); 
    
    const usernameValue = document.getElementById('username').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    
    // ඕනෑම නමකුත්, password එක 1234 ත් නම් පමණක් ඇතුළු වීමට ඉඩ දේ
    if (passwordValue === "1234") {
        sessionStorage.setItem('sft_user', usernameValue); 
        loginSuccess(usernameValue);
    } else {
        alert("වැරදි මුරපදයක්! (නැවත උත්සාහ කරන්න)");
    }
});

// --- Google Login Mock (Optional) ---
document.getElementById('google-login-btn').addEventListener('click', () => {
    const mockName = prompt("Enter your Name for Google Login Simulation:");
    if(mockName) {
        sessionStorage.setItem('sft_user', mockName);
        loginSuccess(mockName);
    }
});

// --- Logout Button ---
document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('sft_user');
    location.reload();
});

// --- Toggle Password Visibility ---
document.getElementById('toggle-password').addEventListener('click', function() { 
    const p = document.getElementById('password'); 
    p.type = (p.type === 'password') ? 'text' : 'password'; 
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

    // 2. Fetch from Cloudflare Worker API (Only if query is longer than 2 characters)
    if (query.length > 2) { 
        pContainer.innerHTML += `<div id="api-loading" style="text-align:center; width:100%; color:#007bff; margin-top:20px;">🔄 "${query}" සඳහා API එකෙන් සොයමින්...</div>`;
        
        try {
            const response = await fetch(`https://pastpaperapi.dileepatechyt.workers.dev/search?q=${encodeURIComponent(query)}`);
            const apiData = await response.json();
            
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();

            if (apiData && apiData.length > 0) {
                apiData.forEach(p => {
                    const div = document.createElement('div'); div.className = 'lesson-box';
                    
                    const paperTitle = p.title || p.name || "SFT Past Paper";
                    const paperUrl = p.url || p.link || "";
                    const downloadLink = `https://pastpaperapi.dileepatechyt.workers.dev/dl?url=${encodeURIComponent(paperUrl)}`;

                    div.innerHTML = `
                        <span class="box-emoji">📥</span>
                        <h3>${paperTitle}</h3>
                        <a href="${downloadLink}" target="_blank" class="btn-primary" style="text-decoration:none; display:inline-block; margin-top:10px; padding: 8px 15px; font-size: 14px; background:#007bff; color:#fff; border-radius:5px; width:100%; text-align:center;">
                            ⬇️ Download Paper
                        </a>
                    `;
                    pContainer.appendChild(div);
                });
            } else {
                 pContainer.innerHTML += `<p style='text-align:center; width:100%; color:#9ca3af; margin-top:15px;'>මෙම නමින් ප්‍රශ්න පත්‍ර හමුවුණේ නැත.</p>`;
            }
        } catch (e) {
            console.error(e);
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();
            pContainer.innerHTML += "<p style='text-align:center; width:100%; color:red; margin-top:15px;'>API එක සමග සම්බන්ධ වීමේදී දෝෂයක්!</p>";
        }
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
