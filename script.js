fetch("/stats")
.then(res => res.json())
.then(data => {

document.getElementById("lessons").innerText =
data.bookings || 0;

document.getElementById("students").innerText =
data.users || 0;

document.getElementById("rating").innerText =
95;

});