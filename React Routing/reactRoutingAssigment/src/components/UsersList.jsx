import React from 'react'
import UserItem from './UserItem';
import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import './UserList.css'

const UsersList = () => {
     const [data, setData] = useState([]);
     const [isFetching, setIsFetching] = useState(true); 
     const {uid} = useParams();
     const userMatch = data.find(u=> u.uid === uid);

    useEffect(() => {
        fetch(`https://random-data-api.com/api/v2/users?size=20`)
        .then((resp) => resp.json())
        .then((info) => {
            setIsFetching(false);
            setData(info);
        })
        .catch((err) => {
            setIsFetching(false);
            console.warn('error en url')
        });
    }, []);

  return (
    <section className='list'>
        {isFetching && <Spinner></Spinner>}
    <ul id='list' className='users-list'>
        <p className='title-list'>Name of users</p>
        { data ? (
            data.map((item)=>(
                <UserItem key={item.uid} item={item}></UserItem>
                ))
                ) : <p>No data</p>
        }
    </ul>
    <Outlet context={userMatch}></Outlet>
     </section>
  )
}

export default UsersList;