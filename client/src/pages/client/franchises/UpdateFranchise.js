import React, { useState } from 'react'

const UpdateFranchise = ({franchise}) => {

  const [franchiseId, setFranchiseId] = useState(franchise.id);
  const [name, setName] = useState(franchise.name);
  const [email, setEmail] = useState(franchise.email);
  const [profile_pic, setProfilePic] = useState(franchise.profile_pic);
  const [description, setDescription] = useState(franchise.description);
  const [isActive, setIsActive] = useState("");


    const updateData = async e => {
    e.preventDefault();
    try {
      const body = { name, email, profile_pic, description, isActive };
      const response = await fetch(
        `http://localhost:8000/api/client/franchise/${franchise.id}`,
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
      
      <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${franchise.id}`}>
        Modifier
        </button>

        <div className="modal fade" id={`id${franchise.id}`} onClick={() => setFranchiseId(franchise.id)} tabIndex="-1" aria-labelledby="postuler" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier une franchise</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setFranchiseId(franchise.id)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              

                <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                />

                <input
                type="text"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />

                <input
                type="text"
                className="form-control"
                value={profile_pic}
                onChange={e => setProfilePic(e.target.value)}
                />

                
                <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />

                {franchise.isactive && 
                <>
                  <p>Désactiver la franchise ? <input type="checkbox" value={isActive} onChange={e => setIsActive(false)} /> </p>
                </>}

                 {!franchise.isactive && 
                <>
                  <p>Réactiver la franchise ? <input type="checkbox" value={isActive} onChange={e => setIsActive(true)} /> </p>
                </>}

            </div>
            <div className="modal-footer">
               
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => updateData(e)}>Confirmer</button>    
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