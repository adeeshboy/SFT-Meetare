const sftLessons = [
    { id: "all", title: "All Lessons", desc: "සියලුම පාඩම් වල මිශ්‍ර ප්‍රශ්න", icon: "📋" },
    { id: 1, title: "01. වර්ගඵලය හා පරිමාව", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "📐" },
    { id: 2, title: "02. මිනුම් ඒකක හා මිනුම් උපකරණ", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "📏" },
    { id: 3, title: "03. පයිතගරස් සම්බන්ධය", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "🔺" },
    { id: 4, title: "04. ජීව විද්‍යා කොටස්", desc: "සෛල, ශාක පටක, ක්ෂුද්‍ර ජීවීන් සහ වනාන්තර", icon: "🌱" },
    { id: 5, title: "05. බලය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "💥" },
    { id: 6, title: "06. කාර්යය, ශක්තිය, ජවය", desc: "ක්ෂමතාව - 12 ශ්‍රේණිය", icon: "⚡" },
    { id: 7, title: "07. ත්‍රිකෝණමිතික අනුපාත", desc: "ගණිතය - 12 ශ්‍රේණිය", icon: "📉" },
    { id: 8, title: "08. භ්‍රමණ චලිතය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔄" },
    { id: 9, title: "09. විද්‍යුතය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔌" },
    { id: 10, title: "10.  තාපය", desc: "භෞතික විද්‍යාව - 12 ශ්‍රේණිය", icon: "🔥" },
    { id: 11, title: "11.  තාප රසායනය", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "🧪" },
    { id: 12, title: "12. චාලක රසායනය", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "⏳" },
    { id: 13, title: "13. ජෛව අණු", desc: "රසායන විද්‍යාව - 12 ශ්‍රේණිය", icon: "🧬" },
    { id: 14, title: "14. බහුඅවයවීක", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🧱" },
    { id: 15, title: "15. පදාර්ථයේ යාන්ත්‍රික ගුණ", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "💎" },
    { id: 16, title: "16. තරල", desc: "භෞතික විද්‍යාව - 13 ශ්‍රේණිය", icon: "💧" },
    { id: 17, title: "17. රසායනික කර්මාන්ත", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🏭" },
    { id: 18, title: "18. ස්වාභාවික නිෂ්පාදන", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🌿" },
    { id: 19, title: "19. ඛණ්ඩාංක ජ්‍යාමිතිය", desc: "ඒකජ ශ්‍රිත හා වර්ගජ ශ්‍රිත - 13 ශ්‍රේණිය", icon: "📊" },
    { id: 20, title: "20. සංඛ්‍යානය", desc: "ගණිතය - 13 ශ්‍රේණිය", icon: "🔢" },
    { id: 21, title: "21. පරිගණක පද්ධතිය හා උපාංග", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "🖥️" },
    { id: 22, title: "22. Operating Systems (OS)", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "⚙️" },
    { id: 23, title: "23. යෙදුම් මෘදුකාංග", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "📱" },
    { id: 24, title: "24. අන්තර්ජාලය", desc: "තොරතුරු තාක්ෂණය - 13 ශ්‍රේණිය", icon: "🌐" },
    { id: 25, title: "25. පාරිසරික සමතුලිතතාව", desc: "රසායන විද්‍යාව - 13 ශ්‍රේණිය", icon: "🌍" }
];

const allQuestions = [
    { lesson: 1, question: "අරය r සහ උස h වූ සෘජු වෘත්තාකාර සිලින්ඩරයක පරිමාව සෙවීමේ සූත්‍රය කුමක්ද?", options: ["πr²h", "2πrh", "1/3 πr²h", "4/3 πr³"], answer: 0 },
    { lesson: 1, question: "පැත්තක දිග x වූ ඝනකයක සම්පූර්ණ පෘෂ්ඨ වර්ගඵලය කුමක්ද?", options: ["x³", "4x²", "6x²", "2x²"], answer: 2 },
    { lesson: 1, question: "අරය r වූ ගෝලයක මතුපිට වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["πr²", "2πr²", "3πr²", "4πr²"], answer: 3 },
    { lesson: 1, question: "අරය r වූ ගෝලයක පරිමාව සෙවීමේ නිවැරදි සූත්‍රය තෝරන්න.", options: ["1/3 πr³", "2/3 πr³", "4/3 πr³", "πr³"], answer: 2 },
    { lesson: 1, question: "ඇල උස l සහ ආධාරකයේ අරය r වූ සෘජු වෘත්තාකාර කේතුවක වක්‍ර පෘෂ්ඨ වර්ගඵලය කුමක්ද?", options: ["πrl", "2πrl", "πr²h", "πr(r + l)"], answer: 0 },
    { lesson: 1, question: "ආධාරකයේ අරය r සහ සිරස් උස h වූ කේතුවක පරිමාව සෙවීමේ සූත්‍රය කුමක්ද?", options: ["πr²h", "1/3 πr²h", "2/3 πr²h", "4/3 πr²h"], answer: 1 },
    { lesson: 1, question: "දිග l, පළල w සහ උස h වූ සෘජුකෝණාස්‍රාකාර ප්‍රිස්මයක (ඝනකාවක) පරිමාව වන්නේ,", options: ["l + w + h", "2(lw + lh + wh)", "l × w × h", "lh + wh"], answer: 2 },
    { lesson: 1, question: "පැත්තක දිග 5 cm වූ ඝනකයක පරිමාව කොපමණද?", options: ["25 cm³", "125 cm³", "150 cm³", "50 cm³"], answer: 1 },
    { lesson: 1, question: "පැත්තක දිග 4 cm වූ ඝනකයක සම්පූර්ණ පෘෂ්ඨ වර්ගඵලය ගණනය කරන්න.", options: ["64 cm²", "96 cm²", "16 cm²", "48 cm²"], answer: 1 },
    { lesson: 1, question: "අරය 7 cm වූ අර්ධ ගෝලයක වක්‍ර පෘෂ්ඨ වර්ගඵලය කොපමණද? (π = 22/7 ලෙස ගන්න)", options: ["154 cm²", "308 cm²", "616 cm²", "462 cm²"], answer: 1 },
    { lesson: 1, question: "නිරීක්ෂණය කරන ලද තද අර්ධ ගෝලයක සම්පූර්ණ පෘෂ්ඨ වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["2πr²", "3πr²", "4πr²", "πr²"], answer: 1 },
    { lesson: 1, question: "කේතුවක ආධාරකයේ අරය 3 cm ද, සිරස් උස 4 cm ද නම් එහි ඇල උස (l) කොපමණද?", options: ["5 cm", "7 cm", "25 cm", "12 cm"], answer: 0 },
    { lesson: 1, question: "සෘජුකෝණාස්‍රාකාර ප්‍රිස්මයක දිග 6 cm, පළල 3 cm සහ උස 2 cm නම් එහි සම්පූර්ණ පෘෂ්ඨ වර්ගඵලය කීයද?", options: ["36 cm²", "72 cm²", "64 cm²", "54 cm²"], answer: 2 },
    { lesson: 1, question: "සිලින්ඩරයක වක්‍ර පෘෂ්ඨ වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["2πrh", "πr²h", "2πr(r + h)", "πrh"], answer: 0 },
    { lesson: 1, question: "සිලින්ඩරයක සම්පූර්ණ පෘෂ්ඨ වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["2πrh", "2πr²", "2πr(r + h)", "πr²h"], answer: 2 },
    { lesson: 1, question: "අරය 7 cm සහ උස 10 cm වූ සෘජු වෘත්තාකාර සිලින්ඩරයක පරිමාව කොපමණද? (π = 22/7)", options: ["1540 cm³", "440 cm³", "2200 cm³", "770 cm³"], answer: 0 },
    { lesson: 1, question: "ඝනකයක පරිමාව 216 cm³ නම්, එහි එක පැත්තක දිග කොපමණද?", options: ["4 cm", "6 cm", "8 cm", "16 cm"], answer: 1 },
    { lesson: 1, question: "ත්‍රිකෝණාකාර ප්‍රිස්මයක පරිමාව සෙවීමේ පොදු ක්‍රමය කුමක්ද?", options: ["ආධාරකයේ වර්ගඵලය × සිරස් උස", "පැති තුනේ එකතුව × උස", "1/3 × ආධාරකයේ වර්ගඵලය × උස", "දිග × පළල"], answer: 0 },
    { lesson: 1, question: "සිලින්ඩරයක අරය දෙගුණ කර උස වෙනස් නොකර තැබුවහොත් එහි පරිමාවට සිදුවන්නේ කුමක්ද?", options: ["දෙගුණ වේ", "තෙගුණ වේ", "හතර ගුණ වේ", "වෙනස් නොවේ"], answer: 2 },
    { lesson: 1, question: "ගෝලයක අරය දෙගුණ කළහොත් එහි මතුපිට වර්ගඵලය කී ගුණයකින් වැඩිවේද?", options: ["2 ගුණයකින්", "4 ගුණයකින්", "8 ගුණයකින්", "16 ගුණයකින්"], answer: 1 },
    { lesson: 1, question: "ගෝලයක අරය දෙගුණ කළහොත් එහි පරිමාව මුල් පරිමාව මෙන් කී ගුණයක් වේද?", options: ["2", "4", "8", "6"], answer: 2 },
    { lesson: 1, question: "සෘජු පිරමිඩයක පරිමාව සෙවීමේ සූත්‍රය කුමක්ද?", options: ["ආධාරක වර්ගඵලය × උස", "1/2 × ආධාරක වර්ගඵලය × උස", "1/3 × ආධාරක වර්ගඵලය × සිරස් උස", "2/3 × ආධාරක වර්ගඵලය × උස"], answer: 2 },
    { lesson: 1, question: "පැත්තක දිග 10 cm වූ සමචතුරස්‍රාකාර පිරමිඩයක සිරස් උස 9 cm නම් එහි පරිමාව කොපමණද?", options: ["900 cm³", "300 cm³", "450 cm³", "100 cm³"], answer: 1 },
    { lesson: 1, question: "අරය 3 cm සහ ඇල උස 7 cm වූ කේතුවක වක්‍ර පෘෂ්ඨ වර්ගඵලය සොයන්න. (π = 22/7)", options: ["66 cm²", "132 cm²", "198 cm²", "44 cm²"], answer: 0 },
    { lesson: 1, question: "අරය 7 cm වූ ගෝලයක මතුපිට වර්ගඵලය කොපමණද? (π = 22/7)", options: ["154 cm²", "308 cm²", "616 cm²", "462 cm²"], answer: 2 },
    { lesson: 1, question: "කේතුවක අරය r ද උස h ද වන විට එහි ඇල උස l සෙවීමේ පයිතගරස් සම්බන්ධය කුමක්ද?", options: ["l = r + h", "l² = r² + h²", "l = r² + h²", "l² = r² - h²"], answer: 1 },
    { lesson: 1, question: "ලීටර 1ක් (1 L) ඝන සෙන්ටිමීටර (cm³) කීයකට සමානද?", options: ["100 cm³", "1000 cm³", "10000 cm³", "10 cm³"], answer: 1 },
    { lesson: 1, question: "ඝන මීටර 1ක් (1 m³) ලීටර (L) කීයකට සමානද?", options: ["100 L", "1000 L", "10000 L", "500 L"], answer: 1 },
    { lesson: 1, question: "සිලින්ඩරයක වක්‍ර පෘෂ්ඨය දිග හැරිය විට ලැබෙන ජ්‍යාමිතික හැඩය කුමක්ද?", options: ["වෘත්තයක්", "ත්‍රිකෝණයක්", "සෘජුකෝණාස්‍රයක්", "සමාන්තරාස්‍රයක්"], answer: 2 },
    { lesson: 1, question: "සිලින්ඩරයක දිග හැරිය වක්‍ර පෘෂ්ඨයේ සෘජුකෝණාස්‍රයේ දිග සමාන වන්නේ කුමකටද?", options: ["සිලින්ඩරයේ උසට", "ආධාරක වෘත්තයේ පරිධියට (2πr)", "ආධාරක වෘත්තයේ වර්ගඵලයට", "සිලින්ඩරයේ අරයට"], answer: 1 },
    { lesson: 1, question: "වානේ බෝලයක අරය 3 cm වේ. එහි පරිමාව π ඇසුරින් කොපමණද?", options: ["12π cm³", "36π cm³", "27π cm³", "9π cm³"], answer: 1 },
    { lesson: 1, question: "විෂ්කම්භය 14 cm වූ ගෝලයක අරය api සොයමු.", options: ["14 cm", "28 cm", "7 cm", "3.5 cm"], answer: 2 },
    { lesson: 1, question: "කේතුවක පරිමාව වෘත්තාකාර සිලින්ඩරයක පරිමාව මෙන් කොපමණ පංගුවක්ද? (අරය සහ උස සමාන විට)", options: ["අඩක් (1/2)", "තුනෙන් පංගුවක් (1/3)", "හතරෙන් පංගුවක් (1/4)", "සමාන වේ"], answer: 1 },
    { lesson: 1, question: "දිග 5m, පළල 4m සහ ගැඹුර 2m වූ ජල ටැංකියක උපරිම ජල ධාරිතාව ලීටර කීයද?", options: ["40 L", "4000 L", "40000 L", "400 L"], answer: 2 },
    { lesson: 1, question: "කේතුවකආධාරකයේ වර්ගඵලය 25 cm² ද උස 6 cm ද නම් එහි පරිමාව කොපමණද?", options: ["150 cm³", "50 cm³", "75 cm³", "25 cm³"], answer: 1 },
    { lesson: 1, question: "සෘජුකෝණී ත්‍රිකෝණාකාර ප්‍රිස්මයක ආධාරකයේ පාද 3cm, 4cm, 5cm වේ. එහි දිග 10cm නම් පරිමාව කීයද?", options: ["60 cm³", "120 cm³", "200 cm³", "150 cm³"], answer: 0 },
    { lesson: 1, question: "කේතුවක වක්‍ර පෘෂ්ඨය දිග හැරිය විට ලැබෙන හැඩය කුමක්ද?", options: ["වෘත්ත ඛණ්ඩයක් (කේන්ද්‍රික ඛණ්ඩයක්)", "සෘජුකෝණාස්‍රයක්", "ත්‍රිකෝණයක්", "ඕවලයක්"], answer: 0 },
    { lesson: 1, question: "අරය 10 cm වූ වෘත්තයක 180° ක කෝණයක් සහිත කේන්ද්‍රික ඛණ්ඩයක චාප දිග කුමක්ද?", options: ["5π cm", "10π cm", "20π cm", "15π cm"], answer: 1 },
    { lesson: 1, question: "කේන්ද්‍රික ඛණ්ඩයක චාප දිග සෙවීමේ සූත්‍රය කුමක්ද?", options: ["(θ/360) × πr²", "(θ/360) × 2πr", "2πr", "πr²"], answer: 1 },
    { lesson: 1, question: "කේන්ද්‍රික ඛණ්ඩයක වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["(θ/360) × 2πr", "(θ/360) × πr²", "πr²h", "2πrh"], answer: 1 },
    { lesson: 1, question: "අරය 7 cm වූ බටයක දිග 100 cm වේ. එහි වක්‍ර පෘෂ්ඨ වර්ගඵලය සොයන්න. (π = 22/7)", options: ["4400 cm²", "15400 cm²", "2200 cm²", "7700 cm²"], answer: 0 },
    { lesson: 1, question: "හිස් සිලින්ඩරාකාර ටැංකියක අරය 1m සහ උස 7m වේ. එය සම්පූර්ණයෙන් පිරවීමට අවශ්‍ය ජල පරිමාව m³ කීයද?", options: ["22 m³", "154 m³", "11 m³", "44 m³"], answer: 0 },
    { lesson: 1, question: "ඝනකයක සම්පූර්ණ පෘෂ්ඨ වර්ගඵලය 24 cm² නම් එහි එක පැත්තක දිග සෙවූ විට ලැබෙන්නේ,", options: ["2 cm", "4 cm", "6 cm", "8 cm"], answer: 0 },
    { lesson: 1, question: "සමචතුරස්‍රයක පැත්තක දිග a නම් එහි වර්ගඵලය a² වේ. එහි විකර්ණයේ දිග කුමක්ද?", options: ["2a", "a√2", "a/√2", "a²"], answer: 1 },
    { lesson: 1, question: "ත්‍රිකෝණයක වර්ගඵලය සෙවීමේ මූලික සූත්‍රය කුමක්ද?", options: ["දිග × පළල", "1/2 × ආධාරක පාදයේ දිග × සිරස් උස", "පාදය × උස", "1.5 × පාදය × උස"], answer: 1 },
    { lesson: 1, question: "සමාන්තරාස්‍රයක වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["1/2 × ආධාරක පාදය × සිරස් උස", "ආධාරක පාදය × සිරස් උස", "දිග × පළල", "විකර්ණ දෙකේ ගුණිතය"], answer: 1 },
    { lesson: 1, question: "ත්‍රපීසියමක වර්ගඵලය සෙවීමේ නිවැරදි සූත්‍රය තෝරන්න.", options: ["1/2 × සමාන්තර පාදවල එකතුව × ඒවා අතර සිරස් දුර", "සමාන්තර පාදවල එකතුව × උස", "පාදය × උස", "දිග × පළල"], answer: 0 },
    { lesson: 1, question: "විෂ්කම්භය d වූ වෘත්තයක වර්ගඵලය d ඇසුරින් ලියූ විට ලැබෙන්නේ,", options: ["πd²", "πd²/4", "2πd", "πd"], answer: 1 },
    { lesson: 1, question: "කේතුවක අරය සහ සිරස් උස සමාන වේ (r = h). එහි පරිමාව ප්‍රකාශ වන සූත්‍රය කුමක්ද?", options: ["1/3 πr³", "1/3 πr²", "πr³", "2/3 πr³"], answer: 0 },
    { lesson: 1, question: "කාසි 10ක් එක මත එක තැබූ විට සෑදෙන ඝන වස්තුවේ හැඩය කුමක්ද?", options: ["ඝනකය", "කේතුව", "සිලින්ඩරය", "ප්‍රිස්මය"], answer: 2 }
];

let questions = []; 
let currentQuestion = 0;
let score = 0;
let totalTime = 600; 
let timerInterval;
let isMenuOpen = false;
let userAnswers = [];

// Auto-Login Check on Load
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("sft_username");
    if (savedUser) {
        window.showDashboard(savedUser, null);
    }
    
    // Manual Login Button Action Listener
    const loginBtn = document.querySelector(".action-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.checkLogin();
        });
    }
});

window.generateLessonsDashboard = function() {
    const container = document.getElementById("lessons-container");
    if (!container) return; 
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

window.toggleMenu = function() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = isMenuOpen ? "-260px" : "0px";
    isMenuOpen = !isMenuOpen;
}

window.calculateExamCountdown = function() {
    const examDate = new Date("August 1, 2027").getTime(); 
    const now = new Date().getTime();
    const difference = examDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        document.getElementById("days-count").textContent = days;
    } else {
        document.getElementById("days-count").textContent = "00";
    }
}

window.togglePasswordVisibility = function() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👁️";
    }
}

window.checkLogin = function() {
    const nameInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value;
    const rememberMeChecked = document.getElementById("remember-me").checked;
    const containerBox = document.querySelector(".quiz-container");
    const errorMsg = document.getElementById("login-error");

    if (nameInput !== "" && passInput === "1234") {
        errorMsg.style.display = "none";
        if (rememberMeChecked) {
            localStorage.setItem("sft_username", nameInput);
        }
        window.showDashboard(nameInput, null);
    } else {
        errorMsg.style.display = "block";
        containerBox.classList.add("shake-animation");
        setTimeout(() => {
            containerBox.classList.remove("shake-animation");
        }, 400);
    }
}

window.showDashboard = function(username, photoURL) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("home-page").style.display = "block";
    document.getElementById("user-display").textContent = username;
    document.getElementById("sidebar-username").textContent = username;
    document.querySelector(".menu-open-btn").style.display = "block"; 
    
    const imgTag = document.getElementById("sidebar-user-img");
    const avatarFallback = document.getElementById("profile-avatar-fallback");
    if (photoURL && imgTag) {
        imgTag.src = photoURL;
        imgTag.style.display = "block";
        if(avatarFallback) avatarFallback.style.display = "none";
    } else if (imgTag) {
        imgTag.style.display = "none";
        if(avatarFallback) avatarFallback.style.display = "block";
    }

    window.generateLessonsDashboard();
    window.calculateExamCountdown();
}

window.selectLesson = function(lessonId, lessonTitle) {
    if (isMenuOpen) window.toggleMenu(); 

    if (lessonId === 'all') {
        questions = [...allQuestions];
        document.getElementById("quiz-topic-title").textContent = "All Lessons MCQ";
    } else {
        questions = allQuestions.filter(q => q.lesson == lessonId);
        document.getElementById("quiz-topic-title").textContent = lessonTitle;
    }

    if (questions.length > 0) {
        currentQuestion = 0;
        score = 0;
        totalTime = 600;
        userAnswers = [];
        clearInterval(timerInterval);
        
        document.getElementById("home-page").style.display = "none";
        document.getElementById("result-box").style.display = "none";
        document.getElementById("quiz-page").style.display = "block";
        
        loadQuestion();
        startTimer();
    } else {
        alert("📊 මෙම පාඩමට තවමත් ප්‍රශ්න ඇතුළත් කර නොමැත! ළඟදීම බලාපොරොත්තු වන්න.");
    }
}

function loadQuestion() {
    document.getElementById("progress").innerHTML = `Question ${currentQuestion + 1} / ${questions.length}`;
    let progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progressPercentage + "%";

    let q = questions[currentQuestion];
    let html = `<div class="question"><h3 style="margin-bottom:20px; font-size:17px; color:#1e293b; text-align:left;">${q.question}</h3><div class="options-container">`;

    q.options.forEach((option, index) => {
        html += `
        <label class="option-label" id="label-${index}" onclick="highlightOption(${index})">
            <input type="radio" name="answer" value="${index}" style="display:none;">
            <span>${index + 1}. ${option}</span>
        </label>
        `;
    });

    html += `</div></div>`;
    document.getElementById("quiz").innerHTML = html;
}

window.highlightOption = function(index) {
    const labels = document.querySelectorAll('.option-label');
    labels.forEach(label => {
        label.style.background = "#f8fafc";
        label.style.borderColor = "#e2e8f0";
    });
    
    const activeLabel = document.getElementById(`label-${index}`);
    activeLabel.style.background = "#f3e8ff";
    activeLabel.style.borderColor = "#7c3aed";
    
    const radio = activeLabel.querySelector('input[type="radio"]');
    radio.checked = true;
}

window.nextQuestion = function() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        alert("කරුණාකර ඉදිරියට යාමට පෙර පිළිතුරක් තෝරන්න!");
        return;
    }

    let answerVal = parseInt(selectedOption.value);
    userAnswers.push(answerVal);

    if (answerVal === questions[currentQuestion].answer) {
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
        document.getElementById("timer").textContent = 
            (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);

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

    let reviewHtml = `<div class="result-review-box" style="margin-top:20px; max-height:230px; overflow-y:auto; text-align:left; padding-right:5px;">`;
    
    questions.forEach((q, i) => {
        let isCorrect = userAnswers[i] === q.answer;
        reviewHtml += `
            <div style="padding:12px; border-radius:10px; margin-bottom:8px; background:${isCorrect ? '#d1fae5' : '#fee2e2'}; border-left:5px solid ${isCorrect ? '#10b981' : '#ef4444'}">
                <p style="font-size:13px; font-weight:bold; color:#1e293b;">${i+1}. ${q.question}</p>
                <p style="font-size:12px; margin-top:4px; color:#475569;">ඔයාගේ පිළිතුර: ${q.options[userAnswers[i]] || 'නොමැත'} ${isCorrect ? '✅' : '❌'}</p>
                ${!isCorrect ? `<p style="font-size:12px; color:#059669; font-weight:600;">නිවැරදි පිළිතුර: ${q.options[q.answer]}</p>` : ''}
            </div>
        `;
    });
    reviewHtml += `</div>`;

    document.getElementById("result").innerHTML = `
        <div style="font-size:20px; font-weight:800; color:#7c3aed; margin-bottom:15px;">Final Score: ${score} / ${questions.length}</div>
        <p style="font-size:14px; font-weight:600; color:#1e293b; text-align:left;">📊 ප්‍රශ්න පත්‍රයේ විවරණය (Review):</p>
        ${reviewHtml}
    `;
}

window.backToHome = function() {
    clearInterval(timerInterval);
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("home-page").style.display = "block";
}

window.showSidebarModal = function(type) {
    if (isMenuOpen) window.toggleMenu();
    const modal = document.getElementById("info-modal");
    const contentBox = document.getElementById("modal-body-content");
    let html = "";
    if (type === 'about') {
        html = `<h2>ℹ️ About Owner</h2><p style="margin-top:14px; line-height:1.5; font-size:14px;">Welcome to <b>SFT Meetare</b>! Created by Adeesha Lakshitha to help Technology stream students score A grades.</p>`;
    } else if (type === 'review') {
        html = `<h2>⭐ Reviews & Feedback</h2><textarea id="feedback-text" style="width:100%; height:80px; margin:15px 0; padding:10px; border-radius:8px; border:1px solid #cbd5e1;" placeholder="Write review..."></textarea><button onclick="alert('Thank you for review!')" class="action-btn">Submit</button>`;
    } else if (type === 'privacy') {
        html = `<h2>🔒 Privacy Policy</h2><p style="margin-top:14px; font-size:12px; line-height:1.4; text-align:left;">We use Google AdSense cookies to show optimized ads for students visiting SFT Meetare.</p>`;
    } else if (type === 'terms') {
        html = `<h2>📜 Terms & Conditions</h2><p style="margin-top:14px; font-size:12px; line-height:1.4;">All content is provided strictly for educational and model testing purposes.</p>`;
    }
    contentBox.innerHTML = html;
    modal.style.display = "block";
}

window.closeSidebarModal = function() { document.getElementById("info-modal").style.display = "none"; }
window.onclick = function(e) { if(e.target == document.getElementById("info-modal")) window.closeSidebarModal(); }
