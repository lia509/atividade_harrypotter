const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3090;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harrypotter',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('ta funfando');
})


app.post('/bruxos',async (req, res) => {
    try {
        const { nome, idade, casa, habilidade, status_sangue, patrono} = req.body;
       
        
        await pool.query('INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, status_sangue, patrono]);
        res.status(201).send({mensagem: 'Bruxo adicionado com sucesso'});
    } catch (error) {
        console.error('Erro ao adicionar bruxo', error);
        res.status(500).send('Erro ao adicionar bruxo');
    }
});



app.delete('/bruxos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'bruxo deletado com sucesso'})
    } catch (error) {
        console.error('Erro ao apagar bruxos', error);
        res.status(500).send('Erro ao apagar o bruxos');
    }
});


app.put('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {nome, idade, casa, habilidade, status_sangue, patrono } = req.body;

        await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa, habilidade, status_sangue, patrono, id])
        res.status(200).send({mensagem: 'Bruxo atualizado com sucesso'})
    } catch (error) {
        console.error('Erro ao atualizar bruxo', error);
        res.status(500).send('Erro ao atualizar bruxo');
    }
});


app.get('/bruxos/:id', async(req, res) => {
    try {
        const { id } = req. params;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id])
        if(resultado.rowCount == 0){
            res.status(404).send({mensagem: 'Id não encontrado'});
        }
        res.json({
            bruxo: resultado.rows[0],
        })
    } catch (error) {
        console.error('Erro ao pegar bruxo por ID ', error);
        res.status(500).send('Erro ao pegar bruxo por ID');
    }
});

app.get('/bruxos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxos');
        res.json({
            total: resultado.rowCount,
            bruxos: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todos os bruxos', error);
        res.status(500).send('Erro ao obter os bruxos cadastrados');
    }
});




//varinhas

app.post('/varinhas',async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_fabricacao} = req.body;
       
        
        await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
        res.status(201).send({mensagem: 'Varinha adicionado com sucesso'});
    } catch (error) {
        console.error('Erro ao adicionar varinha', error);
        res.status(500).send('Erro ao adicionar varinha');
    }
});



app.delete('/varinhas/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Varinha deletado com sucesso'})
    } catch (error) {
        console.error('Erro ao apagar varinha', error);
        res.status(500).send('Erro ao apagar o varinha');
    }
});


app.put('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {material, comprimento, nucleo, data_fabricacao} = req.body;

        await pool.query('UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_fabricacao, id])
        res.status(200).send({mensagem: 'Bruxo atualizado com sucesso'})
    } catch (error) {
        console.error('Erro ao atualizar varinha', error);
        res.status(500).send('Erro ao atualizar varinha');
    }
});


app.get('/varinhas/:id', async(req, res) => {
    try {
        const { id } = req. params;
        const resultado = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id])
        if(resultado.rowCount == 0){
            res.status(404).send({mensagem: 'Id não encontrado'});
        }
        res.json({
            varinha: resultado.rows[0],
        })
    } catch (error) {
        console.error('Erro ao pegar varinha por ID ', error);
        res.status(500).send('Erro ao pegar varinha por ID');
    }
});

app.get('/varinhas', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinhas');
        res.json({
            total: resultado.rowCount,
            varinhas: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter todas as varinhas', error);
        res.status(500).send('Erro ao obter as varinhas cadastradas');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 👻`);
});
