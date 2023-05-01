import React from 'react'
import AddressesItem from './AddressesItem';
import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import './AddressesList.css'

const AddressesList = () => {
   const [data, setData] = useState([]);
     const [isFetching, setIsFetching] = useState(true); 
     const {uid} = useParams();
     const addressMatch = data.find(u=> u.uid === uid);

    useEffect(() => {
        fetch(`https://random-data-api.com/api/v2/addresses?size=20`)
        .then((resp) => resp.json())
        .then((info) => {
            setIsFetching(false);
            setData(info);
        })
        .catch((err) => {
            // displayError(err);
            setIsFetching(false);
            console.warn('error en url')
        });
    }, []);

  return (
    <section className='list'>
        {isFetching && <Spinner></Spinner>}
    <ul  className='address-list'>
        <p className='address-title-list'>City | Postcode</p>
        { data ? (
            data.map((item)=>(
                <AddressesItem key={item.uid} item={item}></AddressesItem>
                ))
                ) : <p>No data</p>
        }
    </ul>
     <Outlet context={addressMatch}></Outlet>
     </section>
  )
}

export default AddressesList