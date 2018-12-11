export function PutInId(id) {
    return {
        type: "PUTINID",
        productId: id
    };
}

export function ClearId() {
    return {
        type: 'CLEARID'
    };
}