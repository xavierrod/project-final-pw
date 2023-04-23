//Routes
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes';
import Navbar from './components/Navbar';

//Views
import Index from './views/index';
import Login from './views/login';
import SignUp from './views/signup';
import Home from './views/home';
import Upload from './views/upload';
import Notifications from './components/Notifications';

//
import useAuth from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Notifications />
      <Navbar />
      {JSON.stringify({ isAuthenticated })}

      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/upload' element={<Upload />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
