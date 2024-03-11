import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css'

function Home() {
  return (
    <div className='container'>
      <div className="heading">NSS BLOOD DONATION CAMP: ETAMAX'24</div>
      <div className='image-container'>
       <img src='/fcritlogo.png' alt='' className='image' />
       <img src='/nsslogo.png' alt='' className='image' style={{ marginLeft: '30px' }} />
       </div> 

      <div className= 'button-container'>
      <Link to="/registration" className="button">Volunteer Registration</Link>
      </div>
    </div>
  );
}

export default Home;