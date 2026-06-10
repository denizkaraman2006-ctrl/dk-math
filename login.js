function login(){

    const login = document.getElementById("username").value;
    const haslo = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            login,
            haslo
        })
    })
    .then(res => res.text())
    .then(data => {

        if(data === "OK"){

    localStorage.setItem("user", login);

    window.location.href = "dashboard.html";
}
        else{
            alert("Nieprawidłowy login lub hasło");
        }

    });

}