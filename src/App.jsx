//Routes
import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Views
import CreateUser from './views/CreateUser';

function App() {
  return (
    <Routes>
      <Route path='/' element={<CreateUser />} />
    </Routes>
  );
}

export default App;
