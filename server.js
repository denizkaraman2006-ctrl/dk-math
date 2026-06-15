const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = new sqlite3.Database("database.db");

db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imie TEXT,
    nazwisko TEXT,
    email TEXT,
    login TEXT UNIQUE,
    haslo TEXT
)
`);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/register", (req, res) => {

    const { imie, nazwisko, email, login, haslo } = req.body;

    db.run(
        `INSERT INTO users (imie,nazwisko,email,login,haslo)
         VALUES (?,?,?,?,?)`,
        [imie, nazwisko, email, login, haslo],

        function(err){

            if(err){
                return res.send("Login już istnieje");
            }

            res.send("Konto utworzone");
        }
    );

});
app.post("/login", (req, res) => {

    const { login, haslo } = req.body;

    console.log("LOGIN:", login);
    console.log("HASLO:", haslo);

    db.get(
        "SELECT * FROM users WHERE login = ? AND haslo = ?",
        [login, haslo],
        (err, row) => {

            console.log("WYNIK:", row);

            if(row){
                res.send("OK");
            } else {
                res.send("BŁĄD");
            }

        }
    );

});
app.get("/users", (req, res) => {

    db.all(
        "SELECT * FROM users",
        [],
        (err, rows) => {

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
db.run(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    zadanie TEXT
)
`);
db.run(`
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    data TEXT,
    godzina TEXT,
    link TEXT
)
`);
db.run(`
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imie TEXT,
    email TEXT,
    telefon TEXT,
    klasa TEXT,
    wiadomosc TEXT,
    termin TEXT,
    status TEXT DEFAULT 'Oczekuje'
)
`);
db.run(`
CREATE TABLE IF NOT EXISTS opinions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    ocena INTEGER,
    tresc TEXT,
    status TEXT DEFAULT 'Oczekuje',
    odpowiedz TEXT
)
`);
app.post("/add-task", (req, res) => {

    const { login, zadanie } = req.body;

    db.run(
        "INSERT INTO tasks (login, zadanie) VALUES (?, ?)",
        [login, zadanie],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("Zadanie dodane");
        }
    );

});
app.get("/tasks/:login", (req, res) => {

    const login = req.params.login;

    db.all(
        "SELECT * FROM tasks WHERE login = ?",
        [login],
        (err, rows) => {

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
app.post("/book-lesson", (req, res) => {

    const {
        imie,
        email,
        telefon,
        klasa,
        wiadomosc,
        termin
    } = req.body;

    db.run(
        `INSERT INTO bookings
        (imie,email,telefon,klasa,wiadomosc,termin)
        VALUES (?,?,?,?,?,?)`,
        [imie,email,telefon,klasa,wiadomosc,termin],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("Zgłoszenie wysłane");
        }
    );

});
app.get("/bookings", (req, res) => {

    db.all(
        "SELECT * FROM bookings ORDER BY id DESC",
        [],
        (err, rows) => {

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
app.post("/update-booking", (req, res) => {

    const { id, status } = req.body;

    db.run(
        "UPDATE bookings SET status = ? WHERE id = ?",
        [status, id],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("OK");
        }
    );

});
app.get("/student-bookings/:email", (req, res) => {

    const email = req.params.email;

    db.all(
        "SELECT * FROM bookings WHERE email = ?",
        [email],
        (err, rows) => {

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
app.post("/change-password", (req, res) => {

    const { login, haslo } = req.body;

    db.run(
        "UPDATE users SET haslo = ? WHERE login = ?",
        [haslo, login],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("Hasło zmienione");
        }
    );

});
db.run(`
CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    nazwa TEXT,
    link TEXT
)
`);db.run(`
CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    nazwa TEXT,
    link TEXT
)
`);
app.post("/admin-login", (req,res)=>{

    const {
        login,
        password
    } = req.body;

    if(
        login === "ogretmen" &&
        password === "Deniz.1984"
    ){
        return res.send("OK");
    }

    res.send("BŁĄD");

});
const PORT = process.env.PORT || 3000;
app.post("/add-opinion", (req, res) => {

    const {
        login,
        ocena,
        tresc
    } = req.body;

    db.run(
        `INSERT INTO opinions
        (login,ocena,tresc)
        VALUES (?,?,?)`,
        [login,ocena,tresc],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("Opinia wysłana");
        }
    );

});

app.get("/opinions", (req, res) => {

    db.all(
        "SELECT * FROM opinions",
        [],
        (err, rows) => {

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
app.post("/accept-opinion", (req, res) => {

    const { id } = req.body;

    db.run(
        "UPDATE opinions SET status='Akceptowana' WHERE id=?",
        [id],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("OK");
        }
    );

});
app.post("/delete-opinion", (req, res) => {

    const { id } = req.body;

    db.run(
        "DELETE FROM opinions WHERE id=?",
        [id],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("OK");
        }
    );

});
app.get("/accepted-opinions", (req, res) => {

    db.all(
        "SELECT * FROM opinions WHERE status='Akceptowana'",
        [],
        (err, rows) => {

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
app.post("/add-lesson", (req,res)=>{

    const {
        login,
        data,
        godzina,
        link
    } = req.body;

    db.run(
        `INSERT INTO lessons
        (login,data,godzina,link)
        VALUES (?,?,?,?)`,
        [login,data,godzina,link],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send("Lekcja dodana");

        }
    );

});

app.get("/lesson/:login", (req, res) => {

    const login = req.params.login;

    db.get(
        "SELECT * FROM lessons WHERE login=? ORDER BY id DESC LIMIT 1",
        [login],
        (err, row) => {

            if(err){
                return res.json({});
            }

            res.json(row || {});
        }
    );

});
app.get("/stats", (req, res) => {

    db.get(
        `
        SELECT
        (SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM tasks) as tasks,
        (SELECT COUNT(*) FROM opinions) as opinions,
        (SELECT COUNT(*) FROM bookings) as bookings
        `,
        [],
        (err, row) => {

            if(err){
                return res.json({});
            }

            res.json(row);

        }
    );

});

app.post("/add-material", (req,res)=>{

    const {
        login,
        nazwa,
        link
    } = req.body;

    db.run(
        `INSERT INTO materials
        (login,nazwa,link)
        VALUES (?,?,?)`,
        [login,nazwa,link],
        function(err){

            if(err){
                return res.send("Błąd");
            }

            res.send(
                "Materiał dodany"
            );

        }
    );

});
app.get("/materials/:login", (req,res)=>{

    const login =
    req.params.login;

    db.all(
        "SELECT * FROM materials WHERE login=?",
        [login],
        (err,rows)=>{

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
app.listen(PORT, () => {
    console.log("Serwer działa na porcie " + PORT);
});