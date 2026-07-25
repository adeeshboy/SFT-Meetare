// ==========================================================================
// 🚀 SFT MEETARE - FINAL PRODUCTION READY CODE (WITH ADMIN PANEL & MCQ DB)
// ==========================================================================

// --- STATE VARIABLES ---
let currentSelectedSubject = "ALL";
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 120; 
let activeQuestionsList = []; 

// Admin Email Validation
const ADMIN_EMAIL = "adeeshboy0@gmail.com".toLowerCase();

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

// --- FULL SFT MCQ QUESTIONS DATABASE ---
const sftQuestionsDatabase = {
    1: [
    { q: "අරය 6 cm වන ඝන ලෝහමය ගෝලයක් සම්පූර්ණයෙන් උණු කර, පතුලේ අරය 2 cm හා සිරස් උස 3 cm වන කුඩා ඝන කේතු සාදන්නේ නම්, සෑදිය හැකි උපරිම කේතු ගණන කීයද?", options: ["36", "72", "144", "18"], correct: 1 },
    { q: "වෘත්තයක අරය 10% කින් වැඩි කළ හොත්, එහි වර්ගඵලය වැඩි වන ප්‍රතිශතය කොපමණද?", options: ["10%", "20%", "21%", "100%"], correct: 2 },
    { q: "හරස්කඩ වර්ගඵලය 45 cm² වන ඒකාකාර ප්‍රිස්මයක දිග 20 cm වේ. එහි පරිමාව කුමක්ද?", options: ["900 cm³", "450 cm³", "90 cm³", "9000 cm³"], correct: 0 },
    { q: "පතුලේ අරය 7 cm හා ආනත උස 10 cm වන ඝන කේතුවක මුළු පෘෂ්ඨ වර්ගඵලය කොපමණද? (π = 22/7)", options: ["220 cm²", "154 cm²", "374 cm²", "474 cm²"], correct: 2 },
    { q: "අරය 7 m සහ ගැඹුර 2 m වන සිලින්ඩරාකාර ටැංකියක අඩංගු කළ හැකි උපරිම ජල පරිමාව ලීටර (Liters) වලින් කොපමණද? (π = 22/7)", options: ["308 L", "308,000 L", "30,800 L", "154,000 L"], correct: 1 },
    { q: "සමාන්තර පාදවල දිග 12 cm හා 8 cm වන ද, එම පාද අතර ලම්බක දුර 5 cm වන ද ත්‍රපීසියමක වර්ගඵලය කුමක්ද?", options: ["100 cm²", "50 cm²", "480 cm²", "25 cm²"], correct: 1 },
    { q: "අරය 14 cm සහ කේන්ද්‍රික කෝණය 90° වන වෘත්ත ඛණ්ඩයක පරිමිතිය කොපමණද? (π = 22/7)", options: ["22 cm", "36 cm", "50 cm", "44 cm"], correct: 2 },
    { q: "අරය r වන ඝන අර්ධ ගෝලයක මුළු පෘෂ්ඨ වර්ගඵලය සෙවීම සඳහා නිවැරදි සූත්‍රය කුමක්ද?", options: ["2πr²", "3πr²", "4πr²", "(2/3)πr³"], correct: 1 },
    { q: "දිග, පළල සහ උස පිළිවෙළින් 8 cm, 6 cm සහ 4 cm වන ඝනකාභයකින් සම්පූර්ණයෙන් කපා ඉවත් කළ හැකි පැත්තක දිග 2 cm වන කුඩා ඝනක ගණන කීයද?", options: ["12", "24", "48", "96"], correct: 1 },
    { q: "කේතුවක පතුලේ අරය දෙගුණ කර එහි සිරස් උස අඩක් කළහොත්, එහි නව පරිමාව හා මුල් පරිමාව අතර අනුපාතය කුමක්ද?", options: ["1:1", "2:1", "4:1", "1:2"], correct: 1 },
    { q: "හරස්කඩ වර්ගඵලය 5 cm² වන නළයක් තුලින් තත්පරයට 10 cm වේගයකින් ජලය ගලා යයි. මිනිත්තුවකදී ගලා යන ජල පරිමාව ලීටර වලින් කොපමණද?", options: ["3 L", "30 L", "50 L", "300 L"], correct: 0 },
    { q: "වක්‍ර පෘෂ්ඨ වර්ගඵලය 440 cm² ද, උස 10 cm ද වන සෘජු වෘත්තාකාර සිලින්ඩරයක පතුලේ අරය කොපමණද? (π = 22/7)", options: ["7 cm", "14 cm", "21 cm", "3.5 cm"], correct: 0 },
    { q: "සමාන්තරාස්‍රයක ආධාරක පාදයේ දිග 15 cm හා එහි වර්ගඵලය 120 cm² වේ නම්, එහි ලම්බක උස කොපමණද?", options: ["6 cm", "8 cm", "10 cm", "12 cm"], correct: 1 },
    { q: "පදනම සමචතුරස්‍රාකාර වන පිරමීඩයක පදනමේ පැත්තක දිග 10 cm වේ. එහි සිරස් උස 12 cm නම්, පිරමීඩයේ පරිමාව කොපමණද?", options: ["1200 cm³", "600 cm³", "400 cm³", "300 cm³"], correct: 2 },
    { q: "අරය r වන ඝන අර්ධ ගෝලයක් මත, පතුලේ අරය r හා සිරස් උස h වන කේතුවක් හරියටම සවිකර ඇත. මෙම සංයුක්ත ඝනයේ මුළු පරිමාව කුමක්ද?", options: ["(1/3)πr²(2r + h)", "(1/3)πr²(r + h)", "(2/3)πr²(r + h)", "(1/3)πr²(r + 2h)"], correct: 0 },
    { q: "පැත්තක දිග 4 cm වන සමපාද ත්‍රිකෝණයක වර්ගඵලය කුමක්ද?", options: ["4√3 cm²", "8√3 cm²", "16√3 cm²", "12 cm²"], correct: 0 },
    { q: "පැත්තක දිග 14 cm වන සමචතුරස්‍රයක් තුළ හරියටම ස්පර්ශ වන සේ ඇඳිය හැකි විශාලතම වෘත්තයේ වර්ගඵලය කොපමණද? (π = 22/7)", options: ["196 cm²", "154 cm²", "44 cm²", "88 cm²"], correct: 1 },
    { q: "ගෝලයක අරය 10% කින් අඩු කළහොත්, එහි පරිමාව අඩුවන ආසන්න ප්‍රතිශතය කොපමණද?", options: ["10%", "20%", "27.1%", "30%"], correct: 2 },
    { q: "කේතුවක පරිමාව 12π cm³ වේ. එහි සිරස් උස 4 cm නම්, පතුලේ අරය කොපමණද?", options: ["3 cm", "4 cm", "6 cm", "9 cm"], correct: 0 },
    { q: "දිග 10 m වන ඇළක හරස්කඩ ත්‍රපීසියම් හැඩයක් ගනී. එහි පතුලේ පළල 2 m ද, මතුපිට ජල මට්ටමේ පළල 4 m ද, ජලයේ ගැඹුර 1.5 m ද වේ. එහි ඇති ජල පරිමාව කොපමණද?", options: ["30 m³", "45 m³", "60 m³", "15 m³"], correct: 1 }
    ],
    2: [
    { q: "පහත දැක්වෙන ඒවායින් SI මූලික ඒකකයක් (Base SI unit) නොවන එකක් කුමක්ද?", options: ["මීටරය", "කිලෝග්‍රෑමය", "නිව්ටන්", "තත්පරය"], correct: 2 },
    { q: "සම්මත බර්නියර් කැලිපරයක (Vernier Caliper) අවම මිනුම (Least Count) කොපමණද?", options: ["0.1 mm", "0.01 mm", "1 mm", "0.001 mm"], correct: 0 },
    { q: "සම්මත ස්ක්‍රූ මයික්‍රමීටරයක (Micrometer Screw Gauge) අවම මිනුම කොපමණද?", options: ["0.1 mm", "0.01 mm", "0.001 mm", "1 mm"], correct: 1 },
    { q: "බර්නියර් කැලිපරයක চোන (jaws) එකිනෙක ස්පර්ශ කර ඇති විට, බර්නියර් පරිමාණයේ '0' ලකුණ ප්‍රධාන පරිමාණයේ '0' ලකුණට දකුණු පසින් පිහිටා ඇත. මෙහි පවතින ශුන්‍ය දෝෂය කුමන වර්ගයේ එකක්ද?", options: ["ධන ශුන්‍ය දෝෂයකි", "ඍණ ශුන්‍ය දෝෂයකි", "ශුන්‍ය දෝෂයක් නොමැත", "ක්‍රාමාංකන දෝෂයකි"], correct: 0 },
    { q: "ගෝලමීටරයක් (Spherometer) මඟින් ප්‍රධාන වශයෙන් මැනිය හැක්කේ කුමක්ද?", options: ["සිහින් තහඩුවක ඝණකම හෝ ගෝලීය පෘෂ්ඨයක වක්‍රතා අරය", "ද්‍රවයක ඝනත්වය", "කම්බියක විෂ්කම්භය පමණි", "වායුගෝලීය පීඩනය"], correct: 0 },
    { q: "ඝනත්වයේ SI ඒකකය කුමක්ද?", options: ["g cm⁻³", "kg m⁻³", "N m⁻²", "kg m⁻² s⁻¹"], correct: 1 },
    { q: "0.00450 යන අංකයේ අර්ථවත් ඉලක්කම් (Significant figures) ගණන කොපමණද?", options: ["2", "3", "5", "6"], correct: 1 },
    { q: "පර්යේෂණයකදී උපකරණයක් නිසා නිතිපතා සිදුවන ක්‍රමික දෝෂයක් (Systematic error) අවම කරගන්නේ කෙසේද?", options: ["කියවීම් රාශියක් ගෙන සාමාන්‍යය ගැනීමෙන්", "උපකරණය නිසි ලෙස ක්‍රමාංකනය කිරීමෙන් (Calibration)", "ඉක්මනින් කියවීම් ලබා ගැනීමෙන්", "පරිසර උෂ්ණත්වය වැඩි කිරීමෙන්"], correct: 1 },
    { q: "ස්ක්‍රූ මයික්‍රමීටරයක වෘත්තීය පරිමාණයේ එක් සම්පූර්ණ භ්‍රමණයකදී කුරුස්නා (spindle) ඉදිරියට හෝ පසුපසට ගමන් කරන දුර හැඳින්වෙන්නේ කුමන නමකින්ද?", options: ["අවම මිනුම", "පිච් එක (Pitch)", "මයික්‍රෝ අරය", "ශුන්‍ය දෝෂය"], correct: 1 },
    { q: "බර්නියර් කැලිපරයක ප්‍රධාන පරිමාණ පාඨාංකය 2.3 cm ද, බර්නියර් පරිමාණයේ සමපාත වන කොටස 6 (අවම මිනුම 0.01 cm වන) වේ නම්, මුළු පාඨාංකය කොපමණද?", options: ["2.36 cm", "2.9 cm", "2.306 cm", "2.6 cm"], correct: 0 },
    { q: "ස්ක්‍රූ මයික්‍රමීටරයක ප්‍රධාන පරිමාණ පාඨාංකය 3.5 mm වන අතර, වෘත්තීය පරිමාණයේ 28 වන කොටස මිනුම් රේඛාව සමඟ සමපාත වේ (අවම මිනුම 0.01 mm). කියවීම කොපමණද?", options: ["3.78 mm", "3.28 mm", "6.3 mm", "3.528 mm"], correct: 0 },
    { q: "මිනුමක 'නිරවද්‍යතාවය' (Accuracy) යනු කුමක්ද?", options: ["ලබාගත් අගයන් එකිනෙකට සමීප වීම", "සත්‍ය අගයට (True value) ඉතා සමීප වීම", "උපකරණයේ අවම මිනුම කුඩා වීම", "අහඹු දෝෂ නොමැති වීම"], correct: 1 },
    { q: "බලයේ (Force) මාන සූත්‍රය (Dimensional formula) කුමක්ද?", options: ["MLT⁻²", "ML²T⁻²", "MLT⁻¹", "M⁰LT⁻²"], correct: 0 },
    { q: "පීඩනයේ SI ඒකකය වන පැස්කල් (Pascal) යනු පහත දැක්වෙන කුමකට සමානද?", options: ["N m⁻²", "N m⁻³", "kg m s⁻²", "J m⁻³"], correct: 0 },
    { q: "ගෝලමීටරයක කකුල් තුනක අಂತರය මැනීමට සහ වක්‍රතා අරය සෙවීමේ සූත්‍රයේ එන 'h' මඟින් නිරූපණය වන්නේ කුමක්ද?", options: ["තහඩුවේ ඝණකම", "කකුල් තුන අතර දුර",, "මධ්‍යම ඉස්කුරුප්පුවේ උස් පහත් වීම (Sagitta)", "ගෝලයේ අරය"], correct: 2 },
    { q: "සංචාරක අන්වීක්ෂයක් (Travelling Microscope) භාවිතයෙන් මැනිය හැක්කේ කුමක්ද?", options: ["ඉතා කුඩා දිග හෝ විස්ථාපන (උදා: කේශනාලිකා උස)", "සෛලයක අභ්‍යන්තර ව්‍යුහය", "බැක්ටීරියා ප්‍රමාණය", "ග්‍රහලෝක අතර දුර"], correct: 0 },
    { q: "ස්ක්‍රූ මයික්‍රමීටරයක +0.03 mm ක ධන ශුන්‍ය දෝෂයක් පවතී. එයින් ලබාගත් පරීක්ෂණ කියවීම 5.25 mm නම්, නිවැරදි කරන ලද අවසාන කියවීම කොපමණ විය යුතුද?", options: ["5.28 mm", "5.22 mm", "5.25 mm", "5.21 mm"], correct: 1 },
    { q: "මිනුම් සිලින්ඩරයකින් ද්‍රවයක පරිමාව මැනීමේදී ද්‍රව මතුපිට අවතල චන්ද්‍රිකාවක (Concave meniscus) නිවැරදි කියවීම ලබාගන්නේ කෙසේද?", options: ["චන්ද්‍රිකාවේ පහළම ලක්ෂ්‍යය මිනුම් රේඛාවට සමාන කර බැලීමෙන්", "චන්ද්‍රිකාවේ ඉහළම ලක්ෂ්‍යය බැලීමෙන්", "සිලින්ඩරයේ ඉහළම කෙළවරින් බැලීමෙන්", "චන්ද්‍රිකාව නොසලකා හැරීමෙන්"], correct: 0 },
    { q: "SI පද්ධතියේ මූලික භෞතික රාශි ගණන කොපමණද?", options: ["3", "5", "7", "9"], correct: 2 },
    { q: "දිග මැනීමේදී සිදුවන නිරපේක්ෂ දෝෂ අඩංගු රාශි එකතු කිරීමේදී හෝ අඩු කිරීමේදී, ප්‍රතිඵලයේ නිරපේක්ෂ දෝෂවලට සිදුවන්නේ කුමක්ද?", options: ["නිරපේක්ෂ දෝෂ එකතු වේ", "නිරපේක්ෂ දෝෂ අඩු වේ", "සාපේක්ෂ දෝෂ එකතු වේ", "දෝෂ ශුන්‍ය වේ"], correct: 0 },
    { q: "මිනුමක නිරපේක්ෂ දෝෂය 0.2 cm වන අතර මිනුමේ අගය 20 cm වේ. ප්‍රතිශත දෝෂය (Percentage error) කොපමණද?", options: ["0.1%", "1%", "2%", "10%"], correct: 1 },
    { q: "ස්ක්‍රූ මයික්‍රමීටරයක පිච් (Pitch) එක 0.5 mm වන අතර වෘත්තීය පරිමාණයේ කොටස් 50ක් ඇත. එහි අවම මිනුම කොපමණද?", options: ["0.01 mm", "0.001 mm", "0.1 mm", "0.05 mm"], correct: 0 },
    { q: "ඉලෙක්ට්‍රොනික තුලානක් (Electronic balance) භාවිතා කිරීමේ ප්‍රධාන වාසියක් වන්නේ කුමක්ද?", options: ["ශුන්‍ය දෝෂ සම්පූර්ණයෙන්ම නොමැති වීම", "මිලිග්‍රෑම් මට්ටමේ ඉතා කුඩා ස්කන්ධ වෙනස්වීම් නිවැරදිව මැනිය හැකි වීම", "ස්කන්ධය වෙනුවට බර පෙන්වීම", "විදුලි බලය අවශ්‍ය නොවීම"], correct: 1 },
    { q: "උපකරණයකින් මැනිය හැකි කුඩාම ධාරිතාව හෝ අගය හැඳින්වෙන්නේ කුමන නමකින්ද?", options: ["අවම මිනුම (Least Count)", "පරාසය (Range)", "නිරවද්‍යතාවය (Accuracy)", "සංවේදීතාවය (Sensitivity)"], correct: 0 },
    { q: "අහඹු දෝෂ (Random errors) අවම කරගැනීම සඳහා වඩාත්ම සුදුසු ක්‍රමය කුමක්ද?", options: ["කියවීම් කිහිපයක් ගෙන ඒවායේ මධ්‍යන්‍යය (Average) ගැනීම", "උපකරණය අලුත්වැඩියා කිරීම", "නව උපකරණයක් මිලදී ගැනීම", "ශුන්‍ය දෝෂය පමණක් සකස් කිරීම"], correct: 0 },
    { q: "බර්නියර් පරිමාණයක් භාවිතා කිරීමේ ප්‍රධාන අරමුණ කුමක්ද?", options: ["ප්‍රධාන පරිමාණයේ කුඩා බෙදුමකට වඩා ඉතා කුඩා අගයන් (දශම ස්ථාන) නිවැරදිව කියවා ගැනීම", "උපකරණයේ බර අඩු කර ගැනීම", "වර්ණ හැඩය බැලීම", "ස්කන්ධය මැනීම"], correct: 0 },
    { q: "ඩිජිටල් නැවතුම් ඔරලෝසුවක (Digital Stopwatch) සාමාන්‍ය අවම මිනුම කොපමණ වේද?", options: ["1 s", "0.01 s", "1 minute", "0.001 s"], correct: 1 },
    { q: "භෞතික සමීකරණයක් මාන සමගාමී වීමට (Dimensionally consistent) නම්, කුමක් සිදුවිය යුතුද?", options: ["සමීකරණයේ දෙපස ඇති පදවල මාන සමාන විය යුතුය", "සංඛ්‍යාත්මක අගයන් සමාන විය යුතුය", "ඒකක මීටර විය යුතුය", "ස්කන්ධය නොසලකා හැරිය යුතුය"], correct: 0 },
    { q: "පාර්ශ්වික දෝෂ (Parallax errors) නිසා කියවීම්වල සිදුවන වෙනස්වීම් අයත් වන්නේ කුමන දෝෂ කාණ්ඩයටද?", options: ["පරීක්ෂක දෝෂ / මානව දෝෂ (Human errors)", "අහඹු දෝෂ", "උපකරණ දෝෂ", "ස්වභාවික දෝෂ"], correct: 0 },
    { q: "භෞතික රාශියක මාන සමීකරණය මඟින් නිරූපණය කරන්නේ කුමක්ද?", options: ["එම රාශිය පදනම් රාශි මත යෙදී ඇති ආකාරය", "එහි නිවැරදි සංඛ්‍යාත්මක අගය", "එහි මිනුම් උපකරණයේ දෝෂය", "එහි ඇති අර්ථවත් ඉලක්කම් ගණන"], correct: 0 }
    ],

    3: [
    { q: "සෘජුකෝණී ත්‍රිකෝණයක කර්ණය හැර අනෙක් පාද දෙකෙහි දිග පිළිවෙළින් 5 cm සහ 12 cm වේ. එහි කර්ණයේ දිග කොපමණද?", options: ["14 cm", "13 cm", "15 cm", "17 cm"], correct: 1 },
    { q: "සෘජුකෝණී ත්‍රිකෝණයක කර්ණයේ දිග 25 cm ද, එක් පාදයක දිග 7 cm ද වේ. අනෙක් පාදයේ දිග කොපමණද?", options: ["20 cm", "22 cm", "24 cm", "18 cm"], correct: 2 },
    { q: "දිග 10 m වන ඉණිමඟක් සිරස් බිත්තියකට හේත්තු කර ඇත. ඉණිමඟේ ඉහළ කෙළවර බිම සිට 8 m උසකින් පිහිටයි නම්, ඉණිමඟේ පාමුල සිට බිත්තියට ඇති තිරස් දුර කොපමණද?", options: ["5 m", "2 m", "4 m", "6 m"], correct: 3 },
    { q: "දිග 15 cm සහ පළල 8 cm වන සෘජුකෝණාස්‍රයක විකර්ණයක (Diagonal) දිග කොපමණද?", options: ["17 cm", "23 cm", "19 cm", "21 cm"], correct: 0 },
    { q: "සමචතුරස්‍රයක විකර්ණයේ දිග 10√2 cm වේ. එහි පැත්තක දිග කොපමණද?", options: ["20 cm", "100 cm", "5 cm", "10 cm"], correct: 3 },
    { q: "නැවක් වරායකින් පිටත්ව උතුරු දිශාවට 30 km ගමන් කර, ඉන්පසු නැගෙනහිර දිශාවට 40 km ගමන් කරයි. දැන් නැව වරායේ සිට කොපමණ සරල රේඛීය දුරකින් පිහිටා තිබේද?", options: ["70 km", "50 km", "10 km", "60 km"], correct: 1 },
    { q: "පැත්තක දිග 6 cm වන සමපාද ත්‍රිකෝණයක ලම්බක උස (Altitude) කොපමණද?", options: ["6√3 cm", "4.5 cm", "3√3 cm", "3 cm"], correct: 2 },
    { q: "රොම්බසයක (Rhombus) විකර්ණ දෙකෙහි දිග පිළිවෙළින් 16 cm හා 12 cm වේ. එහි පැත්තක දිග කොපමණද?", options: ["14 cm", "10 cm", "20 cm", "28 cm"], correct: 1 },
    { q: "දිග 4 cm, පළල 3 cm සහ උස 12 cm වන ඝනකාභයක (Cuboid) ප්‍රධාන විකර්ණයේ දිග කොපමණද?", options: ["15 cm", "19 cm", "13 cm", "14 cm"], correct: 2 },
    { q: "සමද්වීපාද ත්‍රිකෝණයක සමාන පාද දෙකෙහි දිග 10 cm බැගින් වන අතර එහි පාදමේ (ආධාරකයේ) දිග 12 cm වේ. ත්‍රිකෝණයේ ලම්බක උස කොපමණද?", options: ["6 cm", "10 cm", "8 cm", "4 cm"], correct: 2 },
    { q: "කාටිසීය ඛණ්ඩාංක තලයක පිහිටි (1, 2) සහ (4, 6) යන ලක්ෂ්‍ය දෙක අතර සරල රේඛීය දුර කොපමණද?", options: ["7", "3", "4", "5"], correct: 3 },
    { q: "පතුලේ අරය 5 cm සහ සිරස් උස 12 cm වන ඍජු වෘත්තාකාර කේතුවක ආනත උස (Slant height) කොපමණද?", options: ["13 cm", "17 cm", "15 cm", "14 cm"], correct: 0 },
    { q: "තිරස් බිමක 15 m සහ 20 m උසින් යුත් සිරස් කණු දෙකක් පිහිටා ඇත. ඒවායේ පාමුල අතර දුර 12 m නම්, කණු දෙකේ මුදුන් අතර දුර කොපමණද?", options: ["17 m", "13 m", "15 m", "25 m"], correct: 1 },
    { q: "අරය 13 cm වන වෘත්තයක කේන්ද්‍රයේ සිට 5 cm දුරින් පිහිටි ජ්‍යායතයක (Chord) සම්පූර්ණ දිග කොපමණද?", options: ["12 cm", "26 cm", "10 cm", "24 cm"], correct: 3 },
    { q: "පහත දී ඇති පාද දිගවලින් සෘජුකෝණී ත්‍රිකෝණයක් නිර්මාණය කළ හැක්කේ කුමන කට්ටලයෙන්ද?", options: ["(5, 7, 9)", "(6, 8, 10)", "(9, 12, 16)", "(4, 5, 6)"], correct: 1 },
    { q: "ත්‍රිකෝණයක පාද වල දිග a, b සහ c වේ. එහි c² = a² + b² නම්, c පාදයට සම්මුඛ කෝණයේ අගය කොපමණද?", options: ["45°", "60°", "90°", "180°"], correct: 2 },
    { q: "සුළඟකට කැඩී ගිය ගසක ඉහළ කොටස බිම ස්පර්ශ කරන්නේ ගසේ මුලේ සිට 12 m දුරිනි. ගස කැඩී ඇත්තේ බිම සිට 9 m උසකින් නම්, ගසේ මුල් උස කොපමණද?", options: ["15 m", "24 m", "21 m", "25 m"], correct: 1 },
    { q: "O කේන්ද්‍රය හා අරය 7 cm වූ වෘත්තයකට බාහිර P ලක්ෂ්‍යයක සිට ස්පර්ශකයක් ඇඳ ඇත. වෘත්ත කේන්ද්‍රයේ සිට P ලක්ෂ්‍යයට ඇති දුර 25 cm නම්, ස්පර්ශකයේ දිග කොපමණද?", options: ["26 cm", "18 cm", "24 cm", "32 cm"], correct: 2 },
    { q: "සෘජුකෝණී ත්‍රිකෝණයක කර්ණය මත ඇඳි සමචතුරස්‍රයේ වර්ගඵලය 100 cm² ද, එක් පාදයක් මත ඇඳි සමචතුරස්‍රයේ වර්ගඵලය 36 cm² ද වේ. අනෙක් පාදයේ දිග කුමක්ද?", options: ["64 cm", "8 cm", "6 cm", "10 cm"], correct: 1 },
    { q: "සෘජුකෝණී ත්‍රිකෝණයක කර්ණයේ දිග 13 cm වන අතර එහි පරිමිතිය 30 cm වේ. මෙම ත්‍රිකෝණයේ වර්ගඵලය කොපමණද?", options: ["60 cm²", "65 cm²", "45 cm²", "30 cm²"], correct: 3 }
    ],

    5: [
    { q: "දිග 10 m හා ස්කන්ධය 2 kg වූ ඒකාකාර දණ්ඩක් එහි එක් කෙළවරක සිට 2 m දුරින් පිහිටි ලක්ෂ්‍යයකින් සමතුලිත කර ඇත. දණ්ඩ තිරස්ව තබා ගැනීමට එම කෙළවරේ එල්ලා තැබිය යුතු ස්කන්ධය කොපමණද?", options: ["4 kg", "3 kg", "2 kg", "6 kg"], correct: 1 },
    { q: "තිරසට θ කෝණයකින් ආනත වූ රළු තලයක් මත m ස්කන්ධයක් සහිත වස්තුවක් නිශ්චලව පවතී. වස්තුව මත ක්‍රියා කරන ඝර්ෂණ බලයේ විශාලත්වය කුමක්ද?", options: ["μmg cosθ", "mg cosθ", "μmg sinθ", "mg sinθ"], correct: 3 },
    { q: "0.5 kg ස්කන්ධයක් ඇති බෝලයක් 10 m s⁻¹ ක ප්‍රවේගයකින් ගොස් සිරස් බිත්තියක වැදී, නැවත 6 m s⁻¹ ක ප්‍රවේගයකින් ආපසු පැමිණේ. බෝලය මත ඇති වූ ආවේගය (Impulse) කොපමණද?", options: ["2 N s", "4 N s", "8 N s", "16 N s"], correct: 2 },
    { q: "3 kg සහ 2 kg ස්කන්ධයන් දෙකක් සැහැල්ලු තන්තුවක දෙකෙළවරට ගැටගසා, සුමට කප්පියක් හරහා යවා ඇත. පද්ධතිය මුදාහළ විට ස්කන්ධයන්ගේ ත්වරණය කොපමණද? (g = 10 m s⁻²)", options: ["1 m s⁻²", "2 m s⁻²", "5 m s⁻²", "10 m s⁻²"], correct: 1 },
    { q: "සිරස් උස h වූ තුනී කුහර කේතුවක (Hollow cone) ගුරුත්ව කේන්ද්‍රය එහි පතුලේ කේන්ද්‍රයේ සිට කොපමණ උසකින් පිහිටයිද?", options: ["h/2", "h/3", "h/4", "2h/3"], correct: 1 },
    { q: "ස්කන්ධය 10 kg වූ වස්තුවක් තිරස් රළු පෘෂ්ඨයක් මත ඇත. වස්තුව හා පෘෂ්ඨය අතර ඝර්ෂණ සංගුණකය 0.4 වේ. වස්තුව මත 30 N ක තිරස් බලයක් යෙදූ විට, එය මත ක්‍රියා කරන ඝර්ෂණ බලය කොපමණද?", options: ["0 N", "10 N", "30 N", "40 N"], correct: 2 },
    { q: "0.2 kg ස්කන්ධයක් දිග 1 m වූ තන්තුවක ගැටගසා තිරස් වෘත්තාකාර පථයක 2 rad s⁻¹ ක කෝණික ප්‍රවේගයකින් භ්‍රමණය කරයි. තන්තුවේ ආතතිය කොපමණද?", options: ["0.8 N", "1.6 N", "0.4 N", "2.0 N"], correct: 0 },
    { q: "20 m s⁻¹ ක ප්‍රවේගයෙන් ගමන් කරන 2000 kg ස්කන්ධයක් ඇති මෝටර් රථයක් තිරිංග යොදා 50 m දුරකින් නතර කරනු ලැබේ. මේ සඳහා යෙදිය යුතු නියත ප්‍රතිරෝධී බලය කොපමණද?", options: ["4 kN", "8 kN", "10 kN", "16 kN"], correct: 1 },
    { q: "ස්කන්ධය 60 kg වූ පුද්ගලයෙක් විදුලි සෝපානයක් (Lift) තුළ සිටී. සෝපානය 2 m s⁻² ක ත්වරණයකින් ඉහළට ගමන් කරයි නම්, පුද්ගලයාගේ දෘශ්‍ය බර (Apparent weight) කොපමණද? (g = 10 m s⁻²)", options: ["480 N", "600 N", "720 N", "800 N"], correct: 2 },
    { q: "ස්කන්ධය 4 kg වූ රයිෆලයකින් 0.05 kg ස්කන්ධයක් ඇති උණ්ඩයක් 400 m s⁻¹ ක ප්‍රවේගයකින් පිටවේ. රයිෆලයේ පසුපසට ගමන් කිරීමේ ප්‍රවේගය (Recoil velocity) කොපමණද?", options: ["2.5 m s⁻¹", "4 m s⁻¹", "5 m s⁻¹", "10 m s⁻¹"], correct: 2 },
    { q: "දුම්රිය එන්ජිමක් 5000 N ක නියත බලයක් යොදමින් 20 m s⁻¹ ක නියත ප්‍රවේගයකින් දුම්රියක් ඇදගෙන යයි. එන්ජිමේ ක්ෂමතාවය (Power) කොපමණද?", options: ["100 kW", "50 kW", "250 kW", "10 kW"], correct: 0 },
    { q: "ස්කන්ධය M වූ ඒකාකාර ඉණිමඟක් සුමට සිරස් බිත්තියකට හේත්තු කර ඇත්තේ තිරස සමඟ θ කෝණයක් සාදමිනි. බිත්තියෙන් ඉණිමඟට ඇති කරන ප්‍රතික්‍රියාව කුමක්ද?", options: ["Mg tanθ", "Mg sinθ", "(Mg/2) cotθ", "(Mg/2) tanθ"], correct: 2 },
    { q: "බල නියතය k = 200 N m⁻¹ වූ දුන්නක් 0.1 m ප්‍රමාණයකින් සම්පීඩනය කර ඇත. දුන්න මගින් ඇති කරන ප්‍රත්‍යානයන බලය (Restoring force) කොපමණද?", options: ["10 N", "20 N", "200 N", "2 N"], correct: 1 },
    { q: "ගුරුත්වය යටතේ ගමන් කරන ප්‍රක්ෂේපිතයක (Projectile) උපරිම උසෙහිදී, එය මත ක්‍රියා කරන සම්ප්‍රයුක්ත බලයේ දිශාව කුමක්ද? (වායු ප්‍රතිරෝධය නොසලකා හරින්න)", options: ["තිරස්ව ඉදිරියට", "සිරස්ව ඉහළට", "ශුන්‍ය වේ", "සිරස්ව පහළට"], correct: 3 },
    { q: "ස්කන්ධය 2 kg වූ වස්තුවක් 5 m උසක සිට නිශ්චලතාවයෙන් පහළට වැටේ. එය පොළොවට ගැටීමට මොහොතකට පෙර එහි ඇති චාලක ශක්තිය කොපමණද?", options: ["50 J", "100 J", "200 J", "10 J"], correct: 1 },
    { q: "5 kg ස්කන්ධයක් ඇති A වස්තුවක්, 10 kg ස්කන්ධයක් ඇති B වස්තුවක් මත ඇත. B වස්තුව සුමට තිරස් තලයක් මත පවතී. A හා B අතර ඝර්ෂණ සංගුණකය 0.2 වේ. වස්තු දෙක එකට ගමන් කිරීමට නම් B මත යෙදිය හැකි උපරිම බලය කොපමණද?", options: ["15 N", "20 N", "30 N", "50 N"], correct: 2 },
    { q: "විෂ්කම්භය 0.4 m වූ සුක්කානමක (Steering wheel) දෙපසට 20 N බැගින් වූ බල යුග්මයක් (Couple) ස්පර්ශකව යොදනු ලැබේ. එහි බල ඝූර්ණය (Torque) කොපමණද?", options: ["4 N m", "8 N m", "16 N m", "0 N m"], correct: 1 },
    { q: "10 g ස්කන්ධයක් ඇති උණ්ඩයක් 500 m s⁻¹ ප්‍රවේගයෙන් ගොස් ලී කුට්ටියක වැදී 5 cm ක් දුරට ගමන් කර නතර වේ. ලී කුට්ටියෙන් උණ්ඩය මත යෙදූ සාමාන්‍ය ප්‍රතිරෝධී බලය කොපමණද?", options: ["12.5 kN", "25.0 kN", "50.0 kN", "125.0 kN"], correct: 1 },
    { q: "1000 kg ස්කන්ධයක් ඇති මෝටර් රථයක් 50 m අරයක් ඇති තිරස් වෘත්තාකාර මාර්ගයක වංගුවක් ගනී. ටයර් සහ පාර අතර ඝර්ෂණ සංගුණකය 0.8 නම්, එයට ගමන් කළ හැකි උපරිම වේගය කොපමණද?", options: ["10 m s⁻¹", "15 m s⁻¹", "20 m s⁻¹", "40 m s⁻¹"], correct: 2 },
    { q: "එකම තලයක ක්‍රියා කරන 3 N, 4 N සහ 5 N බල තුනක් යටතේ අංශුවක් සමතුලිතතාවයේ පවතී. 3 N සහ 4 N බල අතර කෝණය කොපමණද?", options: ["60°", "90°", "120°", "180°"], correct: 1 }
    ],

    6: [
        { q: "කාර්යය (Work Done) ගණනය කරනු ලබන නිවැරදි සූත්‍රය කුමක්ද?", options: ["W = F / d", "W = F * d", "W = m * g", "W = P * t"], correct: 1 }
    ],
    7: [
        { q: "සෘජුකෝණී ත්‍රිකෝණයක Sin θ අනුපාතය සමාන වන්නේ?", options: ["සම්මුඛ / කර්ණය", "සන්නිහිත / කර්ණය", "සම්මුඛ / සන්නිහිත", "කර්ණය / සම්මුඛ"], correct: 0 }
    ],
    8: [
        { q: "කෝණික ප්‍රවේගය මැනීමේ SI ඒකකය කුමක්ද?", options: ["m/s", "rad/s", "deg/s", "rpm"], correct: 1 }
    ],
    9: [
        { q: "ඕම්ගේ නියමයට (Ohm's Law) අදාළ නිවැරදි සූත්‍රය තෝරන්න.", options: ["V = I / R", "V = I * R", "I = V * R", "P = V * I"], correct: 1 }
    ],
    10: [
        { q: "තාපය මැනීමේ SI ඒකකය කුමක්ද?", options: ["Celsius", "Kelvin", "Joule", "Calorie"], correct: 2 }
    ],
    21: [
        { q: "පරිගණකයක ප්‍රධාන සැකසුම් ඒකකය (CPU) තුළ අඩංගු නොවන කොටස කුමක්ද?", options: ["CU", "ALU", "RAM", "Registers"], correct: 2 },
        { q: "1 GB සමාන වන්නේ මෙයින් කුමකටද?", options: ["1024 MB", "1024 KB", "1000 MB", "1024 Bytes"], correct: 0 }
    ],
    22: [{ q: "OS යනු කුමක්ද?", options: ["මෘදුකාංගයක්", "දෘඩාංගයක්", "ප්‍රතිදාන උපාංගයක්", "Input එකක්"], correct: 0 }],
    23: [{ q: "Excel යනු කුමක්ද?", options: ["Spreadsheet", "Word", "Browser", "Game"], correct: 0 }],
    24: [{ q: "HTTP හි අර්ථය?", options: ["Hypertext Transfer Protocol", "Hyper Transfer Tool", "High Tech Protocol", "Hyper Text Tool"], correct: 0 }]
};

