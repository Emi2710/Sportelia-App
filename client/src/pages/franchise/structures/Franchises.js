import React, { useState, useEffect } from 'react'
import AddStructure from './AddStructure';
import UpdateStructure from './UpdateStructure';

import { images } from '../../../assets';

const Franchises = ({data}) => {
    

    const [franchises, setFranchises] = useState([]);
    const [searchStructure, setSearchStructure] = useState("")

    
    const getFranchises = async () => {
        try {
            const response = await fetch(`/api/franchise/structure/${data.id}`)
            const jsonData = await response.json()

            setFranchises(jsonData)

           
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
                <div className='d-flex'>
                    <img src={images.loop} alt="Icone de recherche" className='loop-img' /> 
                    <input className='loop-input' onChange={e => setSearchStructure(e.target.value)}></input>
                </div>
                <AddStructure data={data}/>
            </div>    
        </div>
        
        
        <div className="franchises-table">
            <div className='franchise-table-heading'>
                <div>
                    <p className=''>Nom</p>   
                </div>
                 <div>
                        <p className='dropbtn d-flex mt-2'>Statut <img src={images.statut} alt="Flèche vers le bas" /></p>

                        

                    </div>
                    
                    
                   
                
                
            </div>
            <div className='franchise-table-container'>
                {franchises.filter((data) => {
                    if(searchStructure == "") {
                        return data
                    } else if(data.name.toLowerCase().includes(searchStructure.toLocaleLowerCase())) {
                        return data
                    } 
                }).map(franchise => (
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
                    <UpdateStructure franchise={franchise} />
                    
                </div>
            ))} 
            </div>
        </div>
        
        
    </div>
  )
}

export default Franchises