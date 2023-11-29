// controller.js
const express = require('express');
const bodyParser = require('body-parser');
const Aluno = require('./model');
const AlunoRepository = require('./repository');

const alunoRepository = new AlunoRepository();

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/alunos', (req, res) => {
    alunoRepository.listarAlunos((alunos) => {
        res.json(alunos);
    });
});

app.post('/alunos', (req, res) => {
    const { nome, origem, destino } = req.body;
    const novoAluno = new Aluno(null, nome, origem, destino);

    alunoRepository.criarAluno(novoAluno, (alunoId) => {
        res.json(`Aluno com o id: ${alunoId} criado com sucesso`);
    });
});

app.route('/aluno/:id')
    .get((req, res) => {
        const { id } = req.params;
        alunoRepository.buscarAluno(id, (aluno) => {
            if (aluno) {
                res.json(aluno);
            } else {
                res.status(404).json({ error: 'Aluno não encontrado' });
            }
        });
    })
    .put((req, res) => {
        const { id } = req.params;
        const { nome, origem, destino } = req.body;

        alunoRepository.atualizarAluno(id, nome, origem, destino, (alunoAtualizado) => {
            res.json(alunoAtualizado);
        });
    })
    .delete((req, res) => {
        const { id } = req.params;

        alunoRepository.deletarAluno(id, (result) => {
            res.json(result);
        });
    });

module.exports = app;