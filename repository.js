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
    // Verificar se o aluno com o ID existe
    db.get('SELECT * FROM alunos WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return callback({ error: 'Erro ao buscar aluno no banco de dados' });
        }

        if (!row) {
            // Aluno não encontrado, chama o callback com a mensagem apropriada
            return callback({ error: 'Aluno não encontrado' });
        }

        // Execução da consulta SQL para atualizar os dados no banco de dados
        const sql = 'UPDATE alunos SET nome=?, origem=?, destino=? WHERE id=?';
        db.run(sql, [nome, origem, destino, id], function(err) {
            if (err) {
                console.error(err.message);
            }
            callback({ id: id, message: 'Aluno atualizado com sucesso' });
        });
    });
    }

    deletarAluno(id, callback) {
        // Validar se o ID está vazio
        if (!id) {
            return callback({ error: 'O campo ID é obrigatório para deletar um aluno.' });
        }

        const sql = 'DELETE FROM alunos WHERE id=?';

        db.run(sql, [id], function(err) {
            if (err) {
                console.error(err.message);
                return callback({ error: 'Erro ao deletar aluno do banco de dados.' });
            }

            // Verificar se alguma linha foi afetada (se o aluno foi encontrado)
            if (this.changes > 0) {
                callback({ message: `O aluno com ID ${id} foi deletado com sucesso.` });
            } else {
                callback({ error: 'Aluno não encontrado.' });
            }
        });
    }
}


module.exports = AlunoRepository;
