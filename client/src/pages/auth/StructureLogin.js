import { useState } from 'react'
import Layout from '../../components/Layout'
import { onStructureLogin } from '../../api/auth'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'

import secureLocalStorage from  "react-secure-storage";



const StructureLogin = ({ role }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {

      await onStructureLogin({email, password})

      dispatch(authenticateUser())
      localStorage.setItem('isAuth', 'true')
      secureLocalStorage.setItem('role', role)
      secureLocalStorage.setItem('email', email)


    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  
  return (
    <div>
      <form onSubmit={onSubmit} className='container mt-3'>
        <h1>Connexion</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Adresse mail
          </label>
          <input
            onChange={e => setEmail(e.target.value)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='exemple@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Mot de passe
          </label>
          <input
            onChange={e => setPassword(e.target.value)}
            type='password'
            value={password}
            className='form-control'
            id='password'
            name='password'
            placeholder='Mot de passe'
            required
          />

         
        </div>

        
        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn btn-dark'>
          Soumettre
        </button>  
      </form>
    </div>
  )
}

export default StructureLogin