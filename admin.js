// ========================================
// DK MATH - PANEL ADMINISTRATORA
// ========================================


// ========================================
// POBIERANIE UCZNIÓW
// ========================================

function loadUsers() {

    fetch("/users")
        .then(res => res.json())
        .then(users => {

            let html = "";

            if (users.length === 0) {

                html = `
                    <div class="card">
                        <p>Brak uczniów.</p>
                    </div>
                `;

            } else {

                users.forEach(user => {

                    html += `

                    <div
                        class="card student-card"
                        data-student="
                            ${user.imie}
                            ${user.nazwisko}
                            ${user.email}
                            ${user.login}
                    "
                        style="margin-bottom:15px;"
                    >

                        <h3>
                            👨‍🎓 ${user.imie} ${user.nazwisko}
                        </h3>

                        <p>
                            <strong>ID:</strong>
                            ${user.id}
                        </p>

                        <p>
                            <strong>📧 E-mail:</strong>
                            ${user.email}
                        </p>

                        <p>
                            <strong>🔑 Login:</strong>
                            ${user.login}
                        </p>

                        <p>
                            <strong>🔐 Hasło:</strong>
                            ${user.haslo}
                        </p>


                        <div style="
                            display:flex;
                            gap:10px;
                            flex-wrap:wrap;
                            margin-top:15px;
                        ">

                            <button
                                onclick="useStudentLogin('${user.login}')"
                                class="btn"
                            >
                                📝 Użyj loginu
                            </button>

                            <button
                                onclick="useStudentForLesson('${user.login}')"
                                class="btn"
                            >
                                📅 Lekcja
                            </button>

                            <button
                                onclick="useStudentForMaterial('${user.login}')"
                                class="btn"
                            >
                                📚 Materiał
                            </button>

                            <button
                                onclick="useStudentForPassword('${user.login}')"
                                class="btn"
                            >
                                🔑 Zmień hasło
                            </button>

                            <button
                                onclick="deleteUser(${user.id}, '${user.imie} ${user.nazwisko}')"
                                style="
                                    background:#dc2626;
                                    color:white;
                                    border:none;
                                    padding:10px 15px;
                                    border-radius:10px;
                                    cursor:pointer;
                                "
                            >
                                🗑️ Usuń ucznia
                            </button>

                        </div>

                    </div>

                    `;

                });

            }

            document.getElementById("users").innerHTML = html;

        })
        .catch(error => {

            console.error(error);

            document.getElementById("users").innerHTML = `
                <div class="card">
                    <p>❌ Nie udało się pobrać uczniów.</p>
                </div>
            `;

        });

}


// ========================================
// WYSZUKIWANIE UCZNIÓW
// ========================================

function searchStudents() {

    const searchInput =
        document.getElementById("searchStudent");

    if (!searchInput) return;

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const students =
        document.querySelectorAll(".student-card");


    students.forEach(student => {

        const text =
            student.innerText.toLowerCase();


        if (text.includes(search)) {

            student.style.display = "";

        } else {

            student.style.display = "none";

        }

    });

}


// ========================================
// DODAWANIE UCZNIA
// ========================================

function addUser() {

    const imie =
        document.getElementById("newImie").value.trim();

    const nazwisko =
        document.getElementById("newNazwisko").value.trim();

    const email =
        document.getElementById("newEmail").value.trim();

    const login =
        document.getElementById("newLogin").value.trim();

    const haslo =
        document.getElementById("newHaslo").value.trim();


    if (!imie || !nazwisko || !email || !login || !haslo) {

        alert("Uzupełnij wszystkie pola.");

        return;

    }


    fetch("/add-user", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            imie,
            nazwisko,
            email,
            login,
            haslo

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);


        if (data === "Uczeń został dodany") {

            document.getElementById("newImie").value = "";
            document.getElementById("newNazwisko").value = "";
            document.getElementById("newEmail").value = "";
            document.getElementById("newLogin").value = "";
            document.getElementById("newHaslo").value = "";

            loadUsers();
            loadStats();

        }

    })

    .catch(error => {

        console.error(error);

        alert("Wystąpił błąd podczas dodawania ucznia.");

    });

}


// ========================================
// USUWANIE UCZNIA
// ========================================

function deleteUser(id, name) {

    const confirmation =
        confirm(
            "Czy na pewno chcesz usunąć ucznia:\n\n" +
            name +
            "?\n\n" +
            "Tej operacji nie można cofnąć."
        );


    if (!confirmation) {

        return;

    }


    fetch("/delete-user", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: id
        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);


        if (data === "Uczeń został usunięty") {

            loadUsers();
            loadStats();

        }

    })

    .catch(error => {

        console.error(error);

        alert("Wystąpił błąd podczas usuwania ucznia.");

    });

}


