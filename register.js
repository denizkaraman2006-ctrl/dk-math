function register() {

    const imie = document.getElementById("imie").value;
    const nazwisko = document.getElementById("nazwisko").value;
    const email = document.getElementById("email").value;
    const login = document.getElementById("login").value;
    const haslo = document.getElementById("haslo").value;
    const haslo2 = document.getElementById("haslo2").value;

    if(haslo !== haslo2){
        alert("Hasła nie są takie same");
        return;
    }

    fetch("/register", {
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
        if(data === "Konto utworzone"){
    alert(data);
    window.location.href = "login.html";
}
else{
    alert(data);
}
    });

}