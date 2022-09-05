import React, { useState} from 'react'
import { getAuth , updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

const Profile = () => {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name, email} = formData
  const navigate = useNavigate()
  const onLogOut = e =>{
    auth.signOut()
    navigate('/sign-in')
  }
  const onSubmit = async ()=>{
    try{
      if(auth.currentUser.displayName !== name){
        //update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name
        })
      }
      //update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
    } catch (error){
      toast.error('Error en la actualización de datos')
    }
  }
 const onChange = e =>{
  setFormData((prevState) =>({
    ...prevState,
    [e.target.id]: e.target.value
  }))
 }
  return (
    <div className="profile">
      <header className='profileHeader'>
        <p className="pageHeader">Mi perfil</p>
        <button className="logOut" type='button' onClick={onLogOut}>Cerrar Sesión</button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">
            Perfil:
          </p>
          <p className="changePersonalDetails" onClick={()=>{
            changeDetails && onSubmit()
            setChangeDetails((prevState)=> !prevState)
          }}>
            {changeDetails? 'Listo' : 'Cambiar'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input type="text" className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} id="name" />
            <input type="text" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email} onChange={onChange} id="email" />

          </form>
        </div>
        <Link to="/create-listing" className='createListing'>
          <img src={homeIcon} alt="home" />
          <p>Vender o Rentar tu casa</p>
          <img src={arrowRight} alt="arrow Right" />
        </Link>
      </main>
    </div>
  )
}

export default Profile