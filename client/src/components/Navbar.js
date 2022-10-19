import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unauthenticateUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { onLogout } from '../api/auth'

import secureLocalStorage from  "react-secure-storage";

import { Link } from 'react-router-dom'
import { images } from '../assets'
import { useState } from 'react'

import './Navbar.css'

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
   
  const { isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      secureLocalStorage.removeItem("role")
      secureLocalStorage.removeItem("email")

    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='sidebar'>
      <Link to="#" className={sidebar ? 'arrow active' : 'arrow'}>
          <img src={images.arrow} alt="Flèche de naviguation" onClick={showSidebar} />
      </Link>  
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        
        <ul className='nav-menu-items'>
          <li>
            <img src={images.dashboard} alt="Icone de menu" />
            <p>Dashboard</p>
          </li>
          <li>
            <img src={images.franchise} alt="Icone de menu" />
            <p>Franchises</p>
          </li>

          {secureLocalStorage.getItem('role') ==='franchise' && <>
          <li>
            <img src={images.franchise} alt="Icone de menu" />
            <p>Structures</p>
          </li>
          </>}

          {isAuth ? (
            <li className='logout-btn'>
                <button onClick={() => logout()}>
                  <img src={images.logout} alt="Icone de déconnexion" />
                Se déconnecter
                </button>  
            </li>
          ) : (
            <div>
            </div>
          )}

        </ul>
        
      </nav>
      
    </div>
  )
}

export default Navbar