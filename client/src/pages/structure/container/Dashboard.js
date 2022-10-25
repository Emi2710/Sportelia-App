import React, {useState, useEffect} from 'react'
import './Dashboard.css';
import { images } from '../../../assets';

import secureLocalStorage from 'react-secure-storage'

const Dashboard = () => {

  const [personalInfo, setPersonalInfo] = useState([]);
    
    const getData = async () => {
        try {
            const response = await fetch(`/api/structure/${secureLocalStorage.getItem('email')}`)
            const jsonData = await response.json()

            setPersonalInfo(jsonData)
            console.log(jsonData)
           
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

  return (
    <div className='dashboard-client-container'>
        <div className='client_dashboard_greeting'>
            <h1>Bienvenue sur votre espace <img src={images.hand} alt="Main qui salut" /></h1>
        </div>
        <div className='client-user-info'>
          <div className=''>
            {personalInfo.map(data => (
              <div key={data.id} className='edit-client-info '>
                <div className='d-flex flex-column'>
                  <p className='mb-0'>{data.name}</p>
                  <p className='opacity-75'>{data.email}</p>  
                </div>
                
              </div>
              
            ))}
             
          </div>
          
          
        </div>
        
          {personalInfo.map(data => (
            <div className='franchise-container' key={data.id}>
              <h2 className='mt-5'>Vos informations</h2>
              <ul className='mt-3'>
                <li>Nom: <span className='opacity-75'>{data.name}</span></li>
                <li>Email: <span className='opacity-75'>{data.email}</span></li>
                <li>Adresse: <span className='opacity-75'>{data.address}</span></li>
                <li>Numéro de téléphone: <span className='opacity-75'>{data.phone}</span></li>
                <li>Description: <span className='opacity-75'>{data.description}</span></li>
              </ul>

              <h2 className='mt-5'>Vos permissions</h2>
              <ul className='mt-3'>
                {data.boissons && <li>Vendre des boissons</li>}
                {data.mailing && <li>Envoyer des e-mails</li>}
                {data.premium && <li>Accéder à la salle premium</li>}
              </ul>
            </div>  
          ))}
          
        
    </div>
  )
}

export default Dashboard