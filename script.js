fetch("/stats")

.then(res => res.json())

.then(data => {

    document.getElementById("lessons").innerText =
        "15+";

    document.getElementById("students").innerText =
        "10+";

    document.getElementById("rating").innerText =
        "100%";

});