//Routes
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes';
import Navbar from './components/Navbar';

//Views
import Index from './views/index';
import Login from './views/login';
import SignUp from './views/signup';
import Upload from './views/upload';
import MyEntries from './views/myEntries';

//styles
import Notifications from './components/Notifications';
import styles from './index.css?inline';

//
import useAuth from './hooks/useAuth';
import EntryEdit from './views/EntryEdit';

function App() {
  const { isAuthenticated } = useAuth();

  console.log({ isAuthenticated });

  return (
    <>
      <Notifications />
      <Navbar />

      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/myentries' element={<MyEntries />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/entries/:id/edit' element={<EntryEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
