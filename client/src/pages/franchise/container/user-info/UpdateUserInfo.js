import React, { useState } from 'react'
import { images } from '../../../../assets'

const UpdateUserInfo = ({data}) => {

  const [userId, setUserId] = useState(data.id);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  
  
  


    const updateData = async e => {
    e.preventDefault();
    try {
      const body = { name, email };
      const response = await fetch(
        `/api/franchise/${data.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
        <img src={images.edit} className="edit-btn" data-bs-toggle="modal" data-bs-target={`#id${data.id}`} />

        <div className="modal fade" id={`id${data.id}`} onClick={() => setUserId(data.id)} tabIndex="-1" aria-labelledby="postuler" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier les informations personelles</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setUserId(data.id)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              
                <label>Nom</label>
                <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                
                <label className='mt-3'>Email</label>
                <input
                type="text"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />

            </div>
            <div className="modal-footer">
               
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={e => updateData(e)}>Confirmer</button>    
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Annuler</button>    
                
                
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UpdateUserInfo