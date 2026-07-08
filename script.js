const sftLessons = [
    { id: "all", title: "All Lessons", desc: "සියලුම පාඩම් වල මිශ්‍ර ප්‍රශ්න", icon: "📋" },
    
    // 🧮 MATHS PART
    { id: 1, title: "01. වර්ගඵලය හා පරිමාව", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "📐" },
    { id: 3, title: "03. පයිතගරස් සම්බන්ධය", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "🔺" },
    { id: 7, title: "07. ත්‍රිකෝණමිතික අනුපාත", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "📉" },
    { id: 19, title: "19. ඛණ්ඩාංක ජ්‍යාමිතිය", desc: "ඒකජ ශ්‍රිත හා වර්ගජ ශ්‍රිත - 13 ශ්‍රේණිය", icon: "📊" },
    { id: 20, title: "20. සංඛ්‍යානය", desc: "ගණිතය - 13 ශ්‍රේණිය", icon: "🔢" },

    // ⚡ PHYSICS PART
    { id: 2, title: "02. මිනුම් ඒකක හා මිනුම් උපකරණ", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "📏" },
    { id: 5, title: "05. බලය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "💥" },
    { id: 6, title: "06. කාර්යය, ශක්තිය, ජවය", desc: "ක්ෂමතාව - 12 ශ්‍රේණිය", icon: "⚡" },
    { id: 8, title: "08. භ්‍රමණ චලිතය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔄" },
    { id: 9, title: "09. විද්‍යුතය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔌" },
    { id: 10, title: "10. තාපය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔥" },
    { id: 16, title: "16. තරල", desc: "භෞතික විද්‍යාව - 13 ශ්‍රේණිය", icon: "💧" },

    // 🧪 CHEMISTRY PART
    { id: 11, title: "11. තාප රසායනය", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "🧪" },
    { id: 12, title: "12. චාලක රසායනය", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "⏳" },
    { id: 13, title: "13. ජෛව අණු", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "🧬" },
    { id: 14, title: "14. බහුඅවයවීක", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🧱" },
    { id: 15, title: "15. පදාර්ථයේ යාන්ත්‍රික ගුණ", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "💎" },
    { id: 17, title: "17. රසායනික කර්මාන්ත", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🏭" },
    { id: 18, title: "18. ස්වාභාවික නිෂ්පාදන", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🌿" },
    { id: 25, title: "25. පාරිසරික සමතුලිතතාව", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🌍" },

    // 🧫 BIO PART
    { id: 4, title: "04.1-04.9 ජීව විද්‍යා කොටස්", desc: "සෛල, ශාක පටක, ක්ෂුද්‍ර ජීවීන් සහ වනාන්තර", icon: "🌱" },

    // 💻 ICT PART
    { id: 21, title: "21. පරිගණක පද්ධතිය හා උපාංග", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "🖥️" },
    { id: 22, title: "22. Operating Systems (OS)", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "⚙️" },
    { id: 23, title: "23. යෙදුම් මෘදුකාංග", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "📱" },
    { id: 24, title: "24. අන්තර්ජාලය", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "🌐" }
];


const allQuestions = [
    {
        lesson: 3,
        question: "පරිගණකයක ප්‍රධාන මතකය (Main Memory) ලෙස හඳුන්වනු ලබන්නේ කුමක්ද?",
        options: ["Hard Disk", "RAM", "ROM", "Cache"],
        answer: 1
    }
];

let questions = []; 
let currentQuestion = 0;
let score = 0;
let totalTime = 600; 
let timerInterval;
let isMenuOpen = false;

function generateLessonsDashboard() {
    const container = document.getElementById("lessons-container");
    let htmlContent = "";
    sftLessons.forEach(lesson => {
        htmlContent += `
        <div class="dash-card topic-card" onclick="selectLesson('${lesson.id}', '${lesson.title}')">
            <span class="card-icon">${lesson.icon}</span>
            <div class="card-text">
                <h4>${lesson.title}</h4>
                <p>${lesson.desc}</p>
            </div>
        </div>
        `;
    });
    container.innerHTML = htmlContent;
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (isMenuOpen) {
        sidebar.style.left = "-260px";
    } else {
        sidebar.style.left = "0px";
    }
    isMenuOpen = !isMenuOpen;
}

function calculateExamCountdown() {
    const examDate = new Date("November 25, 2026").getTime(); 
    const now = new Date().getTime();
    const difference = examDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        document.getElementById("days-count").textContent = days;
    } else {
        document.getElementById("days-count").textContent = "00";
    }
}

function checkLogin() {
    const nameInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value;

    if (nameInput !== "" && passInput === "1234") {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";
        document.getElementById("user-display").textContent = nameInput;
        document.getElementById("sidebar-username").textContent = nameInput;
        document.querySelector(".menu-open-btn").style.display = "block"; 
        
        generateLessonsDashboard();
        calculateExamCountdown();
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

function showSidebarModal(type) {
    if (isMenuOpen) toggleMenu();
    const modal = document.getElementById("info-modal");
    const contentBox = document.getElementById("modal-body-content");
    
    let html = "";
    if (type === 'about') {
        html = `<h2>ℹ️ About Owner</h2>
                <p style="margin-top:14px; line-height:1.5;">Welcome to <b>SFT Meetare</b>! This platform was created to help Advanced Level Technology stream students score high in their SFT MCQ papers.</p>
                <p style="margin-top:10px;"><b>Owner/Developer:</b> Adeesha Lakshitha<br><b>Mission:</b> Delivering top-notch educational resources digitally.</p>`;
    } else if (type === 'review') {
        html = `<h2>⭐ Reviews & Feedback</h2>
                <p style="margin-top:10px;">We value your feedback! Rate your experience with SFT Meetare.</p>
                <textarea id="feedback-text" style="width:100%; height:80px; margin:15px 0; padding:10px; border:1px solid #ccc; border-radius:8px;" placeholder="Write your review here..."></textarea>
                <button onclick="alert('Thank you for your valuable review!')" class="action-btn" style="padding:10px;">Submit Review</button>`;
    } else if (type === 'privacy') {
        html = `<h2>🔒 Privacy Policy</h2>
                <p style="margin-top:14px; font-size:13px; text-align:left; line-height:1.5; height:200px; overflow-y:auto;">At SFT Meetare, accessible from your domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SFT Meetare and how we use it. We use cookies and web beacons for Google AdSense to serve personalized ads based on your visits.</p>`;
    } else if (type === 'terms') {
        html = `<h2>📜 Terms & Conditions</h2>
                <p style="margin-top:14px; font-size:13px; text-align:left; line-height:1.5;">By accessing SFT Meetare, we assume you accept these terms and conditions. Do not continue to use this web application if you do not agree to take all of the terms and conditions stated on this page. Content is strictly for educational purposes.</p>`;
    }
    
    contentBox.innerHTML = html;
    modal.style.display = "block";
}

function closeSidebarModal() {
    document.getElementById("info-modal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("info-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function selectLesson(lessonId, lessonTitle) {
    if (isMenuOpen) toggleMenu(); 

    if (lessonId === 'all') {
        questions = [...allQuestions];
        document.getElementById("quiz-topic-title").textContent = "SFT Meetare - All Lessons";
    } else {
        questions = allQuestions.filter(q => q.lesson == lessonId);
        document.getElementById("quiz-topic-title").textContent = "SFT Meetare - " + lessonTitle;
    }

    if (questions.length > 0) {
        currentQuestion = 0;
        score = 0;
        totalTime = 600;
        clearInterval(timerInterval);
        
        document.getElementById("home-page").style.display = "none";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("quiz-page").style.display = "block";
        
        loadQuestion();
        startTimer();
    } else {
        alert("මෙම පාඩමට තවමත් ප්‍රශ්න ඇතුළත් කර නොමැත!");
    }
}

function loadQuestion() {
    document.getElementById("progress").innerHTML = `Question ${currentQuestion + 1} / ${questions.length}`;
    let progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progressPercentage + "%";

    let q = questions[currentQuestion];
    let html = `
    <div class="question">
        <h2>${q.question}</h2>
        <div class="options-container">
    `;

    q.options.forEach((option, index) => {
        html += `
        <label class="option-label">
            <input type="radio" name="answer" value="${index}">
            ${option}
        </label>
        `;
    });

    html += `</div></div>`;
    document.getElementById("quiz").innerHTML = html;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("කරුණාකර ඉදිරියට යාමට පෙර පිළිතුරක් තෝරන්න!");
        return;
    }

    if (parseInt(selectedOption.value) === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        document.getElementById("timer").textContent = minutes + ":" + seconds;

        if (totalTime <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
        totalTime--;
    }, 1000);
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-box").style.display = "block";

    document.getElementById("result").innerHTML = `
        <div class="result-stat" style="color: #28a745;">✅ නිවැරදි පිළිතුරු: ${score}</div>
        <div class="result-stat" style="color: #dc3545;">❌ වැරදි පිළිතුරු: ${questions.length - score}</div>
        <div class="score-badge">Final Score: ${score} / ${questions.length}</div>
    `;
}

function backToHome() {
    clearInterval(timerInterval);
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("home-page").style.display = "block";
}
