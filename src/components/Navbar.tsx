import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'

const Navbar = () => {
  return (
    <div className=" bg-zinc-900 flex-co w-screen">
      <div className="absolute left-5 space-x-10">
        <Link to="/" className="text-sky-400">
          Home
        </Link>
        <Link to="/login" className="text-sky-400">
          Login
        </Link>
      </div>

      <div className="absolute right-5">
        <p className="text-white">{auth.currentUser?.displayName}</p>
        <img
          src={auth.currentUser?.photoURL || ''}
          width="50"
          height="50"
        ></img>
      </div>
    </div>
  )
}

export default Navbar
