import React from 'react';
import { useNavigate } from 'react-router-dom';
import header_image from '../assets/img/header-image.jpg';
import '../assets/styles/ShowCreators.css'
import Card from '../components/Card'


const ShowCreators = ({ creators }) => {
  const navigate = useNavigate();
  
  return (
    <div>
        <header className='header'>
        <img src={header_image} alt="Header Background"></img>
            <h1 className="fw-bold mb-5 text-white text-center">Creators Wiki</h1>
            <div className='button-container mt-5'>
                <button className='text-uppercase button bg-secondary text-white fw-bold fs-6' onClick={() => navigate('/')}>View all creators</button>
                <button className='text-uppercase button bg-secondary text-white fw-bold fs-6' onClick={() => navigate('/creator/new')}>Add a creators </button>
            </div>
        </header>

        <main className="container">
        <div className="row">
          {creators.length > 0 ? (
            creators.map((creator) => (
              <div key={creator.id} className="col-md-6">
                <Card creator={creator} />
              </div>
            ))
          ) : (
            <h3 className="fw-bold mb-5 text-white text-center">No creators found.</h3>
          )}
        </div>
      </main>
    </div>
  );
};


export default ShowCreators;
