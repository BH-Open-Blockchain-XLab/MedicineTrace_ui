export function PutInId(id) {
    return {
        type: "PUTINID",
        productId: id
    };
}

export function PutInData(data) {
    return {
        type: "PUTINDATA",
        productData: data
    };
}

export function UpdateHistory(id) {
    return {
        type: 'UPDATEHISTORY',
        searchId: id
    };
}

export function ClearHistory() {
    return {
        type: 'CLEARHISTORY'
    };
}

export function SetFactoryInfo(info) {
    return {
        type: 'SETFACTORYINFO',
        factoryinfo: info
    };
}
