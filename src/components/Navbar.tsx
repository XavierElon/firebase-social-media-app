import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const [user] = useAuthState(auth)

  const signUserOut = async () => {
    await signOut(auth)
  }

  return (
    <div className=" bg-zinc-900 flex-co w-screen">
      <div className="absolute left-5 space-x-10">
        <Link to="/" className="text-sky-400">
          Home
        </Link>
        {!user ? (
          <Link to="/login" className="text-sky-400">
            Login
          </Link>
        ) : (
          <Link to="/createpost" className="text-sky-400">
            Create Post
          </Link>
        )}
      </div>
      {user && (
        <div className="absolute right-5">
          <p className="text-white">{user?.displayName}</p>
          <img src={user?.photoURL || ''} width="50" height="50"></img>
          <button onClick={signUserOut} className="text-white">
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
