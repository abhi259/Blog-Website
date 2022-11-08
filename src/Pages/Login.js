import React from "react"
import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"

function Login({ setIsAuth }) {
  let navigate = useNavigate()

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true)
      setIsAuth(true)
      navigate("/")
    })
  }

  return (
    <div className=" flex justify-center items-center flex-col py-28 m-5">
      <div className="bg-gradient-to-t from-[#595959] to-[#929292] rounded-3xl p-10  py-10 md:p-32  shadow-slate-800 shadow-lg">
        <p className="flex items-center gap-4 bg-black  rounded-full p-5 py-3  shadow-slate-800 shadow-lg">
          <FcGoogle className="h-10 w-10" />
          Sign In With Google
        </p>
        <div className="flex justify-center mt-5">
          <button
            onClick={signInWithGoogle}
            className="  bg-black font-bold py-3 px-8 hover:bg-gray-900 shadow-slate-800 shadow-lg border-none rounded-full text-gray-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
