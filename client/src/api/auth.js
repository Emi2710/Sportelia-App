import axios from 'axios'
axios.defaults.withCredentials = true

//LOGIN
export async function onClientLogin(loginData) {
  return await axios.post('/api/client/login', loginData)
}

export async function onFranchiseLogin(loginData) {
  return await axios.post('/api/franchise/login', loginData)
}

export async function onStructureLogin(loginData) {
  return await axios.post('/api/structure/login', loginData)
}

export async function onLogout() {
  return await axios.get('/api/logout')
}


//REGISTRATION

export async function onFranchiseRegistration(registrationData) {
  return await axios.post(
    '/api/client/addFranchise',
    registrationData
  )
}

//EMAIL
export async function onAddEmail(emailData) {
  return await axios.post(
    '/api/sendEmail', emailData
  )
}

export async function onChangeEmail(onChangeEmail) {
  return await axios.post(
    '/api/sendEmail/update', onChangeEmail
  )
}



