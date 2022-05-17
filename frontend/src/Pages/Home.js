import React from 'react'
import HomeCarousel from './HomeCarousel';
import ProductListing from '../Components/HomePage/ProductListing';
import "../Styles/Home/HomeCarousel.css";

function Home() {

    return (
      <>
        <div className='Home'>

        <HomeCarousel />
        <ProductListing />
        </div>
      </>
    );
}

export default Home
