//Routes
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes';

//Views
import Login from './views/Login';
import FrontPage from './views/FrontPage';

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<Index />} /> */}
      <Route path='/' element={<Login />} />

      <Route element={<PrivateRoutes />}>
        {' '}
        <Route path='/frontpage' element={<FrontPage />} />
      </Route>
    </Routes>
  );
}

export default App;
