import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { Post as IPost } from './Home'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'

interface Props {
  post: IPost
}

interface Like {
  userId: string
}

export const Post = (props: Props) => {
  const { post } = props
  const [user] = useAuthState(auth)

  const [likes, setLikes] = useState<Like[] | null>(null)

  const likesRef = collection(db, 'likes')

  const likesDoc = query(likesRef, where('postId', '==', post.id))

  const addLike = async () => {
    try {
      await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      })

      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where('postId', '==', post.id),
        where('userId', '==', user?.uid)
      )
      const likeToDeleteData = await getDocs(likeToDeleteQuery)
      const likeToDelete = doc(db, 'likes', likeToDeleteData.docs[0].id)
      await deleteDoc(likeToDelete)
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getLikes = async () => {
    const data = await getDocs(likesDoc)
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })))
  }

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

  useEffect(() => {
    getLikes()
  }, [])

  return (
    <div>
      <div className="text-white">
        <h1 className="text-white text-xl">Title: {post.title}</h1>
      </div>
      <div className="text-white">
        <p className="text-white">{post.description}</p>
      </div>
      <div className="text-white">
        <p className="text-white">{post.username}</p>
        <button onClick={hasUserLiked ? addLike : removeLike}>
          {' '}
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}{' '}
        </button>
        {likes && <p className="text-white">Likes : {likes.length}</p>}
      </div>
    </div>
  )
}
