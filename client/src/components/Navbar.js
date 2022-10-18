import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unauthenticateUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { onLogout } from '../api/auth'

import secureLocalStorage from  "react-secure-storage";

const Navbar = () => {
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
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        {isAuth ? (
          <div>
            
              <button onClick={() => logout()} className='btn btn-primary'>
              Se déconnecter
              </button>  
            
            
          </div>
        ) : (
          <div>
            

          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar