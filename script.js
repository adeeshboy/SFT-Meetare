// ==========================================================================
// 🚀 SFT MEETARE - FINAL PRODUCTION READY CODE (2 MINUTE TIMER UPDATED)
// ==========================================================================

// --- FIREBASE INITIALIZATION ---
const firebaseConfig = {
  apiKey: "AIzaSyBBtsKSoSb5_7_C1HNevt66IqeAQH8ASHs",
  authDomain: "sft-meetare.firebaseapp.com",
  projectId: "sft-meetare",
  storageBucket: "sft-meetare.firebasestorage.app",
  messagingSenderId: "333390520435",
  appId: "1:333390520435:web:3ee83fd2e5812160f84a06",
  measurementId: "G-NFFZSJHMM5"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// --- STATE VARIABLES ---
let currentSelectedSubject = "ALL";
let currentLesson = 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 120; // ⏱️ මුළු වෙලාව තත්පර 120 (මිනිත්තු 2) ලෙස වෙනස් කරන ලදී
let activeQuestionsList = []; 

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

// --- SFT MCQ QUESTIONS DATABASE ---
const sftQuestionsDatabase = {
    1: [
        { q: "සිලින්ඩරයක වක්‍ර පෘෂ්ඨ වර්ගඵලය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["2 * pi * r * h", "pi * r^2 * h", "2 * pi * r", "pi * r * l"], correct: 0 },
        { q: "අරය 7cm වන ගෝලයක මතුපිට වර්ගඵලය සොයන්න.", options: ["154 cm^2", "616 cm^2", "308 cm^2", "44 cm^2"], correct: 1 },
        { q: "ඝනකයක පැත්තක দিগ 2m නම් එහි මුළු පෘෂ්ඨ වර්ගඵලය කොපමණද?", options: ["4 m^2", "8 m^2", "24 m^2", "16 m^2"], correct: 2 },
        { q: "සෘජුකෝණාස්‍රාකාර ප්‍රිස්මයක පරිමාව සෙවීමට භාවිත කරන්නේ?", options: ["දිග x පළල", "දිග x පළල x උස", "1/3 x පාද වර්ගඵලය x උස", "හරස්කඩ වර්ගඵලය"], correct: 1 },
        { q: "කේතුවක පරිමාව, සමාන අරයක් සහ උසක් ඇති සිලින්ඩරයක පරිමාවෙන් කොපමණ කොටසක්ද?", options: ["අඩක්", "හතරෙන් පංගුවක්", "තුනෙන් එකක්", "දෙගුණයක්"], correct: 2 }
    ],
    2: [
        { q: "පහත දැක්වෙන ඒකක අතුරින් SI මූලික ඒකකයක් නොවන්නේ කුමක්ද?", options: ["කෙල්වින් (K)", "ඇම්පියරය (A)", "නිව්ටන් (N)", "කැන්ඩෙලා (cd)"], correct: 2 },
        { q: "පීඩනය මැනීමේ SI ව්‍යුත්පන්න ඒකකය කුමක්ද?", options: ["පැස්කල් (Pa)", "ජූල් (J)", "වොට් (W)", "නිව්ටන් (N)"], correct: 0 },
        { q: "මයික්‍රොමීටර 1ක් (1 micrometer) මීටර වලින් කොපමණද?", options: ["10^-3 m", "10^-6 m", "10^-9 m", "10^-12 m"], correct: 1 },
        { q: "වර්නියර් කැලිපරයක ප්‍රධාන පරිමාණ කොටසක් 1mm ද වර්නියර් කොටස් ගණන 50ක් ද නම් එහි කුඩාම මිනුම?", options: ["0.1 mm", "0.01 mm", "0.02 mm", "0.05 mm"], correct: 2 },
        { q: "ස්කන්ධය මැනීමේ ජාත්‍යන්තර සම්මත මූලික ඒකකය කුමක්ද?", options: ["ග්‍රෑම් (g)", "මිලිග්‍රෑම් (mg)", "කිලෝග්‍රෑම් (kg)", "තොන් (t)"], correct: 2 }
    ],
    3: [
        { q: "සෘජුකෝණී ත්‍රිකෝණයක සෘජුකෝණයට ඉදිරියෙන් ඇති පාදය හඳුන්වන්නේ කුමන නමකින්ද?", options: ["සන්නිහිත පාදය", "සම්මුඛ පාදය", "කර්ණය", "ලම්භය"], correct: 2 },
        { q: "පාදවල දිග 3cm සහ 4cm වන සෘජුකෝණී ත්‍රිකෝණයක කර්ණයේ දිග කොපමණද?", options: ["5 cm", "7 cm", "25 cm", "6 cm"], correct: 0 },
        { q: "පයිතගරස් ප්‍රමේයයට අනුව සත්‍ය ප්‍රකාශය තෝරන්න.", options: ["a^2 + b^2 = c^2", "a + b = c", "a^2 - b^2 = c^2", "a * b = c"], correct: 0 },
        { q: "කර්ණයේ දිග 13cm ද එක් පාදයක් 5cm ද වන සෘජුකෝණී ත්‍රිකෝණයක අනෙක් පාදයේ දිග?", options: ["8 cm", "12 cm", "14 cm", "10 cm"], correct: 1 },
        { q: "පහත සඳහන් සංඛ්‍යා ත්‍රිත්ව අතුරින් පයිතගරස් ත්‍රිත්වයක් වන්නේ කුමක්ද?", options: ["2, 3, 4", "5, 10, 15", "6, 8, 10", "4, 5, 6"], correct: 2 }
    ],
    5: [
        { q: "බලයේ SI ඒකකය කුමක්ද?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
        { q: "F = ma සූත්‍රයෙන් දැක්වෙන්නේ නිව්ටන්ගේ කීවැනි චලිත නියමයද?", options: ["පළමුවන නියමය", "දෙවන නියමය", "තෙවන නියමය", "සියල්ලම"], correct: 1 },
        { q: "වස්තුවක නිශ්චලතාව හෝ චලිත ස්වභාවය වෙනස් කිරීමට දක්වන අකමැත්ත හඳුන්වන්නේ?", options: ["වේගය", "ත්වරණය", "status", "ස්කන්ධය/ජඩත්වය"], correct: 3 },
        { q: "ඝර්ෂණ බලය සැමවිටම ක්‍රියා කරන්නේ කුමන දිශාවටද?", options: ["චලිත දිශාවට සමාන්තරව ඒ දෙසටම", "චලිත දිශාවට ලම්බකව", "චලිතය සිදුවන දිශාවට ප්‍රතිවිරුද්ධ දිශාවට", "පහළට"], correct: 2 },
        { q: "ස්කන්ධය 5kg වන වස්තුවක් මත 20N බලයක් යෙදූ විට ඇතිවන ත්වරණය කොපමණද?", options: ["4 m/s^2", "100 m/s^2", "0.25 m/s^2", "25 m/s^2"], correct: 0 }
    ],
    6: [
        { q: "කාර්යය (Work Done) ගණනය කරනු ලබන නිවැරදි සූත්‍රය කුමක්ද?", options: ["W = F / d", "W = F * d", "W = m * g", "W = P * t"], correct: 1 },
        { q: "පෘථිවි පෘෂ්ඨයේ සිට h උසකින් පිහිටි ස්කන්ධය m වන වස්තුවක ගබඩා වන ගුරුත්වාකර්ෂණ විභව ශක්තිය?", options: ["1/2 m v^2", "m g h", "F * d", "m v"], correct: 1 },
        { q: "ජවය (Power) මැනීමේ SI ඒකකය කුමක්ද?", options: ["ජූල් (J)", "නිව්ටන් (N)", "වොට් (W)", "පැස්කල් (Pa)"], correct: 2 },
        { q: "ප්‍රවේගය v සහ ස්කන්ධය m වන වස්තුවක චාලක ශක්තිය (Kinetic Energy) සමාන වන්නේ?", options: ["mgh", "mv", "1/2 m v^2", "F * v"], correct: 2 },
        { q: "තත්පර 10ක් තුළ ජූල් 500ක කාර්යයක් සිදු කරන යන්ත්‍රයක ජවය කොපමණද?", options: ["5000 W", "50 W", "0.02 W", "5 W"], correct: 1 }
    ],
    7: [
        { q: "සෘජුකෝණී ත්‍රිකෝණයක Sin තීටා (Sin θ) අනුපාතය සමාන වන්නේ?", options: ["සම්මුඛ පාදය / කර්ණය", "සන්නිහිත පාදය / කර්ණය", "සම්මුඛ පාදය / සන්නිහිත පාදය", "කර්ණය / සම්මුඛ පාදය"], correct: 0 },
        { q: "Tan θ අනුපාතය ලබා දෙන්නේ කුමන පාද අතර සබඳතාවයෙන්ද?", options: ["සම්මුඛ / කර්ණය", "සන්නිහිත / කර්ණය", "සම්මුඛ / සන්නිහිත", "කර්ණය / සන්නිහිත"], correct: 2 },
        { q: "Sin 30 හි අගය කුමක්ද?", options: ["1", "0.5", "0.707", "0.866"], correct: 1 },
        { q: "Cos θ යනු පහත කුමන අනුපාතයද?", options: ["සම්මුඛ / කර්ණය", "සන්නිහිත / කර්ණය", "සම්මුඛ / සන්නිහිත", "1 / Sin θ"], correct: 1 },
        { q: "පහත ප්‍රකාශන අතුරින් සැමවිටම සත්‍ය වන්නේ කුමක්ද?", options: ["Sin^2 θ + Cos^2 θ = 1", "Sin θ + Cos θ = 1", "Tan θ = Cos θ / Sin θ", "Sin θ = 1 / Tan θ"], correct: 0 }
    ],
    8: [
        { q: "කෝණික ප්‍රවේගය මැනීමේ SI ඒකකය කුමක්ද?", options: ["m/s", "rad/s", "deg/s", "rpm"], correct: 1 },
        { q: "භ්‍රමණ චලිතයේදී ස්කන්ධයට අනුරූපව සලකන භෞතික රාශිය කුමක්ද?", options: ["කෝණික ගම්‍යතාව", "ඝූර්ණ අරය", "භ්‍රමණ ජඩත්ව ඝූර්ණය (I)", "බල ඝූර්ණය"], correct: 2 },
        { q: "බලයක ඝූර්ණය (Torque) සෙවීමට බලය ගුණ කළ යුත්තේ කුමන දුරකින්ද?", options: ["භ්‍රමණ අක්ෂයේ සිට ඇති සෘජු දුරින්", "මුළු දුරින්", "ලම්බක දුරින්", "පරිධියේ දිගින්"], correct: 2 },
        { q: "වස්තුවක් තත්පරයකට වට 5ක් භ්‍රමණය වේ නම් එහි සංඛ්‍යාතය කොපමණද?", options: ["5 Hz", "10 Hz", "2.5 Hz", "0.2 Hz"], correct: 0 },
        { q: "කෝණික විස්ථාපනය මැනීමට භාවිත කරන ප්‍රධාන ඒකකය කුමක්ද?", options: ["මීටර්", "රේඩියන් (rad)", "අංශක", "නිව්ටන්"], correct: 1 }
    ],
    9: [
        { q: "ඕම්ගේ නියමයට (Ohm's Law) අදාළ නිවැරදි සූත්‍රය තෝරන්න.", options: ["V = I / R", "V = I * R", "I = V * R", "P = V * I"], correct: 1 },
        { q: "විද්‍යුත් ධාරාවක් මැනීම සඳහා පරිපථයකට ශ්‍රේණිගතව සම්බන්ධ කරන උපකරණය කුමක්ද?", options: ["වෝල්ට්මීටරය", "ඕම්මීටරය", "ඇමීටරය", "ගැල්වනෝමීටරය"], correct: 2 },
        { q: "ප්‍රතිරෝධක දෙකක් ශ්‍රේණිගතව (Series) සම්බන්ධ කළ විට මුළු පාලක ප්‍රතිරෝධය?", options: ["වැඩි වේ", "අඩු වේ", "වෙනස් නොවේ", "ශුන්‍ය වේ"], correct: 0 },
        { q: "විද්‍යුත් ජවය (Electrical Power) සෙවීමේ සූත්‍රයක් නොවන්නේ?", options: ["P = VI", "P = I^2 * R", "P = V^2 / R", "P = V / I"], correct: 3 },
        { q: "විද්‍යුත් ධාරිතාව (Capacitance) මැනීමේ ඒකකය කුමක්ද?", options: ["Farad (F)", "Henry (H)", "Ohm", "Coulomb"], correct: 0 }
    ],
    10: [
        { q: "තාපය මැනීමේ SI ඒකකය කුමක්ද?", options: ["Celsius", "Kelvin", "Joule", "Calorie"], correct: 2 },
        { q: "සෙල්සියස් අංශක 0 (0°C) කෙල්වින් අගයෙන් කොපමණද?", options: ["100 K", "273.15 K", "0 K", "-273.15 K"], correct: 1 },
        { q: "ද්‍රව්‍යයක උෂ්ණත්වය 1K කින් ඉහළ නැංවීමට අවශ්‍ය තාප ප්‍රමාණය හඳුන්වන්නේ?", options: ["විශිෂ්ට TAAPA ධාරිතාව", "තාප ධාරිතාව", "ගුප්ත තාපය", "එන්තැල්පිය"], correct: 1 },
        { q: "ඝන ද්‍රව්‍ය හරහා තාපය ගමන් කරන ප්‍රධාන ක්‍රමය කුමක්ද?", options: ["තාප සන්නයනය", "තාප සංවහනය", "තාප විකිරණය", "වාෂ්පීකරණය"], correct: 0 },
        { q: "තාපමානයක් නිෂ්පාදනය කිරීමේදී භාවිත වන රසදියවල ඇති විශේෂ ගුණය කුමක්ද?", options: ["ඒකාකාර TAAPA ප්‍රසාරණය", "ඉහළ තාපාංකය", "පාරදෘශ්‍ය නොවීම", "සියල්ලම"], correct: 3 }
    ],
    11: [
        { q: "පද්ධතියකින් බාහිර පරිසරයට තාපය මුදාහරින රසායනික ප්‍රතික්‍රියා හඳුන්වන්නේ?", options: ["තාප අවශෝෂක ප්‍රතික්‍රියා", "තාප දායක ප්‍රතික්‍රියා", "ස්වයංක්‍රීය ප්‍රතික්‍රියා", "ප්‍රතිවර්ත්‍ය ප්‍රතික්‍රියා"], correct: 1 },
        { q: "තාප දායක ප්‍රතික්‍රියාවක එන්තැල්පි වෙනස (ΔH) සැමවිටම?", options: ["ධන (+) වේ", "සෘණ (-) වේ", "ශුන්‍ය වේ", "නිශ්චිත නැත"], correct: 1 },
        { q: "රසායනික බන්ධන බිඳ දැමීමේ ක්‍රියාවලිය සැමවිටම?", options: ["තාප දායක වේ", "තාප අවශෝෂක වේ", "ශක්තිය නිදහස් කරයි", "කිසිවක් නොවේ"], correct: 1 },
        { q: "තාප රසායනයේදී සම්මත උෂ්ණත්වය සහ පීඩනය (STP) ලෙස සලකන්නේ?", options: ["25°C සහ 1 atm", "0°C සහ 1 atm", "100°C සහ 1 bar", "20°C සහ 1 atm"], correct: 0 },
        { q: "ප්‍රතික්‍රියාවක තාප වෙනස මැනීමට රසායනාගාරයේදී භාවිත කරන උපකරණය?", options: ["තාපමානය", "කලෝරිමීටරය", "බැරෝමීටරය", "pH මීටරය"], correct: 1 }
    ],
    12: [
        { q: "රසායනික ප්‍රතික්‍රියාවක වේගය කෙරෙහි බලනොපාන සාධකය කුමක්ද?", options: ["උෂ්ණත්වය", "ප්‍රතික්‍රියක සාන්ද්‍රණය", "උත්ප්‍රේරක", "ප්‍රතික්‍රියාව සිදුවන වේලාව"], correct: 3 },
        { q: "උත්ප්‍රේරකයක් (Catalyst) මගින් සිදු කරනු ලබන්නේ?", options: ["සක්‍රියන ශක්තිය අඩු කිරීම", "සක්‍රියන ශක්තිය වැඩි කිරීම", "ඵලදාව වැඩි කිරීම", "ප්‍රතික්‍රියාව නැවැත්වීම"], correct: 0 },
        { q: "ප්‍රතික්‍රියක ඝන ද්‍රව්‍යයක පෘෂ්ඨ වර්ගඵලය වැඩි කළ විට ප්‍රතික්‍රියා වේගය?", options: ["අඩු වේ", "වැඩි වේ", "වෙනස් නොවේ", "මුලින් වැඩි වී පසුව අඩු වේ"], correct: 1 },
        { q: "එන්සයිම (Enzymes) යනු කුමන වර්ගයේ උත්ප්‍රේරකද?", options: ["අකාබනික උත්ප්‍රේරක", "ජෛව රසායනික උත්ප්‍රේරක", "සෘණ උත්ප්‍රේරක", "වායුමය උත්ප්‍රේරක"], correct: 1 },
        { q: "උෂ්ණත්වය වැඩි කරන විට ප්‍රතික්‍රියා වේගය වැඩි වීමට ප්‍රධාන හේතුව?", options: ["අංශුවල චාලක ශක්තිය සහ ඵලදායී ගැටුම් ගණන වැඩි වීම", "අංශු විශාල වීම", "බන්ධන ශක්තිමත් වීම", "පීඩනය අඩු වීම"], correct: 0 }
    ],
    13: [
        { q: "ජීවීන්ගේ ප්‍රධානතම ශක්ති ප්‍රභවය වන ජෛව පරමාණුව කුමක්ද?", options: ["ප්‍රෝටීන", "ලිපිඩ", "කාබෝහයිඩ්‍රේට", "න්‍යෂ්ටික අම්ල"], correct: 2 },
        { q: "ප්‍රෝටීන වල ව්‍යුහමය ඒකකය (Monomer) වන්නේ කුමක්ද?", options: ["ග්ලූකෝස්", "ඇමයිනෝ අම්ල", "ෆැටී අම්ල", "නියුක්ලියෝටයිඩ"], correct: 1 },
        { q: "පහත දැක්වෙන ද්‍රව්‍ය අතුරින් ඩයිසැකරයිඩයක් (Disaccharide) වන්නේ කුමක්ද?", options: ["ග්ලූකෝස්", "ෆ්‍රක්ටෝස්", "සුක්‍රෝස්", "සෙලියුලෝස්"], correct: 2 },
        { q: "ප්‍රෝටීන හඳුනාගැනීම සඳහා රසායනාගාරයේදී සිදු කරන පරීක්ෂාව කුමක්ද?", options: ["අයඩින් පරීක්ෂාව", "බෙනඩික්ට් පරීක්ෂාව", "බයියුරෙට් පරීක්ෂාව", "සුඩාන් III පරීක්ෂාව"], correct: 2 },
        { q: "ජීවීන්ගේ ප්‍රවේණික තොරතුරු ගබඩා කර තබා ගන්නා ජෛව පරමාණුව?", options: ["RNA", "DNA", "ප්‍රෝටීන", "එන්සයිම"], correct: 1 }
    ],
    14: [
        { q: "ස්වභාවික බහුඅවයවිකයක් (Natural Polymer) සඳහා උදාහරණයක් තෝරන්න.", options: ["පොලිතීන්", "PVC", "ස්වභාවික රබර්", "නයිලෝන්"], correct: 2 },
        { q: "පොලිතීන් නිපදවීම සඳහා යොදාගන්නා ඒක අවයවිකය (Monomer) කුමක්ද?", options: ["එතීන් (Ethylene)", "ප්‍රොපීන්", "වයිනයිල් ක්ලෝරයිඩ්", "ස්ටයිරීන්"], correct: 0 },
        { q: "රබර් වල්කනයිස් කිරීමේදී (Vulcanization) එකතු කරනු ලබන මූලද්‍රව්‍යය කුමක්ද?", options: ["නයිට්‍රජන්", "කාබන්", "සල්ෆර් (Sulfur)", "ඔක්සිජන්"], correct: 2 },
        { q: "පහත සඳහන් බහුඅවයවික අතුරින් ठेवा සංස්ථාපී (Thermosetting) බහුඅවයවිකයක් වන්නේ?", options: ["පොලිතීන්", "PVC", "බේකලයිට් (Bakelite)", "පොලිස්ටයිරීන්"], correct: 2 },
        { q: "PVC හි සම්පූර්ණ නම කුමක්ද?", options: ["Polyvinyl Chloride", "Plastic Vinyl Carbon", "Pure Vinyl Chloride", "Polyvinyl Carbonate"], correct: 0 }
    ],
    15: [
        { q: "ද්‍රව්‍යයකට බලයක් යෙදූ විට එහි හැඩය වෙනස් වී බලය ඉවත් කළ පසු නැවත මුල් තත්ත්වයට පත්වීමේ ගුණය?", options: ["සුවිකාර්යතාව", "ප්‍රත්‍යාස්ථතාව (Elasticity)", "භංගුරතාව", "නම්‍යතාව"], correct: 1 },
        { q: "ප්‍රත්‍යාස්ථ සීමාව තුළදී ආතතිය, විකෘතියට සෘජුවම සමානුපාතික වේ යන නියමය?", options: ["පැස්කල් නියමය", "හුක්ගේ නියමය (Hooke's Law)", "නිව්ටන් නියමය", "ආකිමිඩීස් නියමය"], correct: 1 },
        { q: "ආතතිය (Stress) මැනීමේ ඒකකය සමාන වන්නේ පහත කුමන ඒකකයටද?", options: ["බලය (N)", "පීඩනය (Pa හෝ N/m^2)", "කාර්යය (J)", "ත්වරණය"], correct: 1 },
        { q: "යන් ප්‍රතිස්ථිති මාපාංකය (Young's Modulus) අදාළ වන්නේ කුමන විකෘති වර්ගයටද?", options: ["පරිමා විකෘතියට", "ආතති/අන්වායාම විකෘතියට", "කෘන්තන විකෘතියට", "සියල්ලටම"], correct: 1 },
        { q: "විකෘතිය (Strain) සඳහා පවතින ඒකකය කුමක්ද?", options: ["m", "N/m", "එයට ඒකක නොමැත", "Pa"], correct: 2 }
    ],
    16: [
        { q: "නිශ්චල ද්‍රවයක h ගැඹුරකදී ඇතිවන ද්‍රව පීඩනය සෙවීමේ සූත්‍රය කුමක්ද?", options: ["P = hdg", "P = F/A", "P = mgh", "P = vdg"], correct: 0 },
        { q: "හයිඩ්‍රොලික් එසවුම් උපකරණ (Hydraulic Lifts) ක්‍රියා කරන්නේ කුමන නියමයට අනුවද?", options: ["ආකිමිඩීස් මූලධර්මය", "පැස්කල්ගේ නියමය", "බර්නුලී මූලධර්මය", "බොයිල්ගේ නියමය"], correct: 1 },
        { q: "ද්‍රවයක ගිල්වන ලද වස්තුවක් මත ඇතිවන උඩුකුරු තෙරපුම වස්තුව මගින් ඉවත් කළ ද්‍රවයේ බරට සමාන වේ. මෙයින් කියවෙන්නේ?", options: ["පැස්කල් නියමය", "ආකිමිඩීස් මූලධර්මය", "ප්ලාවන නියමය", "බර්නුලී මූලධර්මය"], correct: 1 },
        { q: "ද්‍රව ගලා යාමකදී ප්‍රවේගය වැඩි ස්ථානවල පීඩනය අඩු වේ යන සිද්ධාන්තය?", options: ["පැස්කල් නියමය", "බර්නුලී මූලධර්මය", "නල ප්‍රවාහ නියමය", "ස්නෙල් නියමය"], correct: 1 },
        { q: "ද්‍රවයක ගලායාමට එරෙහිව ඇතිවන අභ්‍යන්තර ඝර්ෂණ ස්වභාවය හඳුන්වන්නේ?", options: ["පෘෂ්ඨික ආතතිය", "දුස්ස්‍රාවිතාව (Viscosity)", "කේශිකත්වය", "ඝනත්වය"], correct: 1 }
    ],
    17: [
        { q: "සොල්වේ ක්‍රියාවලිය (Solvay Process) මගින් කාර්මිකව නිෂ්පාදනය කරන්නේ කුමක්ද?", options: ["සෝඩියම් කාබනේට් (සෝඩා අළු)", "සල්ෆියුරික් අම්ලය", "ඇමෝනියා", "නයිට්‍රික් අම්ලය"], correct: 0 },
        { q: "හේබර් ක්‍රියාවලිය (Haber Process) මගින් නිෂ්පාදනය කරනු ලබන වායුව කුමක්ද?", options: ["Oxygen", "Nitrogen", "Ammonia (NH3)", "Chlorine"], correct: 2 },
        { q: "කාර්මිකව සල්ෆියුරික් අම්ලය (H2SO4) නිපදවන ක්‍රමය හඳුන්වන්නේ?", options: ["ස්පර්ශ ක්‍රමය (Contact Process)", "සොල්වේ ක්‍රමය", "ඩවුන්ස් ක්‍රමය", "Castner-Kellner ක්‍රමය"], correct: 0 },
        { q: "ලුණු ලේවායකදී මුලින්ම අවක්ෂේප වන ලුණු වර්ගය කුමක්ද?", options: ["සෝඩියම් ක්ලෝරයිඩ්", "කැල්සියම් කාබනේට්", "කැල්සියම් සල්ෆේට් (ජිප්සම්)", "මැග්නීසියම් සල්ෆේට්"], correct: 1 },
        { q: "සබන් නිෂ්පාදනයේදී (Saponification) අතුරු ඵලයක් ලෙස ලැබෙන වටිනා ද්‍රව්‍යය කුමක්ද?", options: ["එතනෝල්", "ග්ලිසරෝල් (Glycerol)", "ඇසිටෝන්", "මෙතනෝල්"], correct: 1 }
    ],
    18: [
        { q: "පොල්තෙල්වල බහුලවම අඩංගු වන මේද අම්ලය කුමක්ද?", options: ["ඔලෙයික් අම්ලය", "ස්ටියරික් අම්ලය", "ලෝරික් අම්ලය (Lauric acid)", "පැල්මිටික් අම්ලය"], correct: 2 },
        { q: "කුරුඳු තෙල්වල ඇති ප්‍රධාන සක්‍රීය රසායනික සංඝටකය කුමක්ද?", options: ["යුජිනෝල්", "සිනමැල්ඩිහයිඩ් (Cinnamaldehyde)", "සිට්‍රනෙලාල්", "මෙන්තෝල්"], correct: 1 },
        { q: "කරාබුනැටි තෙල්වල බහුලවම අඩංගු සක්‍රීය රසායනික සංඝටකය?", options: ["සිනමැල්ඩිහයිඩ්", "යුජිනෝල් (Eugenol)", "ලිනලූල්", "පිනීන්"], correct: 1 },
        { q: "ස්වභාවික ශාක සාර සහ අත්‍යවශ්‍ය තෙල් වර්ග නිස්සාරණය කිරීමට රසායනාගාරයේදී බහුලවම භාවිත කරන ක්‍රමය?", options: ["සරල ආසවනය", "භාගික ආසවනය", "හුමාල ආසවනය (Steam Distillation)", "ස්ඵටිකීකරණය"], correct: 2 },
        { q: "පොල් කිරි මගින් පොල්තෙල් වෙන් කරගැනීමේ සාම්ප්‍රදායික ක්‍රමය පදනම් වන්නේ?", options: ["පැසවීම සහ රත් කිරීම", "හුමාල ආසවනය", "ද්‍රාවක නිස්සාරණය", "පෙරීම පමණක්"], correct: 0 }
    ],
    19: [
        { q: "(2, 3) සහ (5, 7) ලක්ෂ්‍ය දෙක අතර දුර සොයන්න.", options: ["5", "25", "7", "3"], correct: 0 },
        { q: "සමාන්තර සරල රේඛා දෙකක අනුක්‍රමණ (Gradient) පිළිබඳ සත්‍ය ප්‍රකාශය කුමක්ද?", options: ["අනුක්‍රමණ සමාන වේ (m1 = m2)", "m1 * m2 = -1 වේ", "m1 + m2 = 0 වේ", "එකක් අනෙකෙහි ප්‍රතිලෝමය වේ"], correct: 0 },
        { q: "පරස්පර ලම්බක සරල රේඛා දෙකක අනුක්‍රමණ අතර සබඳතාවය කුමක්ද?", options: ["m1 = m2", "m1 * m2 = -1", "m1 * m2 = 1", "m1 + m2 = 1"], correct: 1 },
        { q: "y = mx + c සරල රේඛා සමීකරණයේ c මගින් නිරූපණය කරන්නේ කුමක්ද?", options: ["අනුක්‍රමණය", "x-අන්තඃඛණ්ඩය", "y-අන්තඃඛණ්ඩය", "ඛණ්ඩාංකය"], correct: 2 },
        { q: "y = 3x + 5 රේඛාවේ අනුක්‍රමණය කොපමණද?", options: ["5", "3", "-3", "1.5"], correct: 1 }
    ],
    20: [
        { q: "ලබා දී ඇති දත්ත සමූහයක මැදින්ම පිහිටි අගය (දත්ත ආරෝහණ පිළිවෙළට සැකසූ පසු) හඳුන්වන්නේ?", options: ["මධ්‍යන්‍යය", "මාතය", "මධ්‍යස්ථය (Median)", "පරාසය"], correct: 2 },
        { q: "දත්ත සමූහයක වැඩිම වාර ගණනක් වාර්තා වී ඇති අගය හඳුන්වන්නේ කුමන නමකින්ද?", options: ["මධ්‍යන්‍යය", "මාතය (Mode)", "මධ්‍යස්ථය", "විචල්‍යතාව"], correct: 1 },
        { q: "දත්ත සමූහයක උපරිම අගය සහ අවම අගය අතර වෙනස කුමක්ද?", options: ["පරාසය (Range)", "සම්මත අපගමනය", "විචලනය", "මාතය"], correct: 0 },
        { q: "සියලුම දත්තවල එකතුව දත්ත සංඛ්‍යාවෙන් බෙදූ විට ලැබෙන අගය?", options: ["මධ්‍යස්ථය", "මාතය", "මධ්‍යන්‍යය (Mean)", "සහසම්බන්ධය"], correct: 2 },
        { q: "පහත දත්තවල මාතය සොයන්න: 2, 4, 4, 5, 6, 7, 4, 8", options: ["4", "5", "6", "2"], correct: 0 }
    ],
    21: [
        { q: "පරිගණකයක ප්‍රධාන සැකසුම් ඒකකය (CPU) තුළ අඩංගු නොවන කොටස කුමක්ද?", options: ["පාලන ඒකකය (CU)", "ගණිත හා තර්කන ඒකකය (ALU)", "ප්‍රධාන මතකය (RAM)", "රෙජිස්ටර (Registers)"], correct: 2 },
        { q: "පරිගණකය ක්‍රියා විරහිත කළ විට දත්ත මැකී යන තාවකාලික මතකය කුමක්ද?", options: ["ROM", "Hard Disk", "RAM (Random Access Memory)", "Flash Drive"], correct: 2 },
        { q: "පහත දැක්වෙන උපාංග අතුරින් ආදාන උපාංගයක් (Input Device) පමණක් වන්නේ කුමක්ද?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: 2 },
        { q: "පරිගණකය පණගැන්වීමේදී (Booting) ක්‍රියාත්මක වන BIOS වැඩසටහන ගබඩා කර ඇත්තේ?", options: ["RAM", "ROM", "Hard Disk", "Cache Memory"], correct: 1 },
        { q: "දත්ත ගබඩා කිරීමේ පරිමාණ අනුව 1 GB (Gigabyte) සමාන වන්නේ මෙයින් කුමකටද?", options: ["1024 MB", "1024 KB", "1000 MB", "1024 Bytes"], correct: 0 }
    ],
    22: [
        { q: "මෙහෙයුම් පද්ධතියක (Operating System) ප්‍රධානතම කාර්යය කුමක්ද?", options: ["දෘඩාංග හා මෘදුකාංග අතර සම්පත් කළමනාකරණය", "වෙබ් අඩවි නිර්මාණය", "වෛරස් ඉවත් කිරීම", "ලේඛන සකස් කිරීම"], correct: 0 },
        { q: "පහත සඳහන් ඒවායින් විවෘත කේත (Open Source) මෙහෙයුම් පද්ධතියක් වන්නේ කුමක්ද?", options: ["Windows 11", "macOS", "Linux (Ubuntu)", "MS-DOS"], correct: 2 },
        { q: "GUI යන්නෙහි සම්පූර්ණ අර්ථය කුමක්ද?", options: ["Graphical User Interface", "General User Integration", "Global User Identifier", "Guided User Interface"], correct: 0 },
        { q: "ජංගම දුරකථන සඳහා බහුලවම භාවිත වන මෙහෙයුම් පද්ධතිය කුමක්ද?", options: ["Windows", "Android", "Linux", "Unix"], correct: 1 },
        { q: "පරිගණක මෙහෙයුම් පද්ධතියක හරය (Core component) හඳුන්වන්නේ කුමන නමකින්ද?", options: ["Shell", "Kernel", "Driver", "System File"], correct: 1 }
    ],
    23: [
        { q: "ලේඛන සැකසීම (Word Processing) සඳහා බහුලවම භාවිත වන යෙදුම් මෘදුකාංගය කුමක්ද?", options: ["MS Excel", "MS Word", "MS PowerPoint", "MS Access"], correct: 1 },
        { q: "දත්ත විශ්ලේෂණය සහ ප්‍රස්ථාර නිර්මාණය සඳහා වඩාත්ම සුදුසු මෘදුකාංගය කුමක්ද?", options: ["MS Word", "MS Excel (Spreadsheet)", "Photoshop", "Notepad"], correct: 1 },
        { q: "MS Excel හි සූත්‍රයක් (Formula) ආරම්භ කළ යුතු අනිවාර්ය සංකේතය කුමක්ද?", options: ["+", "@", "=", "$"], correct: 2 },
        { q: "ප්‍රසන්ටේෂන් (Presentations) නිර්මාණය කිරීමට භාවිත කරන්නේ කුමන මෘදුකාංගයද?", options: ["MS Word", "MS Publisher", "MS PowerPoint", "MS Excel"], correct: 2 },
        { q: "පහත දැක්වෙන මෘදුකාංග අතුරින් DBMS (Database Management System) මෘදුකාංගයක් වන්නේ?", options: ["MS Access", "MS Word", "VLC Player", "CorelDraw"], correct: 0 }
    ],
    24: [
        { q: "අන්තර්ජාලයේ වෙබ් අඩවියක් හඳුනාගැනීමට භාවිත කරන සුවිශේෂී ලිපිනය හඳුන්වන්නේ?", options: ["IP Address", "URL", "HTML", "HTTP"], correct: 1 },
        { q: "වෙබ් පිටු නිර්මාණය කිරීම සඳහා භාවිත කරන මූලික පරිගණක භාෂාව කුමක්ද?", options: ["Java", "Python", "HTML", "C++"], correct: 2 },
        { q: "WWW යන්නෙහි සම්පූර්ණ කෙටි යෙදුම කුමක්ද?", options: ["World Wide Web", "Word Wide Web", "World Web Wide", "Wireless Web Window"], correct: 0 },
        { q: "වෙබ් පිටු බැලීම සඳහා පරිශීලකයා භාවිත කරන මෘදුකාංග වර්ගය හඳුන්වන්නේ?", options: ["Search Engine", "Web Browser", "Web Server", "ISP"], correct: 1 },
        { q: "පහත දැක්වෙන ඒවායින් සෙවුම් යන්ත්‍රයක් (Search Engine) සපයන ආයතනයක් වන්නේ?", options: ["Google", "Firefox", "Chrome", "Safari"], correct: 0 }
    ],
    25: [
        { q: "වායුගෝලීය ගෝලීය උණුසුම (Global Warming) වැඩි වීමට ප්‍රධාන වශයෙන්ම බලපාන හරිතාගාර වායුව?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide (CO2)", "Argon"], correct: 2 },
        { q: "ඕසෝන් ස්ථරය ක්ෂය වීමට ප්‍රධාන වශයෙන්ම වගකිව යුතු රසායනික ද්‍රව්‍ය කාණ්ඩය කුමක්ද?", options: ["CFC (Chlorofluorocarbons)", "CO2", "SO2", "CH4"], correct: 0 },
        { q: "ඇසිඩ් වැසි (Acid Rain) ඇති වීමට බලපාන ප්‍රධාන වායූන් දෙක කුමක්ද?", options: ["CO2 සහ O2", "SO2 සහ NO2", "CH4 සහ CFC", "N2O සහ CO"], correct: 1 },
        { q: "පරිසර කළමනාකරණයේ එන 3R සංකල්පයට අයත් නොවන්නේ කුමක්ද?", options: ["Reduce", "Reuse", "Recycle", "Replace"], correct: 3 },
        { q: "ප්‍රතිචක්‍රීකරණය කළ නොහැකි පරිසරයට අහිතකර අපද්‍රව්‍යයක් වන්නේ?", options: ["කඩදාසි", "පොලිතීන්", "සර්පන්ටයින්/ලමිනේටඩ් ප්ලාස්ටික් හෝ Thermocol", "වීදුරු"], correct: 2 }
    ],
    41: [
        { q: "ජීවීන්ගේ ව්‍යුහමය හා ක්‍රියාකාරී මූලික ඒකකය කුමක්ද?", options: ["පටකය", "සෛලය", "ඉන්ද්‍රිය", "පද්ධතිය"], correct: 1 },
        { q: "ප්‍රොකැරියෝටික සෛලයක (Prokaryotic Cell) දැකිය හැකි ප්‍රධාන ලක්ෂණය කුමක්ද?", options: ["සැබෑ න්‍යෂ්ටියක් නොමැති වීම", "සැබෑ න්‍යෂ්ටියක් පැවතීම", "මයිටොකොන්ඩ්‍රියා බහුල වීම", "හරිතලප පැවතීම"], correct: 0 },
        { q: "සෛලයේ ශක්ති නිෂ්පාදනාගාරය (Power house of the cell) ලෙස හඳුන්වන්නේ කුමන ගණිකාවද?", options: ["න්‍යෂ්ටිය", "මයිටොකොන්ඩ්‍රියම", "ගොල්ගි දේහය", "රයිබසෝම"], correct: 1 },
        { q: "සෛලයක ප්‍රෝටීන සංස්ලේෂණය සිදු කරන ප්‍රධාන ස්ථානය කුමක්ද?", options: ["රයිබසෝම", "ලයිසසෝම", "රික්තකය", "ප්‍රතිප්ලාස්ම පටලය"], correct: 0 },
        { q: "සෛල බෙදීම පාලනය කරනු ලබන සෛලයේ ප්‍රධානතම අවයවිකය කුමක්ද?", options: ["පටලය", "න්‍යෂ්ටිය", "සෛල ප්ලාස්මය", "හරිතලපය"], correct: 1 }
    ],
    42: [
        { q: "ශාකවල උස යාමට සහ අග්‍රස්ථ වර්ධනයට දායක වන පටක වර්ගය කුමක්ද?", options: ["ස්ථීර පටක", "අග්‍රස්ථ විභාජක පටක", "පර්ශවික විභාජක", "සෛලම පටකය"], correct: 1 },
        { q: "ශාක තුළ ජලය සහ ඛනිජ ලවණ පරිවහනය කරන සංකීර්ණ ස්ථීර පටකය කුමක්ද?", options: ["ෆ්ලෝයම", "සෛලම (Xylem)", "මෘදුස්තර පටකය", "දෘඩස්තර පටකය"], correct: 1 },
        { q: "ශාක පත්‍රවල නිෂ්පාදනය වන ආහාර (සුක්‍රෝස්) ශාකය පුරා පරිවහනය කරන්නේ?", options: ["සෛලම", "ෆ්ලෝයම (Phloem)", "ස්ථූලකෝණස්තර", "කලාව"], correct: 1 },
        { q: "පහත දැක්වෙන ශාක පටක අතුරින් සජීවී සෛලවලින් පමණක් සමන්විත සරල ස්ථීර පටකය?", options: ["මෘදුස්තර පටකය (Parenchyma)", "දෘඩස්තර පටකය", "සෛලම වාහිනී", "කාෂ්ඨය"], correct: 0 },
        { q: "ශාකවලට යාන්ත්‍රික ශක්තිය ලබා දෙන අජීවී සෛල බහුල පටකය කුමක්ද?", options: ["මෘදුස්තර", "දෘඩස්තර පටකය (Sclerenchyma)", "ෆ්ලෝයම් පෙනේර නල", "බාහිකය"], correct: 1 }
    ],
    43: [
        { q: "ජීවීන් වර්ගීකරණයේදී වර්තමානයේ භාවිත වන ඉහළම මට්ටම (Taxonomic rank) කුමක්ද?", options: ["රාජධානිය", "අධිරාජධානිය (Domain)", "වංශය", "ගෝත්‍රය"], correct: 1 },
        { q: "ද්විපද නාමකරණය (Binomial Nomenclature) හඳුන්වා දුන් විද්‍යාඥයා කවුද?", options: ["චාල්ස් ඩාවින්", "ග්‍රෙගර් මෙන්ඩල්", "කාල් ලිනේයස් (Carl Linnaeus)", "ඇරිස්ටෝටල්"], correct: 2 },
        { q: "නූතන ජීවී වර්ගීකරණයට අනුව අධිරාජධානි (Domains) කීයක් පවතීද?", options: ["2", "3", "5", "6"], correct: 1 },
        { q: "Homo sapiens යන විද්‍යාත්මක නාමයේ 'sapiens' මගින් දක්වන්නේ කුමක්ද?", options: ["ගණය", "විශේෂය (Species)", "වංශය", "කුලය"], correct: 1 },
        { q: "පංච රාජධානි වර්ගීකරණය (Five Kingdom Classification) ඉදිරිපත් කළේ කවුද?", options: ["කාල් වෝස්", "රොබට් විටේකර් (Robert Whittaker)", "ඇරිස්ටෝටල්", "ලිනේයස්"], correct: 1 }
    ],
    44: [
        { q: "ක්ෂුද්‍ර ජීවීන් නිරීක්ෂණය කිරීම සඳහා බහුලවම භාවිත කරන්නේ කුමක්ද?", options: ["විශාලක කාචය", "සංයුක්ත අන්වීක්ෂය", "දුරේක්ෂය", "ස්පෙක්ට්‍රොමීටරය"], correct: 1 },
        { q: "පහත දැක්වෙන ජීවීන් අතුරින් සෛලීය ව්‍යුහයක් නොමැති අසෛලීය වස්තුවක් වන්නේ?", options: ["බැක්ටීරියා", "දිලීර", "වෛරස් (Virus)", "ප්‍රොටසෝවා"], correct: 2 },
        { q: "පෙනිසිලින් (Penicillin) නමැති ප්‍රතිජීවකය නිපදවීමට යොදාගන්නා ක්ෂුද්‍ර ජීවියා?", options: ["බැක්ටීරියාවක්", "දිලීරයක් (Penicillium mold)", "වෛරසයක්", "ඇල්ගී වර්ගයක්"], correct: 1 },
        { q: "පැරමීසියම් (Paramecium) අයත් වන්නේ කුමන ක්ෂුද්‍ර ජීවී කාණ්ඩයටද?", options: ["දිලීර", "ප්‍රොටසෝවා (Protozoa)", "බැක්ටීරියා", "වෛරස්"], correct: 1 },
        { q: "බැක්ටීරියාවල ප්‍රජනනය ප්‍රධාන වශයෙන්ම සිදුවන අලිංගික ක්‍රමය කුමක්ද?", options: ["ද්විඛණ්ඩනය (Binary Fission)", "අංකුරණය", "ඛණ්ඩනය", "ජන්මාණු සාදමින්"], correct: 0 }
    ],
    45: [
        { q: "පාන් නිෂ්පාදනයේදී පිටි පිපිරීම සඳහා යොදාගන්නා ඊස්ට් (Yeast) යනු කුමන ජීවී වර්ගයක්ද?", options: ["බැක්ටීරියා", "දිලීර (Fungi)", "ඇල්ගී", "ප්‍රොටසෝවා"], correct: 1 },
        { q: "කිරි මුදවීමේදී (Yogurt/Curd නිෂ්පාදනයේදී) දායක වන ප්‍රධාන බැක්ටීරියාව කුමක්ද?", options: ["Lactobacillus", "E. coli", "Salmonella", "Rhizobium"], correct: 0 },
        { q: "විනාකිරි (Vinegar) නිෂ්පාදනයේදී ඇල්කොහොල්, ඇසිටික් අම්ලය බවට පත් කරන බැක්ටීරියාව?", options: ["Lactobacillus", "Acetobacter", "Clostridium", "Penicillium"], correct: 1 },
        { q: "ක්ෂුද්‍ර ජීවී කර්මාන්ත වලදී වායුගෝලීය ඔක්සිජන් නොමැතිව සිදු කරන ක්‍රියාවලිය?", options: ["පැසවීම (Fermentation)", "ශ්වසනය", "ප්‍රභාසංස්ලේෂණය", "සමහරණය"], correct: 0 },
        { q: "ජෛව වායුව (Biogas) නිෂ්පාදනයේදී ප්‍රධාන වශයෙන් නිපදවෙන දහනය කළ හැකි වායුව කුමක්ද?", options: ["Hydrogen", "Carbon Monoxide", "Methane (CH4)", "Nitrogen"], correct: 2 }
    ],
    46: [
        { q: "පටක රෝපණයේදී (Tissue Culture) ආරම්භක ශාක කොටස හඳුන්වන්නේ කුමන නමකින්ද?", options: ["Callus", "Explant (බද්ධකය/ප්‍රරෝහකය)", "Medium", "Clone"], correct: 1 },
        { q: "පටක රෝපණ මාධ්‍යයක අඩංගු වන ප්‍රධාන කාබෝහයිඩ්‍රේට ප්‍රභවය කුමක්ද?", options: ["ග්ලූකෝස්", "සුක්‍රෝස් (Sucrose)", "පිෂ්ඨය", "සෙලියුලෝස්"], correct: 1 },
        { q: "පටක රෝපණයේදී රෝපණ මාධ්‍යය ඝන කර ගැනීම සඳහා යොදාගන්නා ද්‍රව්‍යය කුමක්ද?", options: ["Agar (ඇගාර්)", "Gelatin", "Starch", "Alcohol"], correct: 0 },
        { q: "පටක රෝපණ මාධ්‍ය සහ උපකරණ විෂබීජහරණය කිරීමට (Sterilization) භාවිත කරන උපකරණය?", options: ["Incubator", "Autoclave (ඔටෝක්ලේව් යන්ත්‍රය)", "Centrifuge", "Oven"], correct: 1 },
        { q: "පටක රෝපණයේදී සෛල ගොනුවක් ලෙස වැඩෙන අභේදිත සෛල ස්කන්ධය හඳුන්වන්නේ?", options: ["Explant", "Callus (කැලස්)", "Plantlet", "Shoot"], correct: 1 }
    ],
    47: [
        { q: "බීජ සාදනු ලබන නමුත් පුෂ්ප හට නොගන්නා ශාක කාණ්ඩය හඳුන්වන්නේ කුමන නමකින්ද?", options: ["මුසිදා", "ලයිකන", "විවෘත බීජක ශාක (Gymnosperms)", "ආවෘත බීජක ශාක"], correct: 2 },
        { q: "පහත දැක්වෙන ශාක අතුරින් ඒකබීජපත්‍රී (Monocotyledon) ශාකයක් වන්නේ කුමක්ද?", options: ["අඹ", "පොල් ශාකය", "කොස්", "රබර්"], correct: 1 },
        { q: "ද්වීබීජපත්‍රී ශාකවල පත්‍රවල දැකිය හැකි ලක්ෂණ ශිරා වින්‍යාසය කුමක්ද?", options: ["සමාන්තර ශිරා වින්‍යාසය", "ජාලාකාර ශිරා වින්‍යාසය", "කේශික ශිරා වින්‍යාසය", "කිසිවක් නොවේ"], correct: 1 },
        { q: "සනාල පද්ධතියක් (Xylem & Phloem) නොමැති ඉතා සරල කුඩා ශාක කාණ්ඩය?", options: ["Momocot", "Gymnosperm", "බ්‍රයෝෆයිටා (Bryophyta - උදා: පාසි)", "Pteridophyta"], correct: 2 },
        { q: "නියම මුල්, කඳ සහ පත්‍ර පවතින නමුත් බීජ සාදන්නේ නැති පර්ණාංග (Ferns) අයත් වන කාණ්ඩය?", options: ["Pteridophyta (ප්ටෙරිඩොෆයිටා)", "Bryophyta", "Angiosperm", "Thallophyta"], correct: 0 }
    ],
    48: [
        { q: "ලංකාවේ පිහිටි ප්‍රමුඛතම නිවර්තන තෙත් සදාහරිත වැසි වනාන්තරය කුමක්ද?", options: ["විල්පත්තුව", "යාල", "සිංහරාජය", "වික්ටෝරියා-රන්දෙනිගල"], correct: 2 },
        { q: "ලංකාවේ වියළි කලාපයේ බහුලවම දැකිය හැකි වනාන්තර වර්ගය කුමක්ද?", options: ["කඳුකර වනාන්තර", "නිවර්තන වියළි මිශ්‍ර සදාහරිත වනාන්තර", "කඩොලාන වනාන්තර", "තෘණ භූමි"], correct: 1 },
        { q: "කරදිය සහ මිරිදිය එකතු වන කලපු ආශ්‍රිතව වෙරළ තීරයේ හැදෙන ශාක ප්‍රජාව?", options: ["කඩොලාන වනාන්තර (Mangroves)", "වැසි වනාන්තර", "පතන", "සවානා"], correct: 0 },
        { q: "කඩොලාන ශාකවල ස්වසනය සඳහා පොළොවෙන් ඉහළට මතු වී ඇති මුල් වර්ගය?", options: ["කරල් මුල්", "ස්වසන මුල් (Pneumatophores)", "කරපූ මුල්", "කිරි මුල්"], correct: 1 },
        { q: "යම්කිසි ප්‍රදේශයකට පමණක් ආවේණික වූ ජීවීන් හඳුන්වන්නේ කුමන නමකින්ද?", options: ["විදේශීය ජීවීන්", "ආවේණික ජීවීන් (Endemic)", "සංක්‍රමණික ජීවීන්", "වඳවී ගිය ජීවීන්"], correct: 1 }
    ],
    49: [
        { q: "පහත දැක්වෙන සතුන් අතුරින් අපෘෂ්ඨවංශී (Invertebrate) සතෙකු තෝරන්න.", options: ["ගෙම්බා", "ලෙඩ පණුවා / ගැඩවිලා", "මීයන්", "කොකා"], correct: 1 },
        { q: "පෘෂ්ඨවංශීන්ගේ ප්‍රධාන ලක්ෂණය කුමක්ද?", options: ["බාහිර සැකිල්ලක් පැවතීම", "කොඳු ඇට පෙළක් (Spinal column) පැවතීම", "පියාපත් පැවතීම", "සීතල ලේ තිබීම"], correct: 1 },
        { q: "උභයජීවී (Amphibia) පන්තියට අයත් සතෙකුගේ ප්‍රධාන ලක්ෂණයක් වන්නේ?", options: ["කොරල සහිත සමක් තිබීම", "තෙතමනය සහිත නිරුවත් සමක් තිබීම", "පියාපත් තිබීම", "සැමවිටම කරදියෙහි ජීවත් වීම"], correct: 1 },
        { q: "පක්ෂීන් (Aves) සතු විශේෂී අනුවර්තනයක් නොවන්නේ කුමක්ද?", options: ["බර අඩු සිදුරු සහිත ඇටසැකිල්ල", "සම මත පිහාටු පිහිටීම", "පෙනහලු වලට අමතරව වායු කෝෂ පිහිටීම", "සීතල ලේ සහිත සතුන් වීම"], correct: 3 },
        { q: "ක්ෂීරපායී (Mammalia) සතුන්ගේ සුවිශේෂීම ලක්ෂණය කුමක්ද?", options: ["පෙනහළු වලින් ස්වසනය කිරීම", "රතු රුධිර සෛල තිබීම", "කිරිදෙන ග්‍රන්ථි (Mammary glands) පැවතීම", "පාද හතරක් තිබීම"], correct: 2 }
    ]
};

const papersList = [
    { id: "p1", title: "2024 A/L SFT Past Paper", emoji: "📝" },
    { id: "p2", title: "2025 A/L SFT Past Paper", emoji: "📜" },
    { id: "p3", title: "SFT Model Paper - 01", emoji: "💎" }
];

// --- AUTHENTICATION & PROFILE ENGINE ---
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('user-display-name').innerText = user.displayName || "Student";
        if(user.photoURL && document.getElementById('user-profile-pic')) {
            document.getElementById('user-profile-pic').src = user.photoURL;
        }
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('home-page').classList.add('active');
        generateDashboard();
        fetchPapers(); 
    } else {
        document.getElementById('home-page').classList.remove('active');
        document.getElementById('login-page').classList.add('active');
    }
});

