import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const onChange = e =>setEmail(e.target.value)
  const onSubmit = async (e) =>{
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email enviado')
    } catch (error) {
      toast.error('No se puedo enviar el email')
    }
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">
          Olvidé mi Contraseña
        </p>
        <main>
          <form onSubmit={onSubmit}>
            <input type="email" className="emailInput" placeholder='email' id='email' value={email} onChange={onChange} />
            <Link className='forgotPasswordLink' to='/sign-in'>
              Iniciar sesión
            </Link>
            <div className="signInBar">
              <div className="sigInText">
                Enviar link de reseteo
              </div>
              <button className="signInButton">
                <ArrowRightIcon fill='#fff' width='34px' height='34px'/>
              </button>
            </div>
          </form>
        </main>
      </header>
    </div>
  )
}

export default ForgotPassword