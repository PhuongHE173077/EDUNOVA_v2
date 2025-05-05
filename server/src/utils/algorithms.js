//

export const deleteFields = (object, fields) => {
    fields.forEach(field => {
        delete object[field]
    })
    return object
}