const papersList = [
    { id: "p1", title: "2024 A/L SFT Past Paper", emoji: "📝" },
    { id: "p2", title: "2025 A/L SFT Past Paper", emoji: "📜" },
    { id: "p3", title: "SFT Model Paper - 01", emoji: "💎" }
];

// ==========================================
// 🔴 FIREBASE CONFIGURATION & AUTHENTICATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyBBtsKSoSb5_7_C1HNevt66IqeAQH8ASHs",
    authDomain: "sft-meetare.firebaseapp.com",
    projectId: "sft-meetare",
    storageBucket: "sft-meetare.firebasestorage.app",
    messagingSenderId: "333390520435",
    appId: "1:333390520435:web:3ee83fd2e5812160f84a06",
    measurementId: "G-NFFZSJHMM5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore(); // Firestore එක Add කළා
const provider = new firebase.auth.GoogleAuthProvider();

// Database එකෙන් අනුමත කරපු ප්‍රශ්න ටික App එකට Load කරගැනීම
async function loadApprovedQuestions() {
    try {
        const snapshot = await db.collection('approved_mcqs').get();
        snapshot.forEach(doc => {
            const data = doc.data();
            if(!sftQuestionsDatabase[data.lessonId]) {
                sftQuestionsDatabase[data.lessonId] = [];
            }
            sftQuestionsDatabase[data.lessonId].push({
                q: data.question,
                options: data.options,
                correct: parseInt(data.correctOption)
            });
        });
        console.log("Approved Community Questions Loaded!");
    } catch (e) {
        console.error("Error loading approved questions", e);
    }
}
loadApprovedQuestions();

