import React from 'react';
import { NavLink } from 'react-router-dom';

const ItemList = ({item}) => {
      return (
   <li>
            <p><NavLink to={`/users/${item.uid}`}>{item.first_name} {item.last_name}</NavLink></p>
    </li>

        
  )
}

export default ItemList