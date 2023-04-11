import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface CreateFormData {
  title: string
  description: string
}

const CreateForm = () => {
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

  const onCreatePost = (data: CreateFormData) => {
    console.log(data)
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  )
}

export default CreateForm
