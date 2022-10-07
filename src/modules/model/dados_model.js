const fs = require('fs')

class Dados_Model {
    async getDados() {

        try {
            return new Promise((resolve) => {
                fs.readFile('./contas.json', 'utf-8', function (err, data) {
                    if (err) throw err;
                    resolve(JSON.parse(data || '[]'))
                });
            })
        } catch (err) {
            console.log(err)
        }

    }

    setDados(dados) {
        try {
            fs.writeFile('./contas.json', JSON.stringify(dados), { enconding: 'utf-8' }, function (err) {
                if (err) throw err;
                console.log('Arquivo salvo!');
            });
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new Dados_Model()
