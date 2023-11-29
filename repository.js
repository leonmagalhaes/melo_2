// repository.js
const db = require('./db');

class AlunoRepository {
    constructor() {
        this.createTable();
    }

    createTable() {
        db.run(`CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            origem TEXT NOT NULL,
            destino TEXT NOT NULL
        )`);
    }

    listarAlunos(callback) {
        db.all('SELECT * FROM alunos', (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            callback(rows);
        });
    }

    criarAluno(aluno, callback) {
        const { nome, origem, destino } = aluno;
        const sql = 'INSERT INTO alunos (nome, origem, destino) VALUES (?, ?, ?)';

        db.run(sql, [nome, origem, destino], function(err) {
            if (err) {
                console.error(err.message);
            }
            callback(this.lastID);
        });
    }

    buscarAluno(id, callback) {
        db.get('SELECT * FROM alunos WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            callback(row);
        });
    }

    atualizarAluno(id, nome, origem, destino, callback) {
        const sql = 'UPDATE alunos SET nome=?, origem=?, destino=? WHERE id=?';

        db.run(sql, [nome, origem, destino, id], function(err) {
            if (err) {
                console.error(err.message);
            }
            callback({ id: id, message: 'Aluno atualizado com sucesso' });
        });
    }

    deletarAluno(id, callback) {
        const sql = 'DELETE FROM alunos WHERE id=?';

        db.run(sql, [id], function(err) {
            if (err) {
                console.error(err.message);
            }
            callback(`O aluno com id: ${id} foi deletado com sucesso.`);
        });
    }
}

module.exports = AlunoRepository;
