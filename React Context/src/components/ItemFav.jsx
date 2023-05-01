import React from 'react';
import '../style/ItemFav.css'

export default function ItemFav({item}) {
  return (
    <li>
      <div>
      <img src={item.strMealThumb}></img>
      <p>{item.strMeal}</p>
      </div>
      </li>
      
  )
}
