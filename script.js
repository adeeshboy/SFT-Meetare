// Login Function
function login() {

    let username = document.getElementById("username").value.trim();

    if (username == "") {
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("username", username);

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";

    document.getElementById("welcomeText").innerHTML =
        "Welcome " + username;

}

// Start Quiz
function startQuiz() {

    document.getElementById("homePage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";

    loadQuestion();

}

// Variables
let currentQuestion = 0;
let answers = [];

// Load Question
function loadQuestion() {

    let q = questions[currentQuestion];

    document.getElementById("progress").innerHTML =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    let html = `
        <h3>${q.question}</h3>
    `;

    q.options.forEach((option, index) => {

        html += `
        <label>
            <input type="radio" name="answer" value="${index}">
            ${option}
        </label><br><br>
        `;

    });

    document.getElementById("quiz").innerHTML = html;

}

// Next, Previous සහ Submit functions
// අපි ඊළඟ Part එකේ හදමු.
