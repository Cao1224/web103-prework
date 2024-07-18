import React, { useEffect, useState } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import supabase from './client';

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      let { data: creators, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(creators);
      }
    };

    fetchCreators();
  }, []);

  const routes = useRoutes([
    { path: '/', element: <ShowCreators creators={creators} /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/edit/:id', element: <EditCreator /> },
    { path: '/creator/new', element: <AddCreator /> }
  ]);

  return routes;
};

const AppContainer = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


export default AppContainer;
