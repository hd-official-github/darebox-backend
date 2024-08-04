

export function getReqHeaders(reqhead: any) {
    const role = reqhead.get('user-custom-role');
    const uid = reqhead.get('user-custom-id');
    return { role, uid }

}