
const user = localStorage.getItem("user");

if(!user){
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText =
"Witaj, " + user;

fetch("/tasks/" + user)
.then(res => res.json())
.then(tasks => {

    let html = "";

    tasks.forEach(task => {
        html += `<p>• ${task.zadanie}</p>`;
    });

    document.getElementById("tasks").innerHTML = html;

});

fetch("/lesson/" + user)
.then(res => res.json())
.then(lesson => {

    if(!lesson.id){
        document.getElementById("lesson").innerHTML =
        "<p>Brak zaplanowanej lekcji</p>";
        return;
    }

    document.getElementById("lesson").innerHTML = `
        <p>📅 ${lesson.data}</p>
        <p>⏰ ${lesson.godzina}</p>
        <a href="${lesson.link}"
        target="_blank"
        class="btn">
        Dołącz do lekcji
        </a>
    `;

});

fetch("/materials/" + user)
.then(res => res.json())
.then(materials => {

    let html = "";

    if(materials.length === 0){
        html = "<p>Brak materiałów</p>";
    }

    materials.forEach(material => {

        html += `
        <p>
        <a href="${material.link}"
        target="_blank">
        📄 ${material.nazwa}
        </a>
        </p>
        `;
    });

    document.getElementById("materials").innerHTML = html;

});

function addOpinion(){

    const ocena =
    document.getElementById("ocena").value;

    const tresc =
    document.getElementById("opinia").value;

    fetch("/add-opinion", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            login:user,
            ocena,
            tresc
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
    });

}

function logout(){

    localStorage.removeItem("user");

    window.location.href = "index.html";

}

