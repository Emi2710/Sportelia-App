import React, { useState, useEffect } from 'react'
import AddFranchise from './AddFranchise';
import UpdateFranchise from './UpdateFranchise';

const Franchises = () => {

    const [franchises, setFranchises] = useState([]);
    
    const getFranchises = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/franchises")
            const jsonData = await response.json()

            setFranchises(jsonData)
            console.log(jsonData)

           
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getFranchises();
    }, []);

    


  return (
    <div>
        <h2>Franchises</h2>
        <AddFranchise />
        {franchises.map(franchise => (
                <div key={franchise.id} className='m-3 bg-light text-dark p-3'>
                    <p>Nom : {franchise.name}</p>
                    <p>Email : {franchise.email}</p>

                    <p> 
                        {franchise.isactive && <> Statut: Actif</>}
                        {!franchise.isactive && <> Statut: Désactivé </>}
                    </p>
                    <UpdateFranchise franchise={franchise} />
                    
                </div>
            ))}  
    </div>
  )
}

export default Franchises