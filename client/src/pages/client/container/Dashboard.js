import React, {useState, useEffect} from 'react'
import './Dashboard.css';
import { images } from '../../../assets';

import secureLocalStorage from 'react-secure-storage'
import UpdateUserInfo from './user-info/UpdateUserInfo';
import Franchises from './crud/Franchises';

const Dashboard = () => {

  const [personalInfo, setPersonalInfo] = useState([]);
    
    const getData = async () => {
        try {
            const response = await fetch(`/api/client/${secureLocalStorage.getItem('email')}`)
            const jsonData = await response.json()

            setPersonalInfo(jsonData)
           
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
          <img src={images.profilepic} alt="Photo de profil" />
          <div className=''>
            {personalInfo.map(data => (
              <div key={data.id} className='edit-client-info'>
                <p>{data.name}</p>
                <UpdateUserInfo data={data} /> 
              </div>
              
            ))}
             
          </div>
          
          
        </div>
        <div className='franchise-container'>
          <Franchises />
        </div>
    </div>
  )
}

export default Dashboard