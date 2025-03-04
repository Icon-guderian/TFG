const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();

const corsOp = {
    origin: ['http://127.0.0.1','http://webvulnerable.com','http://www.webvulnerable.com']
};

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOp));

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'serverDB',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

app.get('/', (req, res) => {
    res.sendFile('/var/www/www.server.com/public/index.html');
});

// Codigo  con vulnerabilidad SQL injection. Code with a SQL vulnerability
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.query(query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
	    console.log("Login exitoso");
            res.send("Login exitoso");
        } else {
	    console.log("Usuario o contraseña incorrectos");
            res.send("Usuario o contraseña incorrectos");
        }
    });
});

// Codigo con vulerbabilidad XSS. Code with a XSS vulnerability
app.post('/comment', (req, res) => {
    const { comment_text } = req.body;
    const query = `INSERT INTO comments (text) VALUES ('${comment_text}')`;
    db.query(query, err => {
        if (err) throw err;
        res.send("Comentario agregado");
    });
});

app.get('/comments', (req, res) => {
    db.query("SELECT text FROM comments", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// **Command Injection Vulnerability**
app.post('/ping', (req, res) => {
    const { ip } = req.body;
    exec(`ping -c 2 ${ip}`, (error, stdout) => {
        if (error) {
            res.send(`Error ejecutando ping: ${error.message}`);
            return;
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});


app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
