const monax = require('@monax/burrow');
const fs = require('fs');

function slurp(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
}

class Burrow {
    constructor() {
        let burrowURL = "localhost:10997";
        let account = 'D6FD8AFF9253E037312FF92E5CD983B29F7C7C16';
        let options = {objectReturn: true};

        this.burrowchain = monax.createInstance(burrowURL, account, options);
    }

    deploy() {
        // Get the contractABIJSON from somewhere such as solc
        const abiFile = 'src/burrow/Production.abi';
        const binFile = 'src/burrow/Production.bin';

        let abi = slurp(abiFile);
        let bytecode = fs.readFileSync(binFile, 'utf8');

        this.burrowchain.contracts.deploy(abi, bytecode, 'contract1').then((ContractObject) => {
            this.contract = ContractObject;
            console.log("Contract deploy OK!");
        }).catch((error) => {
            console.log("Contract deploy Failed!");
            throw error;
        });

    }

    setNewValue(id, data_json) {
        this.contract.Setvalue(id, JSON.stringify(data_json))
            .then(() => {
                console.log("Set Data Ok!");
            })
            .catch((error) => {
                throw error;
            });
    }

    getNewValue(id) {
        let getdata;
        this.contract.Getvalue(id).then((data) => {
            getdata = data.raw[0];
            console.log("Get Data Ok!");
            return JSON.parse(getdata);
        }).catch((error) => {
            throw error;
        });
    }
}

module.exports = {burrow: Burrow};