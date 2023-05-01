import { useFav } from '../context/FavContext';
import '../style/ItemMeal.css';
import { useState } from 'react';

export default function Item({item}) {
  let [favItem, updateFav] = useFav();
  const [favorite, setFavorite] = useState(null);

  function clicked(ev){
    
    const favStorage = favItem && favItem.find(data=>data.idMeal===item.idMeal);

    if(!favStorage){
      favItem = [...favItem, item];
      setFavorite('fav')
    }else{
      favItem = favItem.filter(data=>data.idMeal!==item.idMeal);
      setFavorite(null)
    }
    updateFav(favItem);
    
  }
  return (
    
    <li>
      <div>
      <img src={item.strMealThumb}></img>
      <p>Category: {item.strCategory}</p>
            <p>{item.strMeal}</p><button className={favorite}  onClick={clicked}><span className="material-symbols-outlined">favorite</span></button>
      </div>
    </li>
  )
}
