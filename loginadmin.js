function adminLogin(){

    const login =
    document.getElementById("login").value;

    const password =
    document.getElementById("password").value;

    fetch("/admin-login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            login,
            password
        })
    })
    .then(res => res.text())
    .then(data => {

        if(data === "OK"){

            localStorage.setItem(
                "adminLogged",
                "true"
            );

            window.location.href =
            "admin.html";

        }else{

            alert("Błędne dane");

        }

    });

}