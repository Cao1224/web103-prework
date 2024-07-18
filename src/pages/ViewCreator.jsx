import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import header_image from '../assets/img/header-image.jpg';
import supabase from '../client';
import headshot_placeholder from "../assets/img/headshot-white.png";



const ViewCreator = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRow() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error)
      } else {
        setData(data)
      }
    }

    fetchRow()
  }, [id])

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const getUsernameFromURL = (url) => {
    const parts = url.split('/');
    const username = parts[parts.length - 1];
    return username.startsWith('@') ? username.slice(1) : username;
  };

  const youtubeUsername = data.youtubeURL ? getUsernameFromURL(data.youtubeURL) : '';
  const twitterUsername = data.twitterURL ? getUsernameFromURL(data.twitterURL) : '';
  const insUsername = data.instagramURL ? getUsernameFromURL(data.instagramURL) : '';
  const tiktokUsername = data.tiktokURL ? getUsernameFromURL(data.tiktokURL) : '';

  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

      if (error) {
        console.error('Error deleting row:', error);
      } else {
        console.log('Row deleted successfully');

        navigate('/')
        window.location.reload();
      }
  }

  return (
    <div>
      <header className='header'>
        <img src={header_image} alt="Header Background"></img>
            <h1 className="fw-bold mb-5 text-white">Creators Wiki</h1>
            <div className='button-container mt-5'>
                <button className='text-uppercase button bg-secondary text-white fw-bold fs-6 me-5' onClick={() => navigate('/')}>View all creators</button>
                <button className='text-uppercase button bg-secondary text-white fw-bold fs-6' onClick={() => navigate('/creator/new')}>Add a creators</button>
            </div>
        </header>

      <main className="container"> 
        <div className='row gx-5'>
  
          <div className="d-flex col-auto justify-content-center mb-2">
            <img src={data.imageURL || headshot_placeholder} alt="Creator" className="creator-image" />
          </div>

          <div className="col">
            <h5 className='fs-4 fw-bold mb-4'>{data.name}</h5>

            <p className='mb-3'>{data.description}</p>

            <div class="d-grid col-3">

            {data.youtubeURL && (
              <button
                className={`btn icon ${data.twitterURL ? 'mb-4' : ''}`}
                onClick={() => window.open(data.youtubeURL, '_blank')}
                style={{ display: 'inline-flex', width: 'auto' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className="bi bi-youtube me-4" viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                </svg>
                @{youtubeUsername}
              </button>
            )}

            {data.twitterURL && (
              <button
                className={`btn icon ${data.instagramURL ? 'mb-4' : ''}`}
                onClick={() => window.open(data.twitterURL, '_blank')}
                style={{ display: 'inline-flex', width: 'auto' }}
              >
                {data.twitterURL && <a href={data.twitterURL} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" className="bi bi-twitter-x me-4" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg></a>}
                @{twitterUsername}
              </button>
            )}
            
            {data.instagramURL && (
              <button
                className={`btn icon ${data.tiktokURL ? 'mb-4' : ''}`}
                onClick={() => window.open(data.instagramURL, '_blank')}
                style={{ display: 'inline-flex', width: 'auto' }}
              >
                {data.instagramURL && <a href={data.instagramURL} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#C13584" className="bi bi-instagram me-4" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg></a>}
                @{insUsername}
              </button>
            )}

            {data.tiktokURL && (
              <button
                className={`btn icon`}
                onClick={() => window.open(data.tiktokURL, '_blank')}
                style={{ display: 'inline-flex', width: 'auto' }}
              >
                {data.tiktokURL && <a href={data.tiktokURL} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" className="bi bi-tiktok me-4" viewBox="0 0 16 16"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/></svg></a>}
                @{tiktokUsername}
              </button>
            )}

            </div>

          </div>

      

        </div>

        <div className='button-container mt-5'>
          <button className='text-uppercase button bg-secondary text-white fw-bold fs-5 bg-success me-5' onClick={() => navigate(`/creator/edit/${id}`)}>Edit</button>
          <button className='text-uppercase button bg-secondary text-white fw-bold fs-5 bg-danger ms-5' onClick={handleDelete}>Delete</button>
        </div>
      </main>
    </div>
  );
};

export default ViewCreator;
