// index.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração da tabela no banco de dados
db.run(`CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    origem TEXT NOT NULL,
    destino TEXT NOT NULL
)`);

// Configuração das rotas
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