// App State Check (Firebase Auth Observer)
auth.onAuthStateChanged((user) => {
    if (user) {
        loginSuccess(user.displayName || "Student");
        
        // ADMIN CHECK ⚙️
        if (user.email && user.email.toLowerCase() === ADMIN_EMAIL) {
            const adminTab = document.getElementById('tab-admin');
            if(adminTab) adminTab.style.display = "inline-block";
        }
    } else {
        const savedUser = sessionStorage.getItem('sft_user');
        if (savedUser) {
            loginSuccess(savedUser);
        } else {
            showLoginPage();
        }
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

document.getElementById('google-login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider).catch((error) => {
        alert("Google ගිණුම හරහා ඇතුළු වීමේදී ගැටළුවක්! Error: " + error.message);
    });
});

document.getElementById('login-form').addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const usernameValue = document.getElementById('username').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    if (passwordValue === "1234") {
        sessionStorage.setItem('sft_user', usernameValue); loginSuccess(usernameValue);
    } else { alert("වැරදි මුරපදයක්! (නැවත උත්සාහ කරන්න)"); }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => { sessionStorage.removeItem('sft_user'); location.reload(); });
});

document.getElementById('toggle-password').addEventListener('click', function() { 
    const p = document.getElementById('password'); 
    p.type = (p.type === 'password') ? 'text' : 'password'; 
    this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');
});

