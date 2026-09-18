// ========================================
// DK MATH - PANEL UCZNIA
// ========================================


// ========================================
// SPRAWDZENIE LOGOWANIA
// ========================================

const user = localStorage.getItem("user");


if (!user) {

    window.location.href = "login.html";

}


// ========================================
// POWITANIE
// ========================================

document.getElementById("welcome").innerText =
    "👋 Witaj, " + user;


// ========================================
// ZADANIA
// ========================================

fetch("/tasks/" + encodeURIComponent(user))

    .then(res => res.json())

    .then(tasks => {

        const container =
            document.getElementById("tasks");


        document.getElementById("tasksCount")
            .innerText = tasks.length;


        if (!tasks || tasks.length === 0) {

            container.innerHTML = `
                <div style="
                    padding:20px;
                    border-radius:12px;
                    background:rgba(255,255,255,0.04);
                ">
                    <p>
                        🎉 Nie masz obecnie żadnych zadań.
                    </p>
                </div>
            `;

            return;

        }


        let html = "";


        tasks.forEach((task, index) => {

            html += `

                <div style="
                    padding:20px;
                    margin-bottom:15px;
                    border-radius:15px;
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(255,255,255,0.08);
                ">

                    <h3 style="
                        margin-bottom:10px;
                    ">
                        📝 Zadanie ${index + 1}
                    </h3>

                    <p style="
                        line-height:1.7;
                        margin:0;
                    ">
                        ${task.zadanie}
                    </p>

                </div>

            `;

        });


        container.innerHTML = html;

    })

    .catch(error => {

        console.error(error);

        document.getElementById("tasks").innerHTML = `
            <p>
                ❌ Nie udało się pobrać zadań.
            </p>
        `;

    });


// ========================================
// LEKCJA
// ========================================

fetch("/lesson/" + encodeURIComponent(user))

    .then(res => res.json())

    .then(lesson => {

        const container =
            document.getElementById("lesson");


        const status =
            document.getElementById("lessonStatus");


        if (!lesson || !lesson.id) {

            status.innerText = "Brak";

            container.innerHTML = `

                <div style="
                    padding:25px;
                    border-radius:15px;
                    background:rgba(255,255,255,0.04);
                ">

                    <h3>
                        📭 Brak zaplanowanej lekcji
                    </h3>

                    <p style="
                        color:#94a3b8;
                    ">
                        Gdy nauczyciel zaplanuje lekcję,
                        pojawi się tutaj.
                    </p>

                </div>

            `;

            return;

        }


        status.innerText = "Jest";


        container.innerHTML = `

            <div style="
                padding:25px;
                border-radius:15px;
                background:rgba(255,255,255,0.04);
            ">

                <h3>
                    🎓 Twoja lekcja
                </h3>

                <p style="
                    font-size:20px;
                    margin-top:15px;
                ">
                    📅 ${lesson.data}
                </p>

                <p style="
                    font-size:20px;
                ">
                    ⏰ ${lesson.godzina}
                </p>

                <a
                    href="${lesson.link}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn"
                    style="
                        display:inline-block;
                        text-decoration:none;
                        margin-top:10px;
                    "
                >
                    🎥 Dołącz do lekcji
                </a>

            </div>

        `;

    })

    .catch(error => {

        console.error(error);

        document.getElementById("lesson")
            .innerHTML = `
                <p>
                    ❌ Nie udało się pobrać informacji o lekcji.
                </p>
            `;

    });


// ========================================
// MATERIAŁY
// ========================================

fetch("/materials/" + encodeURIComponent(user))

    .then(res => res.json())

    .then(materials => {

        const container =
            document.getElementById("materials");


        document.getElementById("materialsCount")
            .innerText = materials.length;


        if (!materials || materials.length === 0) {

            container.innerHTML = `

                <div style="
                    padding:20px;
                    border-radius:12px;
                    background:rgba(255,255,255,0.04);
                ">

                    <p>
                        📭 Nie masz jeszcze żadnych materiałów.
                    </p>

                </div>

            `;

            return;

        }


        let html = "";


        materials.forEach(material => {

            html += `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:15px;
                    flex-wrap:wrap;
                    padding:18px;
                    margin-bottom:12px;
                    border-radius:14px;
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(255,255,255,0.08);
                ">

                    <div>

                        <h3 style="
                            margin:0 0 5px 0;
                        ">
                            📄 ${material.nazwa}
                        </h3>

                        <p style="
                            margin:0;
                            color:#94a3b8;
                        ">
                            Materiał DK Math
                        </p>

                    </div>


                    <a
                        href="${material.link}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn"
                        style="
                            text-decoration:none;
                        "
                    >
                        📖 Otwórz
                    </a>

                </div>

            `;

        });


        container.innerHTML = html;

    })

    .catch(error => {

        console.error(error);

        document.getElementById("materials")
            .innerHTML = `
                <p>
                    ❌ Nie udało się pobrać materiałów.
                </p>
            `;

    });


// ========================================
// DODAWANIE OPINII
// ========================================

function addOpinion() {

    const ocena =
        document.getElementById("ocena").value;


    const tresc =
        document.getElementById("opinia")
            .value
            .trim();


    if (!tresc) {

        alert("Napisz najpierw swoją opinię.");

        return;

    }


    fetch("/add-opinion", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login: user,
            ocena: ocena,
            tresc: tresc

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);


        document.getElementById("opinia")
            .value = "";

    })

    .catch(error => {

        console.error(error);

        alert(
            "Wystąpił błąd podczas wysyłania opinii."
        );

    });

}


// ========================================
// WYLOGOWANIE
// ========================================

function logout() {

    localStorage.removeItem("user");

    window.location.href = "index.html";

}

// ========================================
// MOJE REZERWACJE
// ========================================

fetch("/student-bookings/" + encodeURIComponent(user))

    .then(res => res.json())

    .then(bookings => {

        const container =
            document.getElementById("myBookings");

        if (!bookings || bookings.length === 0) {

            container.innerHTML = `
                <div style="
                    padding:20px;
                    border-radius:12px;
                    background:rgba(255,255,255,0.04);
                ">
                    <p>
                        📭 Nie masz jeszcze żadnych rezerwacji.
                    </p>
                </div>
            `;

            return;
        }


        let html = "";


        bookings.forEach(booking => {

            let statusIcon = "🟡";

            if (booking.status === "Zaakceptowane") {
                statusIcon = "🟢";
            }

            if (booking.status === "Odrzucone") {
                statusIcon = "🔴";
            }


            html += `

                <div style="
                    padding:20px;
                    margin-bottom:15px;
                    border-radius:15px;
                    background:rgba(255,255,255,0.04);
                    border:1px solid rgba(255,255,255,0.08);
                ">

                    <h3>
                        ${statusIcon}
                        Zgłoszenie na lekcję
                    </h3>

                    <p>
                        <strong>📅 Termin:</strong>
                        ${booking.termin}
                    </p>

                    <p>
                        <strong>🎓 Klasa:</strong>
                        ${booking.klasa}
                    </p>

                    <p>
                        <strong>📌 Status:</strong>
                        ${booking.status}
                    </p>

                    <p>
                        <strong>💬 Wiadomość:</strong>
                        ${booking.wiadomosc || "Brak"}
                    </p>

                </div>

            `;

        });


        container.innerHTML = html;

    })

    .catch(error => {

        console.error(error);

        document.getElementById("myBookings").innerHTML = `
            <p>
                ❌ Nie udało się pobrać rezerwacji.
            </p>
        `;

    });

    