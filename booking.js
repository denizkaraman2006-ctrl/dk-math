function bookLesson() {

    const imie = document.getElementById("imie").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefon = document.getElementById("telefon")?.value.trim() || "";
    const klasa = document.getElementById("klasa").value;
    const termin = document.getElementById("termin").value;
    const wiadomosc = document.getElementById("wiadomosc").value.trim();

    // Sprawdzenie wymaganych pól
    if (!imie || !email || !termin) {
        pokazKomunikat(
            "warning",
            "⚠️",
            "Uzupełnij wymagane pola",
            "Podaj imię i nazwisko, adres e-mail oraz preferowany termin."
        );
        return;
    }

    // Sprawdzenie adresu e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        pokazKomunikat(
            "warning",
            "⚠️",
            "Niepoprawny adres e-mail",
            "Sprawdź, czy wpisany adres e-mail jest prawidłowy."
        );
        return;
    }

    const data = {
        imie: imie,
        email: email,
        telefon: telefon,
        klasa: klasa,
        termin: termin,
        wiadomosc: wiadomosc
    };

    const button = document.querySelector(".booking-submit");

    if (button) {
        button.disabled = true;
        button.innerHTML = "⏳ Wysyłanie zgłoszenia...";
        button.style.opacity = "0.7";
        button.style.cursor = "wait";
    }

    fetch("/book-lesson", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    .then(response => response.text())

    .then(result => {

        console.log("Odpowiedź serwera:", result);

        if (
            result.includes("wysłane") ||
            result.includes("utworzone") ||
            result.includes("otrzymałem") ||
            result.includes("otrzymaliśmy") ||
            result.includes("sukces")
        ) {

            pokazSukces();

        } else {

            pokazKomunikat(
                "warning",
                "⚠️",
                "Nie udało się wysłać zgłoszenia",
                result
            );

            przywrocPrzycisk();
        }
    })

    .catch(error => {

        console.error("Błąd:", error);

        pokazKomunikat(
            "warning",
            "❌",
            "Wystąpił problem",
            "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę."
        );

        przywrocPrzycisk();
    });
}


/* =====================================================
   SUKCES
   ===================================================== */

function pokazSukces() {

    const card = document.querySelector(".booking-form-card");

    if (!card) return;

    card.innerHTML = `
        <div class="booking-success">

            <div class="success-icon">
                ✓
            </div>

            <span class="success-kicker">
                ZGŁOSZENIE OTRZYMANE
            </span>

            <h2>
                Zgłoszenie zostało wysłane!
            </h2>

            <p>
                Dziękuję za kontakt. Otrzymałem Twoje zgłoszenie
                i skontaktuję się z Tobą na podany adres e-mail.
            </p>

            <div class="success-info">

                <div class="success-info-item">
                    <span>✉️</span>
                    <div>
                        <strong>Sprawdź swoją skrzynkę</strong>
                        <small>
                            Odpowiedź otrzymasz na podany adres e-mail.
                        </small>
                    </div>
                </div>

                <div class="success-info-item">
                    <span>📅</span>
                    <div>
                        <strong>Termin zostanie potwierdzony</strong>
                        <small>
                            Wybrany termin jest propozycją.
                        </small>
                    </div>
                </div>

            </div>

            <a
                href="index.html"
                class="success-home-button"
            >
                ← Wróć na stronę główną
            </a>

        </div>
    `;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   KOMUNIKAT
   ===================================================== */

function pokazKomunikat(type, icon, title, message) {

    const oldMessage = document.querySelector(".booking-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    const form = document.getElementById("bookingForm");

    if (!form) return;

    const messageBox = document.createElement("div");

    messageBox.className = "booking-message " + type;

    messageBox.innerHTML = `
        <span class="booking-message-icon">${icon}</span>

        <div>
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
    `;

    form.prepend(messageBox);

    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =====================================================
   PRZYCISK — POWRÓT DO NORMALNEGO STANU
   ===================================================== */

function przywrocPrzycisk() {

    const button = document.querySelector(".booking-submit");

    if (!button) return;

    button.disabled = false;
    button.innerHTML = "<span>🚀</span> Wyślij zgłoszenie";
    button.style.opacity = "1";
    button.style.cursor = "pointer";
}