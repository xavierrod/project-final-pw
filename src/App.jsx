//Routes
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes';

//Views
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Upload from './views/Upload';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/upload' element={<Upload />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
