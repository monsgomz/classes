import ItemFav from './ItemFav';
import { useFav } from '../context/FavContext';

export default function FavList() {
  let [favItem, updateFav] = useFav();

  console.log(favItem)
  return (
    <ul>
       { favItem ? (
            favItem.map((item)=>(
                <ItemFav key={item.idMeal} item={item}></ItemFav>
                ))
                ) : <p>No favorite elements</p>
        }
    </ul>
  )
}

