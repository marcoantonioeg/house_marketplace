import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, seFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const {email, password, name} = formData
  const navigate = useNavigate()
  const onChange = (e)=>{
    seFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const formDataCopy = {
        ...formData
      }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
    }catch (error){
      toast.error('Algo estuvo mal al registrar')
    }
  }
  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Bienvenido
        </p>
      </header>

        <form onSubmit={onSubmit}>
        <input type="text" placeholder='Name' id='name' value={name} onChange={onChange} className="nameInput" />


          <input type="email" placeholder='Email' id='email' value={email} onChange={onChange} className="emailInput" />
        <div className="passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder='password' id='password' value={password} onChange={onChange}/>
          <img src={visibilityIcon} className="showPassword" alt="showPassword" onClick={()=> setShowPassword((prevState)=> !prevState)} />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>
          Olvidé mi contraseña
        </Link>
        <div className="signUpBar">
          <p className="signUpText">
            Registrarse
          </p>
          <button className="signInButton">
            <ArrowRightIcon fill='white' width='34px' height='34px' />
          </button>
        </div>
        </form>
        <OAuth/>
        <Link to='/sign-in' className='registerLink'>
          Iniciar sesión
        </Link>
     
    </div>
    </>
  )
}

export default SignUp