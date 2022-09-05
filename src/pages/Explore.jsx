import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

const Explore = () => {
  return (
    <div className='explore'>
      <header>
        <p className="pageHeader">Explorar</p>
      </header>
      <main>
        {/**Slider */}
        <p className="exploreCategoryHeading">
          Categorias
        </p>
        <div className="exploreCategories">
          <Link to='category/rent'>
            <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg' />
            <p className="exploreCategoryName">
              Lugares en renta
            </p>
          </Link>
          <Link to='category/sell'>
            <img src={sellCategoryImage} alt="sell" className='exploreCategoryImg' />
            <p className="exploreCategoryName">
              Lugares en venta
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore