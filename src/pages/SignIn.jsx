import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, seFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData
  const navigate = useNavigate()
  const onChange = (e)=>{
    seFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  const onSubmit = async e =>{
    e.preventDefault()
    try{
      const auth = getAuth()
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    if(userCredentials.user){
      navigate('/')
    }
    }catch (error){
      console.log(error);
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
          <input type="email" placeholder='Email' id='email' value={email} onChange={onChange} className="emailInput" />
        <div className="passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder='password' id='password' value={password} onChange={onChange}/>
          <img src={visibilityIcon} className="showPassword" alt="showPassword" onClick={()=> setShowPassword((prevState)=> !prevState)} />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>
          Olvidé mi contraseña
        </Link>
        <div className="signInBar">
          <p className="signInText">
            Iniciar Sesión
          </p>
          <button className="signInButton">
            <ArrowRightIcon fill='white' width='34px' height='34px' />
          </button>
        </div>
        </form>
        {/**Google Auth */}
        <Link to='/sign-up' className='registerLink'>
          Registrarse
        </Link>
     
    </div>
    </>
  )
}

export default SignIn