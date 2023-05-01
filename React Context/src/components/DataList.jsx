import React from 'react';
import ItemMeal from './ItemMeal';
import { useState, useEffect } from 'react';
import '../style/DataList.css'

export default function DataList() {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true); 
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
    

    function shuffle(array) {
      var j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    }

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${randomCharacter}`)
        .then((resp) => resp.json())
        .then((info) => {
            setIsFetching(false);
            // console.log(info.meals);
            setData(info.meals);
        })
        .catch((err) => {
            setIsFetching(false);
            console.warn('error en url')
        });
    }, []);
    // console.log(data)

  return (
    <div>
    <h2> - List of Recipes -</h2>
    <section>
    <ul>
        { data ? (
            shuffle(data).map((item)=>(
                <ItemMeal key={item.idMeal} item={item}></ItemMeal>
                ))
                ) : <h3 className='noData'>No data try again</h3>
        }
    </ul>
    </section>
    </div>
  )
}
