let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {

    document.getElementById("progress").innerHTML =
    "Question " + (currentQuestion + 1) + " / " + questions.length;

    let q = questions[currentQuestion];

    let html = `
    <div class="question">
        <h2>${q.question}</h2>
    `;

    q.options.forEach((option,index)=>{

        html += `
        <label>
        <input type="radio"
        name="answer"
        value="${index}">
        ${option}
        </label>
        `;

    });

    html += "</div>";

    document.getElementById("quiz").innerHTML = html;

}

loadQuestion();let correct=0;

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
