function checkTest() {

    const answers = {
        q1: "633",
        q2: "70",
        q3: "29",
        q4: "0.75",
        q5: "5/6",
        q6: "60",
        q7: "140",
        q8: "7",
        q9: "25",
        q10: "13",
        q11: "42",
        q12: "42",
        q13: "10",
        q14: "70",
        q15: "7",
        q16: "80",
        q17: "18",
        q18: "1/2",
        q19: "10",
        q20: "216"
    };

    let points = 0;

    for (let question in answers) {

        const selected = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (selected && selected.value === answers[question]) {
            points++;
        }
    }

    let level = "";

    if (points <= 5) {
        level = "Wymaga pracy nad podstawami";
    }
    else if (points <= 10) {
        level = "Podstawowy";
    }
    else if (points <= 15) {
        level = "Dobry";
    }
    else if (points <= 18) {
        level = "Bardzo dobry";
    }
    else {
        level = "Bardzo wysoki";
    }

    document.getElementById("result").innerHTML =
        "Twój wynik: <strong>" + points + "/20</strong><br><br>" +
        "Poziom: <strong>" + level + "</strong>";
}