import React, {useState, useEffect, useRef} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {db} from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'
const CreateListing = () => {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })
    const {type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude} = formData
    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)
    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setFormData({...formData, userRef: user.uid})
                }else{
                    navigate('/sign-in')
                }
            })
        }
        return ()=>{
            isMounted.current = false
        }
    }, [isMounted])
    const onSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        if(discountedPrice >= regularPrice){
            setLoading(false)
            toast.error('El descuento no puede ser mayor al regular')
            return
        }
        if(images.length > 6){
            setLoading(false)
            toast.error('Max 6 imágenes')
            return
        }
        let geolocation = {}
        let location 
        if(geolocationEnabled){
            geolocation.lat = 41.20559
            geolocation.lng = -73.15053
            location = address
        }else{
            geolocation.lat = latitude
            geolocation.lng = longitude
            location = address
        }
        //Store imahrees in firebase
        const storeImage = async (image)=>{
            return new Promise((resolve, reject)=>{
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, 'images/' + fileName)
                //upload task
                const uploadTask = uploadBytesResumable(storageRef, image)
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                      const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      console.log('Upload is ' + progress + '% done')
                      switch (snapshot.state) {
                        case 'paused':
                          console.log('Upload is paused')
                          break
                        case 'running':
                          console.log('Upload is running')
                          break
                        default:
                          break
                      }
                    },
                    (error) => {
                      reject(error)
                    },
                    () => {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                      })
                    }
                  )
                })
           
        }
        const imgUrls = await Promise.all(
            [...images].map((image)=> storeImage(image))
        ).catch(()=>{
            setLoading(false)
            toast.error('Error en la subida')
            return
        })
        setLoading(false)
        //console.log(formData);

    }
    const onMutate =e =>{
        let boolean = null
        if(e.target.value === 'true'){
            boolean = true
        }
        if(e.target.value === 'false'){
            boolean = false
        }
        ///files
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images: e.target.files
            }))
        }
        //text/booleans/numbers
        if(!e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }
    if (loading){
        return <Spinner/>
    }
  return (
    <div className='profile'>
       <header>
           <p className="pageHeader">
               Subir una propiedad
           </p>
       </header>
       <main>
           <form onSubmit={onSubmit}>
               <label  className='formLabel'>Vender/Rentar</label>
               <div className="formButtons">
                   <button id='type' value='sell' onClick={onMutate} className={type === 'sell' ? 'formButtonActive' : 'formButton'} type='button'>
                       Vender
                   </button>
                   <button id='type' value='rent' onClick={onMutate} className={type === 'rent' ? 'formButtonActive' : 'formButton'} type='button'>
                       Rentar
                   </button>
               </div>
               <label  className='formLabel'>Nombre</label>
               <input type="text" className='formInputName' id='name' value={name} onChange={onMutate} maxLength='32' minLength='10' required />
               <div className='formRooms flex'>
           <div >
              <label className='formLabel'>Recámaras</label>
              <input
                className='formInputSmall'
                type='number'
                id='bedrooms'
                value={bedrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Baños</label>
              <input
                className='formInputSmall'
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
           </div>
           <label className='formLabel'>Estacionamiento</label>
          <div className='formButtons'>
            <button
              className={parking ? 'formButtonActive' : 'formButton'}
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Sí
            </button>
            <button
              className={
                !parking && parking !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className='formLabel'>Amueblado</label>
          <div className='formButtons'>
            <button
              className={furnished ? 'formButtonActive' : 'formButton'}
              type='button'
              id='furnished'
              value={true}
              onClick={onMutate}
            >
             Sí
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className='formLabel'>Dirección</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />
          {!geolocationEnabled && (
              <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}
           <label className='formLabel'>Oferta</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Sí
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className='formLabel'>Precio Regular</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'rent' && <p className='formPriceText'>$ / Mes</p>}
          </div>

          {offer && (
            <>
              <label className='formLabel'>Precio en Descuento</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}
     <label className='formLabel'>imágenes</label>
          <p className='imagesInfo'>
            La primera image será la portada (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Subir Propiedad
          </button>
           </form>
          
       </main>
    </div>
  )
}

export default CreateListing