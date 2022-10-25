import React, { useState } from 'react'
import { images } from '../../../assets'
//import { onStructureRegistration } from '../../../api/auth'
import axios from 'axios'
import emailjs from '@emailjs/browser'



const AddFranchise = ({data}) => {
    const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    profile_pic: '',
    description: '',
  })

  const [emailValues, setEmailValues] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  
  


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onStructureRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ 
            name: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            profile_pic: '',
            description: '', })
      
       /*emailjs.send('service_z3o02ig', 'template_venjww4', emailValues, 'xr2eEICvP8Ow1wZ4X')
      .then(response => {
        console.log('SUCCESS!', response);
        setEmailValues({
          email: values.email,
          password: values.password
        })
        
      }, error => {
        console.log('FAILED...', error);
      });*/

      window.location = "/";

      
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }
  axios.defaults.withCredentials = true



  return (
    <div>
      
      <div>
        <button type="button" className="add-franchise-btn" data-bs-toggle="modal" data-bs-target="#addFranchise">
         <img src={images.plus} alt="Ajouter une franchise" />Ajouter
        </button>

        <div className="modal fade" id="addFranchise" tabIndex="-1" aria-labelledby="postuler" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ajouter une franchise</h5>
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
            placeholder='Nom de la structure'
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
            Adresse
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='address'
            name='address'
            value={values.address}
            placeholder='Adresse de la structure'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Numéro de téléphone
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='phone'
            name='phone'
            value={values.phone}
            placeholder='Numéro de téléphone de la franchise'
            required
          />
        </div>

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
            placeholder="Lien de l'image"
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
               
            <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">Confirmer</button>    
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
  
  async function onStructureRegistration(registrationData) {
  return await axios.post(
    `http://localhost:8000/api/franchise/${data.id}/addStructure`,
    registrationData
  )
}
}

export default AddFranchise

