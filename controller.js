// controller.js
const express = require('express');
const bodyParser = require('body-parser');
const Aluno = require('./model');
const AlunoRepository = require('./repository');
const isValidString = (value) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(value);

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
    // Validar se algum dos campos está vazio ou não é uma string
    if (!nome || !origem || !destino || typeof nome !== 'string' || typeof origem !== 'string' || typeof destino !== 'string') {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios e devem ser strings' });
    }

    // Validar se todos os campos contêm apenas letras
    if (!isValidString(nome) || !isValidString(origem) || !isValidString(destino)) {
        return res.status(400).json({ error: 'Todos os campos devem conter apenas letras' });
    }

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
        // Validar se o ID está vazio
        if (!id) {
            return res.status(400).json({ error: 'O campo ID é obrigatório para atualizar um aluno.' });
        }

        // Validar se algum dos campos está vazio ou não é uma string
        if (!nome || !origem || !destino || typeof nome !== 'string' || typeof origem !== 'string' || typeof destino !== 'string') {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios e devem ser strings' });
        }

        // Validar se todos os campos contêm apenas letras
        if (!isValidString(nome) || !isValidString(origem) || !isValidString(destino)) {
            return res.status(400).json({ error: 'Todos os campos devem conter apenas letras' });
        }
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