alert("admin js działa");
function adminLogin(){

    const login =
    document.getElementById("login").value;

    const password =
    document.getElementById("password").value;

    if(
        login === "ogretmen" &&
        password === "Deniz.1984"
    ){

        localStorage.setItem(
            "adminLogged",
            "true"
        );

        window.location.href =
        "admin.html";

    }else{

        alert("Błędne dane");

    }

}