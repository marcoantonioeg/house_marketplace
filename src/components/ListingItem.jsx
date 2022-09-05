import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathubIcon from '../assets/svg/bathtubIcon.svg'

const ListingItem = ({listing, id, onDelete}) => {
  return (
    <li className='categoryListing'>
        <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
            <img src={listing.imageUrls[0]} alt={listing.name} className="categoryListingImg" />
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">
                    {listing.location}
                </p>
                <p className="categoryListingName">
                    {listing.name}
                </p>
                <p className="categoryListingPrice">
                  ${listing.offer ? listing.discountedPrice : listing.regularPrice}
                  {listing.type === 'rent' && '/ Mnesuales'}
                </p>
                <div className="categoryListingInfoDiv">
                    <img src={bedIcon} alt="bed" />
                    <p className="categoryListingInfoText">
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Recamaras` : '1 Recamara'}
                    </p>
                    <img src={bathubIcon} alt="bathub" />
                    <p className="categoryListingInfoText">
                    {listing.bathrooms > 1 ? `${listing.bathrooms} Baños` : '1 Baño'}

                    </p>
                </div>
            </div>
        </Link>
        {onDelete && (
            <DeleteIcon onClick={()=> onDelete(listing.id, listing.name)} className='removeIcon' fill='rgb(321,76, 60)'/>
        )}
    </li>
  )
}

export default ListingItem