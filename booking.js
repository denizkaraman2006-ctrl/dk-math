function bookLesson() {

    const imie = document.getElementById("imie").value.trim();
    const email = document.getElementById("email").value.trim();
    const klasa = document.getElementById("klasa").value;
    const termin = document.getElementById("termin").value;
    const wiadomosc = document.getElementById("wiadomosc").value.trim();

    if (!imie || !email || !termin) {
        alert("⚠️ Uzupełnij imię i nazwisko, e-mail oraz termin.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("⚠️ Podaj poprawny adres e-mail.");
        return;
    }

    const data = {
        imie: imie,
        email: email,
        klasa: klasa,
        termin: termin,
        wiadomosc: wiadomosc
    };

    fetch("/book-lesson", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {

        alert(result);

        if (
            result.includes("wysłane") ||
            result.includes("utworzone") ||
            result.includes("otrzymałem")
        ) {
            document.getElementById("imie").value = "";
            document.getElementById("email").value = "";
            document.getElementById("termin").value = "";
            document.getElementById("wiadomosc").value = "";
        }

    })
    .catch(error => {

        console.error("Błąd:", error);

        alert(
            "❌ Nie udało się wysłać zgłoszenia. " +
            "Spróbuj ponownie za chwilę."
        );

    });
}