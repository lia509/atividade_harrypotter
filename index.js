const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3080;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harrypotter',
    password: 'ds564',
    port: 7007,
});

app.post('/usuarios',async (req, res) => {
    try {
        const {nome, email, datanascimento} = req.body;
        const dataNascimento = new Date(datanascimento);
        const idade = calcularIdade(dataNascimento);
        const signo = calcularSigno(dataNascimento.getMonth() + 1, dataNascimento.getDate());


        await pool.query('INSERT INTO usuarios (nome, email, idade, signo, datanascimento) VALUES ($1, $2, $3, $4, $5)', [nome, email, idade, signo, datanascimento]);
        res.status(201).send({mensagem: 'Usuario criado com sucesso'});
    } catch (error) {
        console.error('Erro ao criar usuario', error);
        res.status(500).send('Erro ao criar usuario');
    }
});



app.delete('/usuarios/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'usuario deletado com sucesso'})
    } catch (error) {
        console.error('Erro ao apagar usuario', error);
        res.status(500).send('Erro ao apagar o usuario');
    }
});


app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, datanascimento } = req.body;
        const dataNascimento = new Date(datanascimento);
        const idade = calcularIdade(dataNascimento);
        const signo = calcularSigno(dataNascimento.getMonth() + 1, dataNascimento.getDate());
 
        await pool.query('UPDATE usuarios SET nome = $1, email = $2, idade = $3, signo = $4, datanascimento = $5 WHERE id = $6', [nome, email, idade, signo, datanascimento, id])
        res.status(200).send({mensagem: 'usuario atualizado com sucesso'})
    } catch (error) {
        console.error('Erro ao atualizar', error);
        res.status(500).send('Erro ao atualizar');
    }
});


app.get('/usuarios/:id', async(req, res) => {
    try {
        const { id } = req. params;
        const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
        if(resultado.rowCount == 0){
            res.status(404).send({mensagem: 'Id não encontrado'});
        }
        res.json({
            usuarios: resultado.rows[0],
        })
    } catch (error) {
        console.error('Erro ao pegar usuario por ID ', error);
        res.status(500).send('Erro ao pegar usuario por ID');
    }
});





app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
