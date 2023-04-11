import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    navigate('/')
  }

  return (
    <div className="bg-zinc-900 h-screen w-screen">
      <h1 className="text-white">Login</h1>
      {/* <p className="text-white">Sign in with Google to continue</p> */}
      <button className="text-white" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login
