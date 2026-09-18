const questions = [

    {
        question: "Oblicz: 347 + 286",
        answers: ["623", "633", "643"],
        correct: 1
    },

    {
        question: "Oblicz: 840 : 12",
        answers: ["60", "70", "80"],
        correct: 1
    },

    {
        question: "Oblicz: 3 × (12 - 5) + 8",
        answers: ["21", "29", "35"],
        correct: 1
    },

    {
        question: "Zamień ułamek 3/4 na liczbę dziesiętną.",
        answers: ["0,25", "0,75", "1,25"],
        correct: 1
    },

    {
        question: "Oblicz: 2/3 + 1/6",
        answers: ["1/2", "5/6", "1"],
        correct: 1
    },

    {
        question: "Oblicz 25% z 240.",
        answers: ["50", "60", "80"],
        correct: 1
    },

    {
        question: "Kurtka kosztowała 200 zł. Obniżono ją o 30%. Ile kosztuje po obniżce?",
        answers: ["130 zł", "140 zł", "170 zł"],
        correct: 1
    },

    {
        question: "Rozwiąż równanie: 4x - 7 = 21",
        answers: ["x = 6", "x = 7", "x = 8"],
        correct: 1
    },

    {
        question: "Oblicz: 2⁴ + 3²",
        answers: ["17", "25", "32"],
        correct: 1
    },

    {
        question: "Oblicz: √169",
        answers: ["12", "13", "14"],
        correct: 1
    },

    {
        question: "Prostokąt ma boki 8 cm i 13 cm. Jaki ma obwód?",
        answers: ["21 cm", "42 cm", "104 cm"],
        correct: 1
    },

    {
        question: "Trójkąt ma podstawę 12 cm i wysokość 7 cm. Oblicz jego pole.",
        answers: ["42 cm²", "84 cm²", "38 cm²"],
        correct: 0
    },

    {
        question: "Trójkąt prostokątny ma przyprostokątne 6 cm i 8 cm. Ile wynosi przeciwprostokątna?",
        answers: ["9 cm", "10 cm", "12 cm"],
        correct: 1
    },

    {
        question: "Dwa kąty trójkąta mają 65° i 45°. Ile wynosi trzeci kąt?",
        answers: ["60°", "70°", "80°"],
        correct: 1
    },

    {
        question: "Na mapie w skali 1:100 000 odległość wynosi 7 cm. Jaka jest rzeczywista odległość?",
        answers: ["5 km", "7 km", "70 km"],
        correct: 1
    },

    {
        question: "Samochód przejechał 180 km w 2 godziny i 15 minut. Jaka była średnia prędkość?",
        answers: ["60 km/h", "80 km/h", "90 km/h"],
        correct: 1
    },

    {
        question: "W klasie jest 30 uczniów. 40% z nich to dziewczęta. Ilu jest chłopców?",
        answers: ["12", "18", "20"],
        correct: 1
    },

    {
        question: "W pudełku jest 5 czerwonych, 3 niebieskie i 2 zielone kule. Jakie jest prawdopodobieństwo wylosowania czerwonej?",
        answers: ["1/2", "1/3", "1/5"],
        correct: 0
    },

    {
        question: "Oblicz średnią liczb: 6, 8, 10, 12, 14.",
        answers: ["8", "10", "12"],
        correct: 1
    },

    {
        question: "Ogród ma 18 m długości i 12 m szerokości. Oblicz jego pole.",
        answers: ["180 m²", "216 m²", "360 m²"],
        correct: 1
    }

];


let currentQuestion = 0;

let userAnswers = [];


// ============================
// START TESTU
// ============================

function startTest() {

    currentQuestion = 0;
    userAnswers = [];

    document.getElementById("startScreen").classList.add("hidden");

    document.getElementById("resultScreen").classList.add("hidden");

    document.getElementById("testScreen").classList.remove("hidden");

    showQuestion();

}


// ============================
// POKAZANIE PYTANIA
// ============================

