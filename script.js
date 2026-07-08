// 1. ඔයාගේ SFT ප්‍රශ්න ටික මෙතනට දාන්න
const questions = [
    {
        question: "පහත සඳහන් ඒවායින් ප්‍රධාන පද්ධති ඒකකයක් (SI Unit) නොවන්නේ කුමක්ද?",
        options: ["මීටරය (m)", "කිලෝග්‍රෑමය (kg)", "සෙල්සියස් (©)", "තත්පරය (s)"],
        answer: 2 // 0 සිට ගැණිය යුතුය (සෙල්සියස් තියෙන්නේ 2 වෙනි තැන)
    },
    {
        question: "පරිගණකයක ප්‍රධාන මතකය (Main Memory) ලෙස හඳුන්වනු ලබන්නේ කුමක්ද?",
        options: ["Hard Disk", "RAM", "ROM", "Cache"],
        answer: 1 // RAM එක තියෙන්නේ 1 වෙනි තැන
    },
    {
        question: "ජලයේ තාපාංකය සෙල්සියස් අංශක කීයද?",
        options: ["0°C", "50°C", "100°C", "120°C"],
        answer: 2 // 100°C තියෙන්නේ 2 වෙනි තැන
    }
];

let currentQuestion = 0;
let score = 0;
let totalTime = 600; // තත්පර 600 (විනාඩි 10)
let timerInterval;

function startQuiz() {
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    // Progress Text Update කිරීම
    document.getElementById("progress").innerHTML = `Question ${currentQuestion + 1} / ${questions.length}`;

    // Progress Bar Update කිරීම
    let progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progressPercentage + "%";

    let q = questions[currentQuestion];

    // ප්‍රශ්නය සහ Options ටික HTML වලට සකස් කිරීම
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

    html += `
        </div>
    </div>
    `;
    
    document.getElementById("quiz").innerHTML = html;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    // උත්තරයක් තෝරලා නැත්නම් Alert එකක් දෙනවා
    if (!selectedOption) {
        alert("කරුණාකර ඉදිරියට යාමට පෙර පිළිතුරක් තෝරන්න!");
        return;
    }

    // උත්තරය හරිද බලනවා
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
    
    // Quiz ප්‍රදේශය hide කරනවා
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("progress").style.display = "none";
    document.getElementById("timer-box").style.display = "none";
    document.getElementById("progress-bar").parentElement.style.display = "none";

    // Result ප්‍රදේශය පෙන්වනවා
    document.getElementById("result-box").style.display = "block";

    // ලකුණු පෙන්වීම
    document.getElementById("result").innerHTML = `
        <div class="result-stat" style="color: #28a745;">✅ නිවැරදි පිළිතුරු: ${score}</div>
        <div class="result-stat" style="color: #dc3545;">❌ වැරදි පිළිතුරු: ${questions.length - score}</div>
        <div class="score-badge">Final Score: ${score} / ${questions.length}</div>
    `;
}

// Quiz එක පටන් ගැනීම
startQuiz();
questions.forEach((q,index)=>{

const selected=document.querySelector(`input[name="q${index}"]:checked`);

if(selected && Number(selected.value)===q.answer){
correct++;
}

});

document.getElementById("result").innerHTML=
`
✅ Correct : ${correct}<br>
❌ Wrong : ${questions.length-correct}<br>
📊 Score : ${correct}/${questions.length}
`;

}
