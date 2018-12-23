export function PutInId(id) {
    return {
        type: "PUTINID",
        productId: id
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

export function InitBurrow(burrow) {
    return {
        type: 'INITBURROW',
        burrow: burrow
    };
}