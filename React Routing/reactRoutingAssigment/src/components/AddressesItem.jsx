import React from 'react';
import { NavLink } from 'react-router-dom';

const AddressesItem = ({item}) => {
  return (
   <li>
            <p><NavLink to={`/addresses/${item.uid}`}>{item.city}, postcode: {item.postcode}</NavLink></p>
    </li>
  )
}

export default AddressesItem