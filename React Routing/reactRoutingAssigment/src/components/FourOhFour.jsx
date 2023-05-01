import React from 'react';
import './FourOhFour.css';

const FourOhFour = () => {
  return (
    <div className='fof'>
      <h1>Oops!!</h1>
      <h2>Something went wrong</h2>
      <h3>Please try again!</h3>
      <img className='icon-404' src="../robot.png" alt="404" />
    </div>
  )
}

export default FourOhFour