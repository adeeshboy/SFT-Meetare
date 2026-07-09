// --- SFT LESSONS LIST (1 to 24 IN ORDER) ---
const sftLessonsList = {
    1: { si: "01. මිනුම් විද්‍යාව හා පරිමාණය", en: "01. Metrology and Scales", ta: "01. அளவையியல் மற்றும் அளவீடுகள்" },
    2: { si: "02. මූලික ඒකක හා මූලික උපකරණ", en: "02. Basic Units & Basic Instruments", ta: "02. அடிப்படை அலகுகள் மற்றும் கருவிகள்" },
    3: { si: "03. ගණිතකරණ සංකල්පය", en: "03. Mathematical Concepts", ta: "03. கணிதக் கருத்துக்கள்" },
    4: { si: "04.1. සෛලීය සංවිධානයක් සහිත ජීවීන්", en: "04.1. Organisms with Cellular Organization", ta: "04.1. கல ஒழுங்கமைப்புடைய உயிரினங்கள்" },
    5: { si: "05. බලය", en: "05. Force", ta: "05. விசை" },
    6: { si: "06. කාර්යය, ශක්තිය, බලය (යාන්ත්‍රිකව)", en: "06. Work, Energy, Power (Mechanical)", ta: "06. வேலை, சக்தி, வலு (இயந்திரவியல்)" },
    7: { si: "07. ත්‍රිකෝණමිතික අනුපාත", en: "07. Trigonometric Ratios", ta: "07. திரிகோணவிகிதங்கள்" },
    8: { si: "08. ප්‍රකාශ විද්‍යාව", en: "08. Optics", ta: "08. ஒளியியல்" },
    9: { si: "09. විද්‍යුතය", en: "09. Electricity", ta: "09. மின்னியல்" },
    10: { si: "10. -තාපය", en: "10. Heat", ta: "10. வெப்பம்" },
    11: { si: "11. -තාප රසායනය", en: "11. Thermochemistry", ta: "11. வெப்ப இரசாயனம்" },
    12: { si: "12. විද්‍යුත් රසායනය", en: "12. Electrochemistry", ta: "12. மின் இரசாயனம்" },
    13: { si: "13. පොලිමර", en: "13. Polymers", ta: "13. பல்லுறுப்பிகள்" },
    14: { si: "14. ඇග්‍රෝඩර්මා", en: "14. Agrodharma", ta: "14. அக்ரோதர்மா" },
    15: { si: "15. පෘෂ්ඨීය යාන්ත්‍රික ගුණ", en: "15. Surface Mechanical Properties", ta: "15. மேற்பரப்பு இயந்திரவியல் பண்புகள்" },
    16: { si: "16. තරංග", en: "16. Waves", ta: "16. அலைகள்" },
    17: { si: "17. රසායනික කර්මාන්ත", en: "17. Chemical Industries", ta: "17. இரசாயன தொழில்துறைகள்" },
    18: { si: "18. ස්වභාවික නිෂ්පාදන", en: "18. Natural Products", ta: "18. இயற்கை தயாரிப்புகள்" },
    19: { si: "19. ඛණ්ඩාංක ජ්‍යාමිතිය - සරල රේඛා හා වෘත්ත ශ්‍රිත", en: "19. Coordinate Geometry - Straight Lines & Circles", ta: "19. ஆயத்தொலைவடிவியல் - நேர்கோடுகள் மற்றும் வட்டங்கள்" },
    20: { si: "20. සංඛ්‍යානය", en: "20. Statistics", ta: "20. புள்ளியியல்" },
    21: { si: "21. පරිගණක පද්ධතිය හා උපාංග", en: "21. Computer System & Devices", ta: "21. கணினி முறைமை மற்றும் சாதனங்கள்" },
    22: { si: "22. OS (මෙහෙයුම් පද්ධති)", en: "22. OS (Operating Systems)", ta: "22. இயக்க முறைமைகள்" },
    23: { si: "23. යෙදුම් මෘදුකාංග", en: "23. Application Software", ta: "23. பயன்பாட்டு மென்பொருள்" },
    24: { si: "24. අන්තර්ජාලය", en: "24. Internet", ta: "24. இணையம்" }
};

// --- PAPERS DUMMY DATA ---
const papersList = [
    { id: "p1", si: "2024 A/L SFT Past Paper", en: "2024 A/L SFT Past Paper", ta: "2024 A/L SFT கடந்தகால வினாத்தாள்" },
    { id: "p2", si: "2025 A/L SFT Past Paper", en: "2025 A/L SFT Past Paper", ta: "2025 A/L SFT கடந்தகால வினாத்தாள்" },
    { id: "p3", si: "SFT Model Paper - 01", en: "SFT Model Paper - 01", ta: "SFT மாதிரி வினாத்தாள் - 01" }
];

