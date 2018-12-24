//const monax = require('@monax/burrow');
//import monax from "@monax/burrow";

function fetchFile(file) {
    fetch(file)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.error(error);
        })
}

export function deploy() {
    let burrowURL = "localhost:10997";
    let account = 'D6FD8AFF9253E037312FF92E5CD983B29F7C7C16';
    let options = {objectReturn: true};

    let burrowchain = "abcde";//monax.createInstance(burrowURL, account, options);

    // Get the contractABIJSON from somewhere such as solc
    const abiFile = '/Production.abi';
    const binFile = '/Production.bin';

    let abi = JSON.parse(fetchFile(abiFile));
    console.log(abi);
    let bytecode = fetchFile(binFile, 'utf8');

    burrowchain.contracts.deploy(abi, bytecode, 'contract1').then((ContractObject) => {
        console.log("Contract deploy OK!");
        return ContractObject;
    }).catch((error) => {
        console.log("Contract deploy Failed!");
        throw error;
    });

}

export function setNewValue(contract, id, data_json) {
    contract.Setvalue(id, JSON.stringify(data_json))
        .then(() => {
            console.log("Set Data Ok!");
        })
        .catch((error) => {
            throw error;
        });
}

export function getNewValue(contract, id) {
    let getdata;
    contract.Getvalue(id).then((data) => {
        getdata = data.raw[0];
        console.log("Get Data Ok!");
        return JSON.parse(getdata);
    }).catch((error) => {
        throw error;
    });
}