document.getElementById('google-login-btn').addEventListener('click', () => auth.signInWithPopup(provider));
document.getElementById('login-form').addEventListener('submit', (e) => { 
    e.preventDefault(); 
    document.getElementById('login-page').classList.remove('active'); 
    document.getElementById('home-page').classList.add('active'); 
    generateDashboard(); 
    fetchPapers();
});
document.getElementById('logout-btn').addEventListener('click', () => auth.signOut().then(() => location.reload()));
document.getElementById('toggle-password').addEventListener('click', function() { 
    const p = document.getElementById('password'); 
    p.type = (p.type === 'password') ? 'text' : 'password'; 
});

// --- UI CONTROL & FILTERS ---
function switchView(viewType) {
    const sSection = document.getElementById('section-syllabus');
    const pSection = document.getElementById('section-papers');
    const fBar = document.getElementById('subject-filter-bar');
    
    document.querySelectorAll('.switch-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${viewType}`).classList.add('active');
    
    if (viewType === 'all') { 
        sSection.style.display = "block"; pSection.style.display = "block"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'syllabus') { 
        sSection.style.display = "block"; pSection.style.display = "none"; fBar.style.display = "flex"; 
    }
    else if (viewType === 'papers') { 
        sSection.style.display = "none"; pSection.style.display = "block"; fBar.style.display = "none"; 
    }
    generateDashboard();
    fetchPapers();
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

// --- API FETCHING & PAPER RENDERING ---
let apiDataCache = null; 

async function fetchPapers() {
    const pContainer = document.getElementById('papers-container');
    const searchInput = document.getElementById('paper-search-input');
    const query = searchInput ? searchInput.value.toLowerCase() : "";

    if (!apiDataCache) {
        pContainer.innerHTML = "<p style='text-align:center; width:100%;'>ප්‍රශ්න පත්‍ර Load වෙමින් පවතී...</p>";
        try {
            const response = await fetch('https://pastpaperapi.dileepatechyt.workers.dev/');
            apiDataCache = await response.json();
        } catch (e) {
            console.error(e);
            pContainer.innerHTML = "<p style='text-align:center; width:100%; color:red;'>API දෝෂයක්! ප්‍රශ්න පත්‍ර ලබා ගැනීමේදී ගැටළුවක්.</p>";
            return;
        }
    }

    pContainer.innerHTML = ""; 

    if (apiDataCache && apiDataCache.length > 0) {
        const filteredApiData = apiDataCache.filter(item => item.title.toLowerCase().includes(query));
        filteredApiData.forEach(p => {
            const div = document.createElement('div'); div.className = 'lesson-box';
            div.innerHTML = `
                <span class="box-emoji">📥</span>
                <h3>${p.title}</h3>
                <a href="${p.link}" target="_blank" class="btn-primary" style="text-decoration:none; display:inline-block; margin-top:10px; padding: 8px 15px; font-size: 14px; background:#007bff; color:#fff; border-radius:5px; width:100%; text-align:center;">
                    ⬇️ Download Paper
                </a>
            `;
            pContainer.appendChild(div);
        });
    }

    papersList.forEach(p => {
        if(p.title.toLowerCase().includes(query)) {
            const div = document.createElement('div'); div.className = 'lesson-box';
            div.innerHTML = `<span class="box-emoji">${p.emoji}</span><h3>${p.title}</h3>`;
            div.onclick = () => startQuiz(p.id, 'paper'); 
            pContainer.appendChild(div);
        }
    });

    if(pContainer.innerHTML === "") {
        pContainer.innerHTML = "<p style='text-align:center; width:100%;'>ප්‍රශ්න පත්‍ර කිසිවක් හමුවූයේ නැත.</p>";
    }
}

window.fetchPapers = fetchPapers;

// --- DYNAMIC QUIZ ENGINE ---
function startQuiz(id, type) {
    currentLesson = id; 
    currentQuestionIndex = 0; 
    score = 0;
    
    if (type === 'syllabus' && sftQuestionsDatabase[id]) {
        activeQuestionsList = sftQuestionsDatabase[id];
    } else {
        activeQuestionsList = [
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 01:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 0 },
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 02:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 1 },
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 03:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 2 },
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 04:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 3 },
            { q: `${sftLessonsList[id] ? sftLessonsList[id].name : 'Paper'} - බහුවරණ ප්‍රශ්නය 05:`, options: ["පිළිතුර A", "පිළිතුර B", "පිළිතුර C", "පිළිතුර D"], correct: 0 }
        ];
    }

    document.getElementById('home-page').classList.remove('active');
    setTimeout(() => { 
        document.getElementById('quiz-page').classList.add('active'); 
        loadQuestion(type); 
    }, 400);
}

function loadQuestion(type) {
    clearInterval(timerInterval); 
    timeLeft = 120; // ⏱️ සෑම ප්‍රශ්නයකටම තත්පර 120ක් (විනාඩි 2) ලබා දෙන ලදී
    document.getElementById('time-sec').innerText = timeLeft;
    document.getElementById('next-btn').style.display = 'none'; 

    const currentQ = activeQuestionsList[currentQuestionIndex];
    document.getElementById('question-text').innerText = `(${currentQuestionIndex + 1}/5) ${currentQ.q}`;
    
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
        document.getElementById('result-text').innerText = `ඔබේ ලකුණු සංඛ්‍යාව: 5 න් ${score} කි!`; 
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
document.getElementById('sidebar-overlay').onclick = () => {
    document.getElementById('sidebar').classList.remove('open'); 
    document.getElementById('sidebar-overlay').classList.remove('open');
};

function updateCountdown() {
    const diff = new Date("August 1, 2027").getTime() - new Date().getTime();
    document.getElementById("days-count").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
}
setInterval(updateCountdown, 1000); 
updateCountdown();
