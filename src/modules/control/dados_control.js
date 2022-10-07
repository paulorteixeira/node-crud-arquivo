
dados_model = require('../model/dados_model')

class dados_Controller {

    async innerElements(req, res) {
        var dados_arquivo = await dados_model.getDados();
        return res.json(dados_arquivo);
    }

    async getElementById(req, res) {
        var dados_arquivo = await dados_model.getDados();

        const conta = dados_arquivo.find(c => c.id === parseInt(req.params.id));
        if (!conta) {
            res.status(404).send(" 404 - Não encontrado");
        }
        res.send(conta);
    }

    async appendChild(req, res) {
        if (!req.body.nome) {
            res.status(400).send("Invalido");
            return;
        }
        const conta = {
            id: 1,
            nome: req.body.nome,
            valor: req.body.valor,
            id_persona: req.body.id_persona || 1,
            vencimento: req.body.vencimento,
            status: true
        };
        var dados_arquivo = await dados_model.getDados();
        if (!dados_arquivo) {
            dados_arquivo = []
        } else {
            if (dados_arquivo.length > 0)
                conta.id = dados_arquivo[dados_arquivo.length - 1].id + 1

        }

        dados_arquivo.push(conta)

        dados_model.setDados(dados_arquivo);

        res.send(conta);
    }

    async update(req, res) {
        var dados = await dados_model.getDados();

        const conta = dados.find(c => c.id === parseInt(req.params.id));
        const index = dados.indexOf(conta);

        if (!conta) {
            return res.status(404).send(" 404 - Não encontrado");
        }
        
        dados[index] = {
            id: conta.id,
            nome: req.body.nome != undefined ? req.body.nome : conta.nome,
            valor: req.body.valor != undefined ? req.body.valor : conta.valor,
            id_persona: req.body.id_persona != undefined ? req.body.id_persona : conta.id_persona,
            vencimento: req.body.vencimento != undefined ? req.body.vencimento : conta.vencimento,
            status: req.body.status != undefined ? req.body.status : conta.status
        };

        dados_model.setDados(dados);

        res.send(dados[index]);
    }

    async shakeTheTree(req, res) {
        var dados = await dados_model.getDados();
        const conta = dados.find(c => c.id === parseInt(req.params.id));
        if (!conta) {
            return res.status(404).send(" 404 - Não encontrado");
        }
        const index = dados.indexOf(conta);
        dados.splice(index, 1);

        dados_model.setDados(dados);
        res.send(conta);
    }

}

module.exports = new dados_Controller()