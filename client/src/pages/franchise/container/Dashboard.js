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
            const response = await fetch(`http://localhost:8000/api/franchise/${secureLocalStorage.getItem('email')}`)
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
             <Franchises data={data} /> 
            </div>  
          ))}
          
        
    </div>
  )
}

export default Dashboard