// --- TRANSLATIONS DICTIONARY ---
const translations = {
    en: {
        "site-title": "SFT Meetare",
        "remember-me-txt": "Remember Me",
        "countdown-title": "2027 A/L EXAM COUNTDOWN",
        "days-label": "DAYS REMAINING",
        "about-dev-title": "About Developer",
        "dev-label": "Developer:",
        "link-privacy": "Privacy Policy",
        "link-terms": "Terms & Conditions",
        "link-contact": "Contact Us",
        "cat-syllabus": "SFT Syllabus Lessons",
        "cat-papers": "Past Papers & Model Papers",
        "time-left": "Time left:",
        "next-btn": "Next Question",
        "quiz-completed": "Quiz Completed!",
        "back-home-btn": "Back to Home",
        "score-text": "You scored {score} out of {total}!",
        "sample-q": "Sample question for",
        "sample-opt": "Option"
    },
    si: {
        "site-title": "SFT මීටරය",
        "remember-me-txt": "මාව මතක තබා ගන්න",
        "countdown-title": "2027 උසස් පෙළ Countdown",
        "days-label": "විභාගයට ඉතිරි දින ගණන",
        "about-dev-title": "සංවර්ධකයා ගැන",
        "dev-label": "නිර්මාණකරු:",
        "link-privacy": "රහස්‍යතා ප්‍රතිපත්තිය",
        "link-terms": "සේවා කොන්දේසි",
        "link-contact": "අපව අමතන්න",
        "cat-syllabus": "SFT විෂය නිර්දේශයේ පාඩම්",
        "cat-papers": "පසුගිය විභාග ප්‍රශ්න පත්‍ර සහ ආදර්ශ ප්‍රශ්න පත්‍ර",
        "time-left": "ඉතිරි කාලය:",
        "next-btn": "මීළඟ ප්‍රශ්නය",
        "quiz-completed": "ප්‍රශ්නාවලිය අවසන්!",
        "back-home-btn": "මුල් පිටුවට",
        "score-text": "ඔබ ප්‍රශ්න {total} කින් {score} ක් ලබා ගත්තා!",
        "sample-q": "පාඩම සඳහා ආදර්ශ ප්‍රශ්නය",
        "sample-opt": "පිළිතුර"
    },
    ta: {
        "site-title": "SFT மீற்றர்",
        "remember-me-txt": "என்னை நியாபகம் வை",
        "countdown-title": "2027 A/L பரீட்சை கவுண்ட்டவுன்",
        "days-label": "நாட்கள் மீதமுள்ளன",
        "about-dev-title": "உருவாக்குனர் பற்றி",
        "dev-label": "உருவாக்கியவர்:",
        "link-privacy": "தனியுரிமைக் கொள்கை",
        "link-terms": "விதிமுறைகள்",
        "link-contact": "தொடர்புகொள்ள",
        "cat-syllabus": "SFT பாடத்திட்ட பாடங்கள்",
        "cat-papers": "கடந்தகால மற்றும் மாதிரி வினாத்தாள்கள்",
        "time-left": "நேரம்:",
        "next-btn": "அடுத்த கேள்வி",
        "quiz-completed": "வினாடி வினா முடிந்தது!",
        "back-home-btn": "முகப்பு பக்கம்",
        "score-text": "நீங்கள் {total} இல் {score} புள்ளிகள் பெற்றுள்ளீர்கள்!",
        "sample-q": "பாடத்திற்கான மாதிரி கேள்வி",
        "sample-opt": "பதில்"
    }
};

let currentLang = 'en';

// Change Language
document.getElementById('lang-switch').addEventListener('change', function(e) {
    currentLang = e.target.value;
    applyLanguage(currentLang);
    if(document.getElementById('home-page').classList.contains('active')) {
        generateDashboard();
    }
});

function applyLanguage(lang) {
    const dict = translations[lang];
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (dict[key]) el.innerText = dict[key];
    });
}

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

// --- HUGE ELGANT COUNTDOWN TIMER ---
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

// --- LOGIN HANDLER ---
const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredName = document.getElementById('username').value;
    document.getElementById('user-display-name').innerText = enteredName;

    loginPage.classList.remove('active');
    setTimeout(() => {
        homePage.classList.add('active');
        generateDashboard();
    }, 400);
});

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
    // 1. Generate Lessons
    const lessonsContainer = document.getElementById('lessons-container');
    lessonsContainer.innerHTML = "";
    for(let i = 1; i <= 24; i++) {
        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <i class="fas fa-book-open-reader"></i>
            <h3>${sftLessonsList[i][currentLang]}</h3>
        `;
        box.onclick = () => startQuiz(i, 'syllabus');
        lessonsContainer.appendChild(box);
    }

    // 2. Generate Papers
    const papersContainer = document.getElementById('papers-container');
    papersContainer.innerHTML = "";
    papersList.forEach(paper => {
        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <i class="fas fa-file-lines"></i>
            <h3>${paper[currentLang]}</h3>
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
    const dict = translations[currentLang];
    
    let titleName = "";
    if(type === 'syllabus') {
        titleName = sftLessonsList[currentLesson][currentLang];
    } else {
        const pObj = papersList.find(p => p.id === currentLesson);
        titleName = pObj ? pObj[currentLang] : "Paper MCQ";
    }

    const questions = [
        { 
            q: `${dict['sample-q']} [${titleName}] - Q1?`, 
            options: [`${dict['sample-opt']} A`, `${dict['sample-opt']} B`, `${dict['sample-opt']} C (Correct)`, `${dict['sample-opt']} D`], 
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
    const dict = translations[currentLang];
    setTimeout(() => {
        document.getElementById('result-page').classList.add('active');
        let text = dict['score-text'].replace('{score}', score).replace('{total}', totalQs);
        document.getElementById('result-text').innerText = text;
    }, 400);
}

document.getElementById('back-home-btn').onclick = () => {
    document.getElementById('result-page').classList.remove('active');
    setTimeout(() => { homePage.classList.add('active'); }, 400);
};

applyLanguage(currentLang);