// ==========================================
// ➕ ADD MCQ TO DATABASE SYSTEM
// ==========================================
function showAddMcqModal() {
    const select = document.getElementById('mcq-lesson');
    if(select) {
        select.innerHTML = "";
        Object.keys(sftLessonsList).forEach(key => {
            select.innerHTML += `<option value="${key}">${sftLessonsList[key].name}</option>`;
        });
        document.getElementById('add-mcq-modal').style.display = "flex";
    }
}
function closeAddMcqModal() {
    const modal = document.getElementById('add-mcq-modal');
    if(modal) modal.style.display = "none";
}

async function submitNewMcq() {
    const user = auth.currentUser;
    if(!user) return alert("ප්‍රශ්න යැවීමට කරුණාකර Google ගිණුම හරහා ලොග් වෙන්න!");

    const lessonId = document.getElementById('mcq-lesson').value;
    const q = document.getElementById('mcq-q').value.trim();
    const o0 = document.getElementById('mcq-opt0').value.trim();
    const o1 = document.getElementById('mcq-opt1').value.trim();
    const o2 = document.getElementById('mcq-opt2').value.trim();
    const o3 = document.getElementById('mcq-opt3').value.trim();
    const correct = document.getElementById('mcq-correct').value;

    if(!q || !o0 || !o1 || !o2 || !o3) {
        return alert("කරුණාකර ප්‍රශ්නය සහ පිළිතුරු 4 ම සම්පූර්ණ කරන්න!");
    }

    try {
        await db.collection('pending_mcqs').add({
            lessonId: lessonId,
            question: q,
            options: [o0, o1, o2, o3],
            correctOption: correct,
            author: user.displayName || "Student",
            email: user.email || "No Email",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("ඔබේ ප්‍රශ්නය සාර්ථකව යැව්වා! Admin එය පරීක්ෂා කර පබ්ලිශ් කරනු ඇත.");
        closeAddMcqModal();
        
        document.getElementById('mcq-q').value = "";
        document.getElementById('mcq-opt0').value = "";
        document.getElementById('mcq-opt1').value = "";
        document.getElementById('mcq-opt2').value = "";
        document.getElementById('mcq-opt3').value = "";
    } catch (e) {
        console.error(e);
        alert("දෝෂයක්! අන්තර්ජාලය පරීක්ෂා කරන්න. (Database Rules Error එකක් විය හැක)");
    }
}

// ==========================================
// ⚙️ ADMIN PANEL SYSTEM
// ==========================================
async function loadAdminPanel() {
    const container = document.getElementById('admin-pending-container');
    if(!container) return;
    container.innerHTML = "<p style='color:#007bff; text-align:center;'>🔄 පරීක්ෂා කරමින් පවතී...</p>";
    
    try {
        const snapshot = await db.collection('pending_mcqs').orderBy('timestamp', 'asc').get();
        container.innerHTML = "";
        
        if(snapshot.empty) {
            container.innerHTML = "<p style='color:#9ca3af; text-align:center;'>මේ මොහොතේ අලුතින් ප්‍රශ්න කිසිවක් ලැබී නැත.</p>";
            return;
        }
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const div = document.createElement('div');
            div.style = "background:#1a2332; padding:15px; border-radius:10px; border:1px solid #374151;";
            div.innerHTML = `
                <p style="color:#fbbf24; font-size:12px; margin-bottom:5px;"><strong>පාඩම:</strong> ${sftLessonsList[data.lessonId]?.name || data.lessonId}</p>
                <p style="font-size:15px; margin-bottom:10px;"><strong>Q:</strong> ${data.question}</p>
                <ul style="list-style:none; padding:0; font-size:14px; margin-bottom:10px; color:#d1d5db;">
                    <li style="margin-bottom:3px;">1. ${data.options[0]} ${data.correctOption == 0 ? "✅" : ""}</li>
                    <li style="margin-bottom:3px;">2. ${data.options[1]} ${data.correctOption == 1 ? "✅" : ""}</li>
                    <li style="margin-bottom:3px;">3. ${data.options[2]} ${data.correctOption == 2 ? "✅" : ""}</li>
                    <li>4. ${data.options[3]} ${data.correctOption == 3 ? "✅" : ""}</li>
                </ul>
                <p style="font-size:11px; color:#9ca3af; margin-bottom:15px;">යැව්වේ: ${data.author} (${data.email})</p>
                <div style="display:flex; gap:10px;">
                    <button onclick="approveMcq('${doc.id}')" style="padding:8px 15px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">Approve ✅</button>
                    <button onclick="rejectMcq('${doc.id}')" style="padding:8px 15px; background:#dc3545; color:white; border:none; border-radius:5px; cursor:pointer; width:100%;">Reject ❌</button>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (e) {
        container.innerHTML = "<p style='color:red;'>දෝෂයක්! Admin Panel Load කිරීමට නොහැක.</p>";
        console.error(e);
    }
}

async function approveMcq(docId) {
    try {
        const docRef = db.collection('pending_mcqs').doc(docId);
        const docSnap = await docRef.get();
        if(docSnap.exists) {
            const data = docSnap.data();
            await db.collection('approved_mcqs').add(data);
            await docRef.delete();
            
            alert("ප්‍රශ්නය සාර්ථකව පබ්ලිශ් කළා!");
            loadAdminPanel(); 
            
            if(!sftQuestionsDatabase[data.lessonId]) sftQuestionsDatabase[data.lessonId] = [];
            sftQuestionsDatabase[data.lessonId].push({
                q: data.question,
                options: data.options,
                correct: parseInt(data.correctOption)
            });
        }
    } catch(e) { alert("දෝෂයක්! Approve කිරීමට නොහැක."); console.error(e); }
}

async function rejectMcq(docId) {
    if(confirm("මෙම ප්‍රශ්නය ප්‍රතික්ෂේප කර මකා දැමීමට අවශ්‍ය බව විශ්වාසද?")) {
        await db.collection('pending_mcqs').doc(docId).delete();
        loadAdminPanel();
    }
}

// ==========================================
// --- UI CONTROL & FILTERS ---
// ==========================================
function switchView(viewType) {
    const sSection = document.getElementById('section-syllabus');
    const pSection = document.getElementById('section-papers');
    const aSection = document.getElementById('section-admin'); // Admin section
    const fBar = document.getElementById('subject-filter-bar');
    
    document.querySelectorAll('.switch-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${viewType}`).classList.add('active');
    
    // ඔක්කොම සඟවන්න
    sSection.style.display = "none";
    pSection.style.display = "none";
    if(aSection) aSection.style.display = "none";
    fBar.style.display = "none";

    // අදාළ දේවල් පමණක් පෙන්නන්න
    if (viewType === 'all') { 
        sSection.style.display = "block"; pSection.style.display = "block"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'syllabus') { 
        sSection.style.display = "block"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'papers') { 
        pSection.style.display = "block"; 
    }
    else if (viewType === 'admin') {
        if(aSection) aSection.style.display = "block";
        loadAdminPanel(); // Load Data from Firebase
    }
    
    generateDashboard();
    if(viewType === 'papers' || viewType === 'all') fetchPapers();
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
    papersList.forEach(p => {
        if(query === "" || p.title.toLowerCase().includes(query)) {
            const div = document.createElement('div'); div.className = 'lesson-box';
            div.innerHTML = `<span class="box-emoji">${p.emoji}</span><h3>${p.title}</h3>`;
            div.onclick = () => startQuiz(p.id, 'paper'); 
            pContainer.appendChild(div);
        }
    });

    if (query.length >= 3) { 
        pContainer.innerHTML += `<div id="api-loading" style="text-align:center; width:100%; color:#007bff; margin-top:20px;">🔄 "${query}" සඳහා API එකෙන් සොයමින්...</div>`;
        try {
            const response = await fetch(`https://pastpaperapi.dileepatechyt.workers.dev/search?q=${encodeURIComponent(query)}`);
            const apiData = await response.json();
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();
            let papersArray = Array.isArray(apiData) ? apiData : (apiData.data || apiData.results || []);

            if (papersArray.length > 0) {
                papersArray.forEach(p => {
                    const div = document.createElement('div'); div.className = 'lesson-box';
                    const paperTitle = p.title || p.name || "SFT Past Paper";
                    const paperUrl = p.url || p.link || "";

                    div.innerHTML = `
                        <div style="font-size: 10px; background: #1a2332; display: inline-block; padding: 3px 8px; border-radius: 4px; color: #9ca3af; margin-bottom: 5px; font-weight: bold;">WIKI PAPER</div>
                        <h3 style="font-size: 15px; margin-bottom: 15px;">${paperTitle}</h3>
                        <button onclick="downloadPaper('${paperUrl}', this)" class="btn-primary" style="border: none; cursor: pointer; display:inline-block; padding: 10px 15px; font-size: 14px; background:#001f3f; color:#fff; border-radius:8px; width:100%; text-align:center; border: 1px solid #004080;">
                            💻 ඇප් එක තුළින්ම කියවන්න
                        </button>
                    `;
                    pContainer.appendChild(div);
                });
            } else {
                 pContainer.innerHTML += `<p style='text-align:center; width:100%; color:#9ca3af; margin-top:15px;'>මෙම නමින් ප්‍රශ්න පත්‍ර හමුවුණේ නැත.</p>`;
            }
        } catch (e) {
            const loadingMsg = document.getElementById('api-loading');
            if (loadingMsg) loadingMsg.remove();
            pContainer.innerHTML += `<p style='text-align:center; width:100%; color:#ff4d4d; margin-top:15px; font-size: 13px;'>API සම්බන්ධතා දෝෂයක්!</p>`;
        }
    }
}

async function downloadPaper(originalUrl, btnElement) {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = "⏳ කරුණාකර රැඳී සිටින්න...";
    btnElement.style.pointerEvents = "none";
    btnElement.style.opacity = "0.7";
    try {
        const response = await fetch(`https://pastpaperapi.dileepatechyt.workers.dev/dl?url=${encodeURIComponent(originalUrl)}`);
        const data = await response.json();
        if (data && data.links) {
            const linkKeys = Object.keys(data.links);
            if (linkKeys.length > 0) {
                window.open(data.links[linkKeys[0]], '_blank');
            } else { alert("PDF ලින්ක් එක සොයාගැනීමට නොහැකි විය!"); }
        } else { alert("API එකෙන් නිවැරදි දත්ත ලැබුණේ නැත!"); }
    } catch (e) {
        alert("බාගත කිරීමේදී දෝෂයක්! අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කරන්න.");
    } finally {
        btnElement.innerHTML = originalText;
        btnElement.style.pointerEvents = "auto";
        btnElement.style.opacity = "1";
    }
}

// ==========================================
// --- DYNAMIC QUIZ ENGINE ---
// ==========================================
function startQuiz(id, type) {
    currentLesson = id; 
    currentQuestionIndex = 0; 
    score = 0;
    
    // ප්‍රශ්න තිබේදැයි පරීක්ෂා කිරීම
    if (type === 'syllabus' && sftQuestionsDatabase[id] && sftQuestionsDatabase[id].length > 0) {
        activeQuestionsList = sftQuestionsDatabase[id];
    } else {
        activeQuestionsList = [
            { q: `මෙම කොටසට අදාළ ප්‍රශ්න තවම එකතු කර නොමැත. ("Add MCQ" හරහා ඔබටත් ප්‍රශ්න යැවිය හැක!)`, options: ["හරි", "එලකිරි", "මම දාන්නම්", "කවුරුහරි දායි"], correct: 2 }
        ];
    }

    document.getElementById('home-page').classList.remove('active');
    setTimeout(() => { 
        document.getElementById('quiz-page').classList.add('active'); 
        loadQuestion(); 
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
