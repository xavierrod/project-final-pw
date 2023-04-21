//Routes
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes';

//Views
import Login from './views/Login';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <Routes>
      {/*  <Route path='/' element={<Index />} /> */}
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Dashboard />} />

      <Route element={<PrivateRoutes />}> </Route>
    </Routes>
  );
}

export default App;
