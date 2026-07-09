// --- LANGUAGE DICTIONARY ---
const translations = {
    en: {
        "site-title": "SFT Meetare",
        "login-subtitle": "Welcome back! Please login to your account.",
        "username-ph": "Username",
        "password-ph": "Password",
        "login-btn": "Login",
        "user-role": "Student",
        "about-dev-title": "About Developer",
        "dev-label": "Developer:",
        "dev-desc": "This is an educational platform dedicated to Advanced Level Technology (SFT) students to master their syllabus through interactive MCQs.",
        "link-privacy": "Privacy Policy",
        "link-terms": "Terms & Conditions",
        "link-contact": "Contact Us",
        "lessons-title": "SFT Lessons List",
        "lesson-card-title": "Lesson",
        "lesson-card-sub": "Click to Start MCQ",
        "time-left": "Time left:",
        "next-btn": "Next Question",
        "quiz-completed": "Quiz Completed!",
        "back-home-btn": "Back to Home",
        "score-text": "You scored {score} out of {total}!",
        "sample-q": "Sample question for Lesson",
        "sample-opt": "Option"
    },
    si: {
        "site-title": "SFT මීටරය",
        "login-subtitle": "සාදරයෙන් පිළිගනිමු! කරුණාකර ඔබගේ ගිණුමට පිවිසෙන්න.",
        "username-ph": "පරිශීලක නාමය",
        "password-ph": "මුරපදය",
        "login-btn": "ඇතුල්වන්න",
        "user-role": "ශිෂ්‍යයා",
        "about-dev-title": "සංවර්ධකයා ගැන",
        "dev-label": "නිර්මාණකරු:",
        "dev-desc": "මෙය උසස් පෙළ තාක්ෂණවේදය (SFT) හදාරන සිසුන් සඳහා ප්‍රශ්නෝත්තර (MCQ) මගින් විෂය නිර්දේශය ප්‍රගුණ කිරීමට සකස් කරන ලද අධ්‍යාපනික වෙබ් අඩවියකි.",
        "link-privacy": "රහස්‍යතා ප්‍රතිපත්තිය",
        "link-terms": "සේවා කොන්දේසි",
        "link-contact": "අපව අමතන්න",
        "lessons-title": "SFT පාඩම් මාලාව",
        "lesson-card-title": "පාඩම",
        "lesson-card-sub": "MCQ ආරම්භ කිරීමට ක්ලික් කරන්න",
        "time-left": "ඉතිරි කාලය:",
        "next-btn": "මීළඟ ප්‍රශ්නය",
        "quiz-completed": "ප්‍රශ්නාවලිය අවසන්!",
        "back-home-btn": "මුල් පිටුවට",
        "score-text": "ඔබ ප්‍රශ්න {total} කින් {score} ක් නිවැරදිව ලබා ගත්තා!",
        "sample-q": "පාඩම සඳහා ආදර්ශ ප්‍රශ්නය",
        "sample-opt": "පිළිතුර"
    },
    ta: {
        "site-title": "SFT மீற்றர்",
        "login-subtitle": "நல்வரவு! தயவுசெய்து உங்கள் கணக்கில் உள்நுழையவும்.",
        "username-ph": "பயனர் பெயர்",
        "password-ph": "கடவுச்சொல்",
        "login-btn": "உள்நுழைக",
        "user-role": "மாணவர்",
        "about-dev-title": "உருவாக்குனர் பற்றி",
        "dev-label": "உருவாக்கியவர்:",
        "dev-desc": "இது உயர்தர தொழில்நுட்பவியல் (SFT) மாணவர்களுக்கான ஊடாடும் MCQ மூலம் தங்களது பாடத்திட்டத்தை கற்க உருவாக்கப்பட ஒரு கல்வி தளமாகும்.",
        "link-privacy": "தனியுரிமைக் கொள்கை",
        "link-terms": "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
        "link-contact": "தொடர்புகொள்ள",
        "lessons-title": "SFT பாடங்களின் பட்டியல்",
        "lesson-card-title": "பாடம்",
        "lesson-card-sub": "MCQ ஐ தொடங்க கிளிக் செய்க",
        "time-left": "மீதமுள்ள நேரம்:",
        "next-btn": "அடுத்த கேள்வி",
        "quiz-completed": "வினாடி வினா முடிந்தது!",
        "back-home-btn": "முகப்பு பக்கம்",
        "score-text": "நீங்கள் {total} கேள்விகளில் {score} புள்ளிகள் பெற்றுள்ளீர்கள்!",
        "sample-q": "பாடத்திற்கான மாதிரி கேள்வி",
        "sample-opt": "பதில்"
    }
};

