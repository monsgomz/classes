import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/UseLocalStorage';
import { useState } from 'react';

const FavContext = createContext(); //create the context object

function FavProvider(props) { 
  const [favItem, setFavItem] =useLocalStorage('FavMeals',[])
  const data = [];
  const [fav, setFav] = useState(data);

  function updateFav(data) {
    setFavItem(data);
  }
  
  return <FavContext.Provider value={[favItem, updateFav]} {...props} />;
}

function useFav() {
  const context = useContext(FavContext);
  if (!context) throw new Error('Not inside the Provider');
  return context; 
 }

export { useFav, FavProvider };