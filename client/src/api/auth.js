import axios from 'axios'
axios.defaults.withCredentials = true


export async function onClientLogin(loginData) {
  return await axios.post('http://localhost:8000/api/client/login', loginData)
}

export async function onFranchiseLogin(loginData) {
  return await axios.post('http://localhost:8000/api/franchise/login', loginData)
}

export async function onStructureLogin(loginData) {
  return await axios.post('http://localhost:8000/api/structure/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:8000/api/logout')
}

