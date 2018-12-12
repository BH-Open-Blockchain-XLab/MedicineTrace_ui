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