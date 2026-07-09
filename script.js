// --- DUMMY SFT DATA (24 Lessons සඳහා) ---
const lessonsCount = 24;
const sftQuestions = {
    1: [
        { q: "SFT යනු කුමන විෂය පථයට අයත්ද?", options: ["Bio Technology", "Science for Technology", "Engineering Technology", "Information Technology"], correct: 1 },
        { q: "පහත ඒවායින් තාක්‍ෂණවේදය සඳහා විද්‍යාව විෂයට අදාළ නොවන්නේ කුමක්ද?", options: ["සෛල ජීව විද්‍යාව", "තාපය", "ව්‍යාපාර අධ්‍යයනය", "කාබනික රසායනය"], correct: 2 }
    ],
    2: [
        { q: "ජීවයේ මූලික ව්‍යුහය කුමක්ද?", options: ["පටක", "ඉන්ද්‍රිය", "සෛලය", "පරමාණුව"], correct: 2 }
    ]
    // ඉතිරි පාඩම් වලටත් මේ වගේම ප්‍රශ්න ඇතුළත් කරන්න පුළුවන්.
};

// Pages elements
const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');

// Login Handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Smooth Animation එකෙන් Home එකට යන්න
    loginPage.classList.remove('active');
    setTimeout(() => {
        homePage.classList.add('active');
        generateLessons();
    }, 400); // Animation matching time
});

// Sidebar Toggle
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
    
    for(let i = 1; i <= lessonsCount; i++) {
        const box = document.createElement('div');
        box.className = 'lesson-box';
        box.innerHTML = `
            <i class="fas fa-book-open"></i>
            <h3>Lesson ${i}</h3>
            <p style="color: #94a3b8; font-size: 0.85rem; margin-top:5px;">Click to Start MCQ</p>
        `;
        box.onclick = () => startQuiz(i);
        container.appendChild(box);
    }
}

// --- QUIZ LOGIC ---
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 20; // තත්පර 20යි

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
    
    // ප්‍රශ්න නැත්නම් default sample ප්‍රශ්න පෙන්වන්න
    const questions = sftQuestions[currentLesson] || [
        { q: `Lesson ${currentLesson} සඳහා ප්‍රශ්නය 1`, options: ["පිළිතුර A", "පිළිතුර B", "නිවැරදි පිළිතුර C", "පිළිතුර D"], correct: 2 },
        { q: `Lesson ${currentLesson} සඳහා ප්‍රශ්නය 2`, options: ["නිවැරදි පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 0 }
    ];

    if(currentQuestionIndex >= questions.length) {
        endQuiz(questions.length);
        return;
    }

    const currentQ = questions[currentQuestionIndex];
    document.getElementById('quiz-title').innerText = `Lesson ${currentLesson} - MCQ`;
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

    // Start Timer
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-sec').innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            disableOptions();
            document.getElementById('next-btn').style.display = 'block'; // Time out උනාම ඊළඟ එකට යන්න දෙනවා
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
        optionsButtons[correct].classList.add('correct'); // නිවැරදි එක කොළ පාටින් පෙන්වන්න
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
    setTimeout(() => {
        resultPage.classList.add('active');
        document.getElementById('result-text').innerText = `You scored ${score} out of ${totalQs}!`;
    }, 400);
}

// Back to Home Handler
document.getElementById('back-home-btn').onclick = () => {
    resultPage.classList.remove('active');
    setTimeout(() => {
        homePage.classList.add('active');
    }, 400);
};
