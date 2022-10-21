import React, { useState } from 'react'
import { images } from '../../../assets';


const UpdateFranchise = ({franchise}) => {

  const [franchiseId, setFranchiseId] = useState(franchise.id);
  const [name, setName] = useState(franchise.name);
  const [email, setEmail] = useState(franchise.email);
  const [address, setAddress] = useState(franchise.address);
  const [phone, setPhone] = useState(franchise.phone);
  const [profile_pic, setProfilePic] = useState(franchise.profile_pic);
  const [description, setDescription] = useState(franchise.description);
  const [isActive, setIsActive] = useState(franchise.isactive);
  const [boissons, setBoissons] = useState(franchise.boissons);
  const [mailing, setMailing] = useState(franchise.mailing);
  const [premium, setPremium] = useState(franchise.premium);


    const updateData = async e => {
    e.preventDefault();
    try {
      const body = { name, email, address, phone, profile_pic, description, isActive, boissons, mailing, premium };
      const templateParams = { email: email}
      const response = await fetch(
        `http://localhost:8000/api/franchise/structure/${franchise.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      emailjs.send('service_wn34fcm', 'template_gq0wavz', templateParams, 'xr2eEICvP8Ow1wZ4X')
              .then(response => {
                console.log('SUCCESS!', response); 
              }, error => {
                console.log('FAILED...', error);
              })

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
                  Adresse postale
                </label>
                <input
                type="text"
                className="form-control"
                value={address}
                onChange={e => setAddress(e.target.value)}
                />

                 <label htmlFor='email' className='form-label mt-3'>
                  Numéro de téléphone
                </label>
                <input
                type="text"
                className="form-control"
                value={phone}
                onChange={e => setPhone(e.target.value)}
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

                <h5 className='mt-5'>Les permissions</h5>
                {franchise.boissons && 
                <>
                  <p className='mt-3'>Désactiver la permission de vendre des boissons ? <input type="checkbox" onChange={e => setBoissons(false)} /> </p>
                </>}

                 {!franchise.boissons && 
                <>
                  <p className='mt-3'>Activer la permission de vendre des boissons ? <input type="checkbox" onChange={e => setBoissons(true)} /> </p>
                </>}



                {franchise.mailing && 
                <>
                  <p className='mt-3'>Désactiver la permission d'envoyer des mails' ? <input type="checkbox" onChange={e => setMailing(false)} /> </p>
                </>}

                 {!franchise.mailing && 
                <>
                  <p className='mt-3'>Activer la permission d'envoyer des mails ? <input type="checkbox" onChange={e => setMailing(true)} /> </p>
                </>}



                {franchise.premium && 
                <>
                  <p className='mt-3'>Désactiver la permission d'accéder à la salle premium ? <input type="checkbox" onChange={e => setPremium(false)} /> </p>
                </>}

                 {!franchise.premium && 
                <>
                  <p className='mt-3'>Activer la permission d'accéder à la salle premium ? <input type="checkbox" onChange={e => setPremium(true)} /> </p>
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