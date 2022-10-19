import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div>
      <div className='container'>{children}</div>
    </div>
  )
}

export default Layout