// ========================================
// WYPEŁNIANIE LOGINU DO ZADANIA
// ========================================

function useStudentLogin(login) {

    document.getElementById("login").value = login;

    document.getElementById("zadanie").focus();

    window.scrollTo({

        top:
            document.getElementById("login")
                .getBoundingClientRect().top
            + window.scrollY
            - 100,

        behavior: "smooth"

    });

}


// ========================================
// WYPEŁNIANIE LOGINU DO LEKCJI
// ========================================

function useStudentForLesson(login) {

    document.getElementById("lessonLogin").value = login;

    document.getElementById("lessonDate").focus();

    window.scrollTo({

        top:
            document.getElementById("lessonLogin")
                .getBoundingClientRect().top
            + window.scrollY
            - 100,

        behavior: "smooth"

    });

}


// ========================================
// WYPEŁNIANIE LOGINU DO MATERIAŁU
// ========================================

function useStudentForMaterial(login) {

    document.getElementById("materialLogin").value = login;

    document.getElementById("materialName").focus();

    window.scrollTo({

        top:
            document.getElementById("materialLogin")
                .getBoundingClientRect().top
            + window.scrollY
            - 100,

        behavior: "smooth"

    });

}


// ========================================
// WYPEŁNIANIE LOGINU DO ZMIANY HASŁA
// ========================================

function useStudentForPassword(login) {

    document.getElementById("changeLogin").value = login;

    document.getElementById("newPassword").focus();

    window.scrollTo({

        top:
            document.getElementById("changeLogin")
                .getBoundingClientRect().top
            + window.scrollY
            - 100,

        behavior: "smooth"

    });

}


// ========================================
// DODAWANIE ZADANIA
// ========================================

function addTask() {

    const login =
        document.getElementById("login").value.trim();

    const zadanie =
        document.getElementById("zadanie").value.trim();


    if (!login || !zadanie) {

        alert("Uzupełnij wszystkie pola.");

        return;

    }


    fetch("/add-task", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login,
            zadanie

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

    })

    .catch(error => {

        console.error(error);

        alert("Błąd podczas dodawania zadania.");

    });

}


// ========================================
// DODAWANIE LEKCJI
// ========================================

function addLesson() {

    const login =
        document.getElementById("lessonLogin").value.trim();

    const data =
        document.getElementById("lessonDate").value;

    const godzina =
        document.getElementById("lessonTime").value;

    const link =
        document.getElementById("lessonLink").value.trim();


    if (!login || !data || !godzina || !link) {

        alert("Uzupełnij wszystkie pola lekcji.");

        return;

    }


    fetch("/add-lesson", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login,
            data,
            godzina,
            link

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

    })

    .catch(error => {

        console.error(error);

        alert("Błąd podczas dodawania lekcji.");

    });

}


// ========================================
// DODAWANIE MATERIAŁU
// ========================================

function addMaterial() {

    const login =
        document.getElementById("materialLogin")
            .value.trim();

    const nazwa =
        document.getElementById("materialName")
            .value.trim();

    const link =
        document.getElementById("materialLink")
            .value.trim();


    if (!login || !nazwa || !link) {

        alert("Uzupełnij wszystkie pola materiału.");

        return;

    }


    fetch("/add-material", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login,
            nazwa,
            link

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

    })

    .catch(error => {

        console.error(error);

        alert("Błąd podczas dodawania materiału.");

    });

}


// ========================================
// ZMIANA HASŁA
// ========================================

function changePassword() {

    const login =
        document.getElementById("changeLogin")
            .value.trim();

    const haslo =
        document.getElementById("newPassword")
            .value.trim();


    if (!login || !haslo) {

        alert("Uzupełnij login i nowe hasło.");

        return;

    }


    fetch("/change-password", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login,
            haslo

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

    })

    .catch(error => {

        console.error(error);

        alert("Błąd podczas zmiany hasła.");

    });

}


// ========================================
// REZERWACJE
// ========================================

function loadBookings() {

    fetch("/bookings")

        .then(res => res.json())

        .then(bookings => {

            let html = "";


            if (bookings.length === 0) {

                html = `
                    <p style="color:#94a3b8;">
                        Brak zgłoszeń.
                    </p>
                `;

            } else {

                bookings.forEach(booking => {

                    html += `

                    <div class="card" style="margin-bottom:15px;">

                        <h3>
                            📅 ${booking.imie}
                        </h3>

                        <p>
                            <strong>📧 E-mail:</strong>
                            ${booking.email}
                        </p>

                        <p>
                            <strong>📱 Telefon:</strong>
                            ${booking.telefon}
                        </p>

                        <p>
                            <strong>🎓 Klasa:</strong>
                            ${booking.klasa}
                        </p>

                        <p>
                            <strong>🕐 Termin:</strong>
                            ${booking.termin}
                        </p>

                        <p>
                            <strong>📌 Status:</strong>
                            ${booking.status}
                        </p>

                        <p>
                            <strong>💬 Wiadomość:</strong>
                            ${booking.wiadomosc || "Brak"}
                        </p>

                        <div style="
                            display:flex;
                            gap:10px;
                            flex-wrap:wrap;
                        ">

                            <button
                                onclick="acceptBooking(${booking.id})"
                                class="btn"
                            >
                                ✅ Akceptuj
                            </button>

                            <button
                                onclick="rejectBooking(${booking.id})"
                                style="
                                    background:#dc2626;
                                    color:white;
                                    border:none;
                                    padding:10px 15px;
                                    border-radius:10px;
                                    cursor:pointer;
                                "
                            >
                                ❌ Odrzuć
                            </button>

                        </div>

                    </div>

                    `;

                });

            }


            document.getElementById("bookings").innerHTML = html;

        })

        .catch(error => {

            console.error(error);

        });

}


// ========================================
// AKCEPTACJA REZERWACJI
// ========================================

function acceptBooking(id) {

    fetch("/update-booking", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            id: id,
            status: "Zaakceptowane"

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

        loadBookings();
        loadStats();

    });

}


// ========================================
// ODRZUCENIE REZERWACJI
// ========================================

function rejectBooking(id) {

    fetch("/update-booking", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            id: id,
            status: "Odrzucone"

        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

        loadBookings();
        loadStats();

    });

}


// ========================================
// OPINIE
// ========================================

function loadOpinions() {

    fetch("/opinions")

        .then(res => res.json())

        .then(opinions => {

            let html = "";


            if (opinions.length === 0) {

                html = `
                    <p style="color:#94a3b8;">
                        Brak opinii.
                    </p>
                `;

            } else {

                opinions.forEach(opinion => {

                    html += `

                    <div class="card" style="margin-bottom:15px;">

                        <p>
                            <strong>👤 Login:</strong>
                            ${opinion.login}
                        </p>

                        <p>
                            <strong>⭐ Ocena:</strong>
                            ${opinion.ocena}
                        </p>

                        <p>
                            <strong>💬 Opinia:</strong>
                            ${opinion.tresc}
                        </p>

                        <div style="
                            display:flex;
                            gap:10px;
                            flex-wrap:wrap;
                        ">

                            <button
                                onclick="acceptOpinion(${opinion.id})"
                                class="btn"
                            >
                                ✅ Akceptuj
                            </button>

                            <button
                                onclick="deleteOpinion(${opinion.id})"
                                style="
                                    background:#dc2626;
                                    color:white;
                                    border:none;
                                    padding:10px 15px;
                                    border-radius:10px;
                                    cursor:pointer;
                                "
                            >
                                🗑️ Usuń
                            </button>

                        </div>

                    </div>

                    `;

                });

            }


            document.getElementById("opinions").innerHTML = html;

        })

        .catch(error => {

            console.error(error);

        });

}


// ========================================
// AKCEPTACJA OPINII
// ========================================

function acceptOpinion(id) {

    fetch("/accept-opinion", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: id
        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

        loadOpinions();

    });

}


// ========================================
// USUWANIE OPINII
// ========================================

function deleteOpinion(id) {

    if (!confirm("Czy na pewno chcesz usunąć tę opinię?")) {

        return;

    }


    fetch("/delete-opinion", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: id
        })

    })

    .then(res => res.text())

    .then(data => {

        alert(data);

        loadOpinions();

    });

}


// ========================================
// STATYSTYKI
// ========================================

function loadStats() {

    fetch("/stats")

        .then(res => res.json())

        .then(stats => {

            document.getElementById("usersCount")
                .innerText = stats.users;

            document.getElementById("tasksCount")
                .innerText = stats.tasks;

            document.getElementById("opinionsCount")
                .innerText = stats.opinions;

            document.getElementById("bookingsCount")
                .innerText = stats.bookings;

        })

        .catch(error => {

            console.error(error);

        });


    fetch("/visits")

        .then(res => res.json())

        .then(data => {

            document.getElementById("visitsCount")
                .innerText = data.visits;

        })

        .catch(error => {

            console.error(error);

        });

}


// ========================================
// WYLOGOWANIE
// ========================================

function logoutAdmin() {

    localStorage.removeItem("adminLogged");

    window.location.href =
        "panel-deniz-2026.html";

}


// ========================================
// START PANELU
// ========================================

loadUsers();

loadStats();

loadBookings();

loadOpinions();