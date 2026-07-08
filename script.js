const questions = [
{
question:"CPU යන්නෙහි සම්පූර්ණ නම කුමක්ද?",
options:[
"Central Processing Unit",
"Computer Processing Unit",
"Central Program Unit",
"Computer Program Utility"
],
answer:0
}
];

const quiz=document.getElementById("quiz");

questions.forEach((q,index)=>{

let html=`<div class="question">
<h3>${index+1}. ${q.question}</h3>`;

q.options.forEach((option,i)=>{
html+=`
<label>
<input type="radio" name="q${index}" value="${i}">
${option}
</label>`;
});

html+=`</div>`;

quiz.innerHTML+=html;

});

function submitQuiz(){

let correct=0;

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
