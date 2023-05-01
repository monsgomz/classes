import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import './AddressesDetails.css'
import FourOhFour from './FourOhFour';

const AddressesDetails = () => {
     const {uid} = useParams();
    const address = useOutletContext();
    if(address){
      return (
        <div>
          <section className='address-section'>
            <img className='icon' src="../city-life.png" alt="search" />
            <p><span>ID: </span> {uid}</p>
            <p><span>City: </span> {address.city}</p>
            <p><span>State: </span> {address.state}</p>
            <p><span>Full Address: </span> {address.full_address}</p>
            <p><span>Building Number: </span> {address.building_number}</p>
            <p><span>Latitude: </span> {address.latitude}</p>
            <p><span>Longitude: </span> {address.longitude}</p>
          </section>
        </div>
    )
    }else{
      return( <FourOhFour></FourOhFour>)
    }
  
}

export default AddressesDetails