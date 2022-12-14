import React, { useState } from 'react'
import Layout from '../../components/Layout'

import ClientLogin from './ClientLogin'
import FranchiseLogin from './FranchiseLogin'
import StructureLogin from './StructureLogin'

import { images } from '../../assets';


const Login = () => {

    const [role, setRole] = useState("");

  return (
    <Layout>
        <label htmlFor='role' className='form-label mt-3'>Vous êtes:</label>
            <select 
                    onChange={e => setRole(e.target.value)}
                    value={role}
                    name="role"
                    id="role" 
                    className='form-select'
                    required
            >
                <option value="">--Choisissez--</option>
                <option value="proprietaire">Un propriétaire</option>
                <option value="franchise">Une franchise</option>
                <option value="structure">Une structure</option>
            </select>
            <div className='mt-5 mb-5 d-flex justify-content-center'>
              <img src={images.logo} alt="Logo Sportelia" className='' />  
            </div>
            

            {role === "proprietaire" && <><ClientLogin role={role} /></>}
            {role === "franchise" && <><FranchiseLogin role={role}/></>}
            {role=="structure" && <><StructureLogin role={role}/></>}

            
    </Layout>
  )
}

export default Login