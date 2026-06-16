function bookLesson(){

    const imie = document.getElementById("imie").value;
    const email = document.getElementById("email").value;
    const telefon = document.getElementById("telefon").value;
    const klasa = document.getElementById("klasa").value;
    const termin = document.getElementById("termin").value;
    const wiadomosc = document.getElementById("wiadomosc").value;

    fetch("/book-lesson", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imie,
            email,
            telefon,
            klasa,
            termin,
            wiadomosc
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
    });

}