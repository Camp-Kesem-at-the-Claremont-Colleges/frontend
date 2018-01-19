import axios from 'axios'

let base = 'http://localhost:8000'

if (process.env.NODE_ENV === 'production') {
  base = 'http://api.campkesemclaremont.us'
}

console.log(process.env.NODE_ENV)

const instance = axios.create({
  baseURL: base
})

export default instance
