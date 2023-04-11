import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

interface CreateFormData {
  title: string
  description: string
}

const CreateForm = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    title: yup.string().required('You must add a title.'),
    description: yup.string().required('You must add a description.'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  })

  const postsRef = collection(db, 'posts')

  const onCreatePost = async (data: CreateFormData) => {
    console.log(data)
    await addDoc(postsRef, {
      // title: data.title,
      // description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    })
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input
          placeholder="Title..."
          {...register('title')}
          className="text-grey font-bold py-2 px-2 rounded"
        />
        <p className="text-red-500">{errors.title?.message}</p>
        <input
          placeholder="Description..."
          {...register('description')}
          className="text-grey font-bold py-2 px-2 rounded"
        />
        <p className="text-red-500">{errors.description?.message}</p>
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
    </div>
  )
}

export default CreateForm
