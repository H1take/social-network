
export const updateNewObjInArray = (items, itemId, newObjProps, objPropName) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}