import { useEffect, useState } from "react"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../firebase-config"

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([])
  const postsCollectionRef = collection(db, "posts")

  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef)
      setPostList(
        data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }))
      )
    } catch (err) {
      console.log(err)
    }
  }

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
    getPosts()
  }

  useEffect(() => {
    console.log("Effect called")
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=" min-h-screen flex justify-center items-start pt-10">
      <div className="grid grid-cols-1  gap-10 ">
        {postLists.map((post) => (
          <div
            key={post.id}
            className="bg-gradient-to-t from-[#595959] to-[#929292] rounded-3xl md:w-[600px] p-12 m-3 shadow flex flex-col text-[#EAEAEA]"
          >
            <div className="flex justify-between items-center ">
              <div>
                <div className=" flex ">
                  <p className="font-bold text-xl bg-black rounded-full text-center p-3 px-10 shadow-slate-800 shadow-lg">
                    {post.title}
                  </p>
                </div>
                <p className=" pl-4 mr-12 leading-[1] pt-4 text-xl text-[#e3e3e3]">
                  {post.postText}
                </p>
                <p className=" pl-4 leading-[2] text-lg mt-5 font-bold">
                  @{post.author.name}
                </p>
              </div>
              <div>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    className="text-3xl"
                    onClick={() => {
                      deletePost(post.id)
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
