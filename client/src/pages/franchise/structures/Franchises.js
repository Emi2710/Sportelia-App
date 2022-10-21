import React, { useState, useEffect } from 'react'
import AddFranchise from './AddFranchise';
import UpdateFranchise from './UpdateFranchise';

import { images } from '../../../assets';

const Franchises = ({data}) => {
    
    const [filterGallery, setFilterGallery] = useState([]);

    const [franchises, setFranchises] = useState([]);

    const [actif, setActif] = useState(false)
    const showDropdown = () => setActif(!actif)
    
    const getFranchises = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/franchise/structure/${data.id}`)
            const jsonData = await response.json()

            setFranchises(jsonData)
            setFilterGallery(jsonData)

           
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getFranchises();
    }, []);


    


  return (
    <div>
        <div className='franchise-table-header mt-5 d-flex justify-content-between align-items-center'>
            <h2 className=''>Toutes vos structures</h2>
            <div className='d-flex align-items-center'>
                <img src={images.loop} alt="Icone de recherche" className='loop-img' />
                <AddFranchise data={data}/>
            </div>    
        </div>
        
        
        <div className="franchises-table">
            <div className='franchise-table-heading'>
                <div>
                    <p className=''>Nom</p>   
                </div>
                 <div>
                        <p className='dropbtn d-flex mt-2' onClick={showDropdown}>Statut <img src={images.statut} alt="Flèche vers le bas" /></p>

                        <ul className={actif ? 'dropdown-content dropdown-active' : 'dropdown-content'}>
                            <li><button className='btn-actif'>Actif</button></li>
                            <li><button className='btn-desactive'>Désactivé</button></li>
                        </ul> 

                    </div>
                    
                    
                   
                
                
            </div>
            <div className='franchise-table-container'>
                {franchises.map(franchise => (
                <div key={franchise.id} className='franchise d-flex justify-content-around align-items-center'>
                    <div className='w-25 franchise-info'>
                        <p className='franchise-name'>{franchise.name}</p>
                        <p className='franchise-mail'>{franchise.email}</p>
                    </div>
                    <div className='w-25'>
                        <p> 
                        {franchise.isactive && <><button className='btn-actif'>Actif</button></>}
                        {!franchise.isactive && <><button className='btn-desactive'>Désactivé</button> </>}
                    </p>
                    {console.log(franchise)}
                    </div>
                    <UpdateFranchise franchise={franchise} />
                    
                </div>
            ))} 
            </div>
        </div>
        
        
    </div>
  )
}

export default Franchises