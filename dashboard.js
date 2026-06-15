fetch("/materials/" + user)
.then(res => res.json())
.then(materials => {

    let html = "";

    materials.forEach(material => {

        html += `
        <p>
        <a href="${material.link}"
        target="_blank">
        ${material.nazwa}
        </a>
        </p>
        `;

    });

    document.getElementById(
        "materials"
    ).innerHTML = html;

});