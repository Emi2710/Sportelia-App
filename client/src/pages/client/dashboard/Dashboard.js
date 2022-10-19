import React from 'react'
import './Dashboard.css';
import { images } from '../../../assets';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='dashboard-client-container'>
        <div className='client_dashboard_greeting'>
            <h1>Bienvenue sur votre espace <img src={images.hand} alt="Main qui salut" /></h1>
        </div>
        <div className='client_dashboard_franchises'>
            <h2>Toutes les franchises de Sportelia</h2>
            <Link to='/client/franchises'><button className='dashboard-btn'>Voir</button></Link> 
        </div>
    </div>
  )
}

export default Dashboard