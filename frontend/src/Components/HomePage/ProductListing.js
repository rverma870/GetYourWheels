import React from 'react'
import PopularVehicleCarousel from "./PopularVehicleCarousel";
import MostSearchVehicleCarousel from './MostSearchVehicleCarousel';
import PopularBrandsCarousel from './PopularBrandsCarousel';

function ProductListing() {

  return (
      <>
        <PopularVehicleCarousel />
        <MostSearchVehicleCarousel/>
        <PopularBrandsCarousel/>
      </>
    );
}

export default ProductListing;