function showQuestion() {

    const question = questions[currentQuestion];

    const container = document.getElementById("questionContainer");

    const letters = ["A", "B", "C"];

    let html = "";

    html += `
        <div class="question-number">
            Pytanie ${currentQuestion + 1}
        </div>

        <h2 class="question">
            ${question.question}
        </h2>

        <div class="answers">
    `;


    question.answers.forEach((answer, index) => {

        const checked =
            userAnswers[currentQuestion] === index
                ? "checked"
                : "";

        html += `
            <div class="answer">

                <input
                    type="radio"
                    id="answer${index}"
                    name="answer"
                    value="${index}"
                    ${checked}
                    onchange="saveAnswer(${index})"
                >

                <label for="answer${index}">

                    <span class="answer-letter">
                        ${letters[index]}
                    </span>

                    <span>
                        ${answer}
                    </span>

                </label>

            </div>
        `;

    });


    html += `</div>`;

    container.innerHTML = html;


    document.getElementById("questionCounter").innerText =
        `Pytanie ${currentQuestion + 1} z ${questions.length}`;


    const percent =
        Math.round(((currentQuestion + 1) / questions.length) * 100);


    document.getElementById("progressPercent").innerText =
        percent + "%";


    document.getElementById("progressFill").style.width =
        percent + "%";


    document.getElementById("backButton").style.display =
        currentQuestion === 0
            ? "none"
            : "block";


    document.getElementById("nextButton").innerText =
        currentQuestion === questions.length - 1
            ? "Zakończ test ✓"
            : "Dalej →";


    document.getElementById("warning").innerText = "";

}


// ============================
// ZAPIS ODPOWIEDZI
// ============================

function saveAnswer(answer) {

    userAnswers[currentQuestion] = answer;

    document.getElementById("warning").innerText = "";

}


// ============================
// NASTĘPNE PYTANIE
// ============================

function nextQuestion() {

    if (userAnswers[currentQuestion] === undefined) {

        document.getElementById("warning").innerText =
            "⚠️ Wybierz odpowiedź, zanim przejdziesz dalej.";

        return;
    }


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        finishTest();

    }

}


// ============================
// POPRZEDNIE PYTANIE
// ============================

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}


// ============================
// KONIEC TESTU
// ============================

function finishTest() {

    let points = 0;


    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] === questions[i].correct) {

            points++;

        }

    }


    document.getElementById("testScreen").classList.add("hidden");

    document.getElementById("resultScreen").classList.remove("hidden");


    document.getElementById("score").innerText =
        `${points}/${questions.length}`;


    let icon = "🎯";

    let message = "";


    if (points <= 5) {

        icon = "📚";

        message = `
            Warto jeszcze popracować nad podstawami matematyki.
            Nie martw się — każdy może poprawić swój wynik.
            W DK Math możemy krok po kroku nadrobić zaległości
            i zbudować solidne podstawy.
        `;

    } else if (points <= 10) {

        icon = "💪";

        message = `
            Masz już część podstaw opanowaną.
            Warto teraz skupić się na zagadnieniach,
            które sprawiają Ci największą trudność.
        `;

    } else if (points <= 15) {

        icon = "🚀";

        message = `
            Bardzo dobrze! Masz solidne podstawy matematyki.
            Kilka dodatkowych ćwiczeń może pomóc Ci wejść
            na jeszcze wyższy poziom.
        `;

    } else if (points <= 18) {

        icon = "🔥";

        message = `
            Świetny wynik! Bardzo dobrze radzisz sobie
            z matematyką i większością zagadnień
            sprawdzanych w tym teście.
        `;

    } else {

        icon = "🏆";

        message = `
            Rewelacyjny wynik! Masz bardzo dobrze opanowane
            zagadnienia sprawdzane w tym teście.
            Teraz warto skupić się na trudniejszych zadaniach
            i przygotowaniu do egzaminu ósmoklasisty.
        `;

    }


    document.getElementById("resultIcon").innerText = icon;

    document.getElementById("resultMessage").innerHTML = message;

}


// ============================
// PONOWNE ROZWIĄZANIE
// ============================

function restartTest() {

    currentQuestion = 0;

    userAnswers = [];

    document.getElementById("resultScreen").classList.add("hidden");

    document.getElementById("testScreen").classList.remove("hidden");

    showQuestion();

}