let currentLang = 'en';

// Language Change Event Listener
document.getElementById('lang-switch').addEventListener('change', function(e) {
    currentLang = e.target.value;
    applyLanguage(currentLang);
    // Home page එක active නම්, ලැයිස්තුවත් අලුත් භාෂාවෙන් render කරන්න
    if(document.getElementById('home-page').classList.contains('active')) {
        generateLessons();
    }
});

function applyLanguage(lang) {
    const dict = translations[lang];
    
    // UI එකේ elements වල text මාරු කිරීම
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (dict[key]) el.innerText = dict[key];
    });

    // Placeholders වෙනස් කිරීම
    document.getElementById('username').placeholder = dict["username-ph"];
    document.getElementById('password').placeholder = dict["password-ph"];
    document.getElementById('dev-desc').innerText = dict["dev-desc"];
}

// Default apply on load
applyLanguage(currentLang);


// --- CONFIG & DUMMY DATA FOR 24 LESSONS ---
const lessonsCount = 24;
// ඔබට අවශ්‍ය නම් මෙතන ප්‍රශ්න වෙන වෙනම දාන්න පුළුවන්
const sftQuestions = {
    1: [
        { q: "SFT යනු කුමන විෂය පථයට අයත්ද? / SFT belongs to which stream?", options: ["Bio Technology", "Science for Technology", "Engineering Technology", "Information Technology"], correct: 1 }
    ]
};

// Page Elements
const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');

// Login Handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    loginPage.classList.remove('active');
    setTimeout(() => {
        homePage.classList.add('active');
        generateLessons();
    }, 400);
});

// Sidebar Toggle Logic
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

menuBtn.onclick = () => { sidebar.classList.add('open'); overlay.classList.add('open'); }
closeBtn.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

// Generate 24 Lesson Boxes
function generateLessons() {
    const container = document.getElementById('lessons-container');
    container.innerHTML = "";
    const dict = translations[currentLang];
    
    for(let i = 1; i <= lessonsCount; i++) {
        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <i class="fas fa-book-open"></i>
            <h3>${dict['lesson-card-title']} ${i}</h3>
            <p style="color: #94a3b8; font-size: 0.85rem; margin-top:5px;">${dict['lesson-card-sub']}</p>
        `;
        box.onclick = () => startQuiz(i);
        container.appendChild(box);
    }
}


// --- QUIZ LOGIC WITH TIMER ---
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 20;

function startQuiz(lessonId) {
    currentLesson = lessonId;
    currentQuestionIndex = 0;
    score = 0;
    
    homePage.classList.remove('active');
    setTimeout(() => {
        quizPage.classList.add('active');
        loadQuestion();
    }, 400);
}

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 20;
    document.getElementById('time-sec').innerText = timeLeft;
    const dict = translations[currentLang];
    
    // ප්‍රශ්න නැත්නම් default dynamic ප්‍රශ්න හැදෙනවා භාෂාව අනුව
    const questions = sftQuestions[currentLesson] || [
        { 
            q: `${dict['sample-q']} ${currentLesson} - Q1?`, 
            options: [`${dict['sample-opt']} A`, `${dict['sample-opt']} B`, `${dict['sample-opt']} C (Correct)`, `${dict['sample-opt']} D`], 
            correct: 2 
        },
        { 
            q: `${dict['sample-q']} ${currentLesson} - Q2?`, 
            options: [`${dict['sample-opt']} A (Correct)`, `${dict['sample-opt']} B`, `${dict['sample-opt']} C`, `${dict['sample-opt']} D`], 
            correct: 0 
        }
    ];

    if(currentQuestionIndex >= questions.length) {
        endQuiz(questions.length);
        return;
    }

    const currentQ = questions[currentQuestionIndex];
    document.getElementById('quiz-title').innerText = `${dict['lesson-card-title']} ${currentLesson} - MCQ`;
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

    // Start Timer Counter
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
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
}

document.getElementById('next-btn').onclick = () => {
    currentQuestionIndex++;
    loadQuestion();
};

function endQuiz(totalQs) {
    quizPage.classList.remove('active');
    const dict = translations[currentLang];
    setTimeout(() => {
        resultPage.classList.add('active');
        // Score එක අදාළ භාෂාවෙන් format කිරීම
        let text = dict['score-text'].replace('{score}', score).replace('{total}', totalQs);
        document.getElementById('result-text').innerText = text;
    }, 400);
}

// Back to Home Handler
document.getElementById('back-home-btn').onclick = () => {
    resultPage.classList.remove('active');
    setTimeout(() => {
        homePage.classList.add('active');
    }, 400);
};
