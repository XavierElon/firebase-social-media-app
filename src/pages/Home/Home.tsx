import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { Post } from './Post'

interface Post {
  id: string
  userId: string
  userName: string
  title: string
  description: string
}

const Home = () => {
  const [postsList, setPostsList] = useState<Post[] | null>([])
  const postsRef = collection(db, 'posts')

  const getPosts = async () => {
    const data = await getDocs(postsRef)
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    )
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className="bg-zinc-900 h-screen w-screen block">
      <h1 className="text-white">Home</h1>
      {postsList?.map((post) => (
        <Post />
      ))}
    </div>
  )
}

export default Home
