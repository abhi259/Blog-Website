import { useState, useEffect } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from "../firebase-config"
import { useNavigate } from "react-router-dom"

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("")
  const [postText, setPostText] = useState("")

  let navigate = useNavigate()

  const postsCollectionRef = collection(db, "posts")
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    })
    navigate("/")
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=" flex justify-center items-center py-20 ">
      <div className="gap-8 flex flex-col bg-gradient-to-t from-[#595959] to-[#929292] rounded-3xl p-5 m-1 ">
        <h1 className="font-bold text-2xl bg-black rounded-full text-center p-3 px-10 shadow-slate-800 shadow-lg">
          Create A Post
        </h1>
        <div className="flex justify-between items-center gap-4">
          <label className="text-xl">Title:</label>
          <input
            className="text-black p-4 w-56 rounded-xl"
            onChange={(event) => {
              setTitle(event.target.value)
            }}
            placeholder="Enter Title"
          ></input>
        </div>
        <div className="flex justify-between items-center gap-4">
          <label className="text-xl">Post:</label>
          <textarea
            onChange={(event) => {
              setPostText(event.target.value)
            }}
            className="text-black w-56 p-4 rounded-xl"
            placeholder="Enter Content"
          />
        </div>
        <div className="text-center">
          <button
            onClick={createPost}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
