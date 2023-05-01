import React from 'react';
import { useOutletContext, useParams } from "react-router-dom";
import './UserDetails.css'
import FourOhFour from './FourOhFour';

const UsersDetails = () => {
    const {uid} = useParams();
    const user = useOutletContext();
    if(user){
      return(
      <div className='user-details'>
    <section className='user-list'>
      <h2>User -{user.username}- detail</h2>
      <img className='avatar' src={user.avatar}></img>
      <div className='user-section'>
        <p><span>ID: </span> {uid}</p>
        <p><span>Phone Number: </span> {user.phone_number}</p>
        <p><span>Email: </span>{user.email}</p>
        <p><span>Social Insurance Number: </span>{user.social_insurance_number}</p>
        <p><span>Date of Birth: </span>{user.date_of_birth}</p>
      </div>
    </section>
    <div className='user-extra-details'>
    <section className='user-list'>
        <p><span>Employment: </span> {user.employment.title}</p>
        <p><span>Skill: </span> {user.employment.key_skill}</p>
      </section>
      <section className='user-list'>
      <p><span>Subscription: </span> {user.subscription.plan}</p>
      <p><span>Status: </span> {user.subscription.status}</p>
      <p><span>Payment: </span> {user.subscription.payment_method}</p>
      <p><span>Payment: </span> {user.subscription.term}</p>
      </section>
      </div>
      </div>)
    }else{
      return (
        <FourOhFour></FourOhFour>
      )
    }
    
}

export default UsersDetails