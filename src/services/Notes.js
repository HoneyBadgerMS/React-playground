import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    return axios
        .get(baseUrl, {crossdomain: true})
        .then(response => response.data)
}

const create = newObject => {
    return axios
        .post(baseUrl, newObject, {crossdomain: true})
        .then(response => response.data)
}

const update = (id, newObject) => {
    return axios
        .put(`${baseUrl}/${id}`, newObject, {crossdomain: true})
        .then(response => response.data)
}

const Notes = {
    getAll,
    create,
    update
}

export default Notes;