import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import CreatePost from "./Pages/CreatePost"
import { useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import { auth, provider } from "./firebase-config"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  useEffect(() => {
    provider.setCustomParameters({
      prompt: "select_account",
    })
  }, [])
  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)

      window.location.pathname = "/login"
    })
  }

  return (
    <div className="bg-[#111827]  text-white flex justify-center min-h-screen pb-10">
      <div className="">
        <Router>
          <nav className="  text-[#EAEAEA] flex  flex-col   py-5">
            <div className="flex gap-10 text-xl py-5 justify-center">
              <Link className="hover:text-gray-400" to="/">
                Home
              </Link>

              {!isAuth ? (
                <Link className="hover:text-gray-400" to="/login">
                  Login
                </Link>
              ) : (
                <>
                  <Link className="hover:text-gray-400" to="/createpost">
                    Create Post
                  </Link>
                  <button className="hover:text-gray-400" onClick={signOutUser}>
                    Log Out
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center items-center font-extrabold text-3xl py-4 gap-2">
              <img src="Reactjs.svg" alt="react" className="h-20 w-20" />
              <p>+</p>
              <img src="Tailwind.svg" alt="tailwind" className="h-20 w-20" />
              <p>+</p>

              <img
                src="Firebase_Logo_Logomark.svg"
                alt="firebase"
                className="h-20 w-20"
              />
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home isAuth={isAuth} />} />

            <Route
              path="/createpost"
              element={<CreatePost isAuth={isAuth} />}
            />

            <Route path="login" element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
