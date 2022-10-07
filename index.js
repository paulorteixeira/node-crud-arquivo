const express = require('express');
const cors = require('cors');

//const porta = process.env.PORT || 3000;
const porta = 3000;
const rotas_usuario    = require('./src/modules/routes/rotas');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(rotas_usuario)

//direciona ao index
app.get("/", (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
});

app.listen(process.env.PORT || porta);