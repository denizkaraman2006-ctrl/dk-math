fetch("/users")
.then(res => res.json())
.then(users => {

    let html = "";

    users.forEach(user => {

        html += `
        <div class="card">
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Imię:</strong> ${user.imie}</p>
            <p><strong>Nazwisko:</strong> ${user.nazwisko}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Login:</strong> ${user.login}</p>
            <p><strong>Hasło:</strong> ${user.haslo}</p>
        </div>
        `;

    });

    document.getElementById("users").innerHTML = html;
fetch("/stats")
.then(res => res.json())
.then(stats => {

    document.getElementById("stats").innerHTML = `
    <p>👨‍🎓 Uczniowie: ${stats.users}</p>
    <p>📝 Zadania: ${stats.tasks}</p>
    <p>⭐ Opinie: ${stats.opinions}</p>
    <p>📅 Rezerwacje: ${stats.bookings}</p>
    `;

});
});
function addTask(){

    const login =
    document.getElementById("login").value;

    const zadanie =
    document.getElementById("zadanie").value;

    if(!login || !zadanie){
        alert("Uzupełnij wszystkie pola");
        return;
    }

    fetch("/add-task", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            login,
            zadanie
        })
    })
    .then(res => res.text())
    .then(data => {
        console.log(data);
        alert(data);
    });

}fetch("/bookings")
.then(res => res.json())
.then(bookings => {

    let html = "";

    bookings.forEach(booking => {

        html += `
        <div class="card">

            <p><strong>Imię:</strong> ${booking.imie}</p>

            <p><strong>Email:</strong> ${booking.email}</p>

            <p><strong>Telefon:</strong> ${booking.telefon}</p>

            <p><strong>Klasa:</strong> ${booking.klasa}</p>

            <p><strong>Termin:</strong> ${booking.termin}</p>

            <p><strong>Status:</strong> ${booking.status}</p>

<button onclick="acceptBooking(${booking.id})">
✅ Akceptuj
</button>

<button onclick="rejectBooking(${booking.id})">
❌ Odrzuć
</button>

            <p><strong>Wiadomość:</strong> ${booking.wiadomosc}</p>

        </div>
        `;
    });

    document.getElementById("bookings").innerHTML = html;

});
function acceptBooking(id){

    fetch("/update-booking", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id,
            status:"Zaakceptowane"
        })
    })
    .then(res => res.text())
    .then(() => {
        location.reload();
    });

}

function rejectBooking(id){

    fetch("/update-booking", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id,
            status:"Odrzucone"
        })
    })
    .then(res => res.text())
    .then(() => {
        location.reload();
    });

}
function changePassword(){

    const login =
    document.getElementById("changeLogin").value;

    const haslo =
    document.getElementById("newPassword").value;

    if(!login || !haslo){
        alert("Uzupełnij wszystkie pola");
        return;
    }

    fetch("/change-password", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            login,
            haslo
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
    });

}
function logoutAdmin(){

    localStorage.removeItem(
        "adminLogged"
    );

    window.location.href =
    "loginadmin.html";

}
fetch("/opinions")
.then(res => res.json())
.then(opinions => {

    let html = "";

    opinions.forEach(opinion => {

        html += `
        <div class="card">

            <p><strong>Login:</strong> ${opinion.login}</p>

            <p><strong>Ocena:</strong> ${opinion.ocena} ⭐</p>

            <p><strong>Opinia:</strong> ${opinion.tresc}</p>
<button onclick="acceptOpinion(${opinion.id})">
✅ Akceptuj
</button>

<button onclick="deleteOpinion(${opinion.id})">
🗑 Usuń
</button>
        </div>
        `;

    });

    document.getElementById("opinions").innerHTML = html;

});
function acceptOpinion(id){

    fetch("/accept-opinion", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id
        })
    })
    .then(res => res.text())
    .then(() => {
        location.reload();
    });

}

function deleteOpinion(id){

    fetch("/delete-opinion", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:id
        })
    })
    .then(res => res.text())
    .then(() => {
        location.reload();
    });

}
function addLesson(){

    const login =
    document.getElementById("lessonLogin").value;

    const data =
    document.getElementById("lessonDate").value;

    const godzina =
    document.getElementById("lessonTime").value;

    const link =
    document.getElementById("lessonLink").value;

    fetch("/add-lesson", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            login,
            data,
            godzina,
            link
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
    });

}
fetch("/stats")
.then(res => res.json())
.then(stats => {

    document.getElementById(
        "usersCount"
    ).innerText = stats.users;

    document.getElementById(
        "tasksCount"
    ).innerText = stats.tasks;

    document.getElementById(
        "opinionsCount"
    ).innerText = stats.opinions;

    document.getElementById(
        "bookingsCount"
    ).innerText = stats.bookings;

});
function addMaterial(){

    const login =
    document.getElementById(
        "materialLogin"
    ).value;

    const nazwa =
    document.getElementById(
        "materialName"
    ).value;

    const link =
    document.getElementById(
        "materialLink"
    ).value;

    fetch("/add-material",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            login,
            nazwa,
            link
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
    });

}
