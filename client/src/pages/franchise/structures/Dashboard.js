import React, {useState, useEffect} from 'react'
import './Dashboard.css';
import { images } from '../../../assets';
import { Link } from 'react-router-dom';

import secureLocalStorage from 'react-secure-storage'
<<<<<<< HEAD:client/src/pages/franchise/container/Dashboard.js
import UpdateUserInfo from './user-info/UpdateUserInfo';
import Structures from './crud/Structures';
=======
import UpdateUserInfo from './UpdateUserInfo';
import Franchises from './Franchises';
>>>>>>> parent of 96e9d5b (reorganized & cleaned some code):client/src/pages/franchise/structures/Dashboard.js

const Dashboard = () => {

  const [personalInfo, setPersonalInfo] = useState([]);
    
    const getData = async () => {
        try {
            const response = await fetch(`/api/franchise/${secureLocalStorage.getItem('email')}`)
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
          <div className=''>
            {personalInfo.map(data => (
              <div key={data.id} className='edit-client-info '>
                <div className='d-flex flex-column'>
                  <p className='mb-0'>{data.name}</p>
                  <p className='opacity-75'>{data.email}</p>  
                </div>
                
                <UpdateUserInfo data={data} /> 
              </div>
              
            ))}
             
          </div>
          
          
        </div>
        
          {personalInfo.map(data => (
            <div className='franchise-container' key={data.id}>
             <Structures data={data} /> 
            </div>  
          ))}
          
        
    </div>
  )
}

export default Dashboard