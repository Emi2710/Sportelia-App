import React, { useState } from 'react'
import { onFranchiseRegistration } from '../../../api/auth'

const AddFranchise = () => {
    const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: '',
    description: '',
  })

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onFranchiseRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ 
            name: '',
            email: '',
            password: '',
            profile_pic: '',
            description: '', })

      
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }


  return (
    <div>
      
      <div>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addFranchise">
        Ajouter une franchise
        </button>

        <div className="modal fade" id="addFranchise" tabIndex="-1" aria-labelledby="postuler" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier une franchise</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                 <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Nom
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={values.name}
            placeholder='Nom de la franchise'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Adresse mail
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='Adresse mail'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Mot de passe
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='Mot de passe'
            required
          />

          <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Photo de profil
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='profilePic'
            name='profile_pic'
            value={values.profile_pic}
            placeholder='Photo de profil'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Description
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='description'
            name='description'
            value={values.description}
            placeholder='Description'
            required
          />
        </div>


         
            

        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <div className="modal-footer">
               
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Confirmer</button>    
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Annuler</button>    
                
                
        </div>
      </form>
              
            </div>

            </div>
        </div>
        </div>
    </div>

    

    </div>
  )
}

export default AddFranchise