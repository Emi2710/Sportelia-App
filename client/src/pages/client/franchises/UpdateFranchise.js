import React, { useState } from 'react';
import { onChangeEmail } from '../../../api/auth';
import { images } from '../../../assets';


const UpdateFranchise = ({franchise}) => {

  const [franchiseId, setFranchiseId] = useState(franchise.id);
  
  const [name, setName] = useState(franchise.name);
  const [email, setEmail] = useState(franchise.email);
  const [profile_pic, setProfilePic] = useState(franchise.profile_pic);
  const [description, setDescription] = useState(franchise.description);
  const [isActive, setIsActive] = useState(franchise.isactive);

  


    const updateData = async e => {
    e.preventDefault();
    try {
      const body = { name, email, profile_pic, description, isActive };
      const response = await fetch(
        `/api/client/franchise/${franchise.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        await onChangeEmail(body)
  
        window.location = "/";
        
    } catch (err) {
      console.error(err.message);
    }
  };



  return (
    <div>
      
      <div>
        <div className="edit-franchise-btn" data-bs-toggle="modal" data-bs-target={`#id${franchise.id}`}>
        <img src={images.edit} alt="Icone de modification" />
        </div>

        <div className="modal fade" id={`id${franchise.id}`} onClick={() => setFranchiseId(franchise.id)} tabIndex="-1" aria-labelledby="postuler" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier une franchise</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setFranchiseId(franchise.id)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <label htmlFor='email' className='form-label'>
                Nom
                </label>
                <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                
                <label htmlFor='email' className='form-label mt-3'>
                  Email
                </label>
                <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor='email' className='form-label mt-3'>
                  Photo de profil
                </label>
                <input
                type="text"
                className="form-control"
                value={profile_pic}
                onChange={e => setProfilePic(e.target.value)}
                />

                <label htmlFor='email' className='form-label mt-3'>
                  Desccription
                </label>
                <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />

                {franchise.isactive && 
                <>
                  <p className='mt-3'>Désactiver la franchise ? <input type="checkbox" onChange={e => setIsActive(false)} /> </p>
                </>}

                 {!franchise.isactive && 
                <>
                  <p className='mt-3'>Activer la franchise ? <input type="checkbox" onChange={e => setIsActive(true)} /> </p>
                </>}

            </div>
            <div className="modal-footer">
               
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={e => updateData(e)}>Confirmer</button>    
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Annuler</button>    
                
                
            </div>
            </div>
        </div>
        </div>
    </div>

    

    </div>
  )
}

export default UpdateFranchise;