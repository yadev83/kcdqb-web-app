import axios from "axios"

const Request = {
    post: (url, data, opts = {}) => axios({method: 'post', url, data, opts}),
    get: (url, data) => axios({method: 'get', url, data})
}

export default Request