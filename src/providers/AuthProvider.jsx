import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';
import isEmpty from '../helpers/isEmpty.js';

//2.
const AuthProvider = ({ children }) => {
  /* i parse(get a string and turn it into a object) the json  
 if not i deliver a empty object */
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const [currentUser, setCurrentUser] = useState(localUser); //storages the user

  const setUserHandler = (user = {}) => {
    //console.log('test',user)
    if (isEmpty(user)) return;


    localStorage.setItem('user', JSON.stringify(user)); /*json in localstorage*/
    setCurrentUser(user);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    return setCurrentUser(null);
  };

  const authValues = useMemo(() => {
    return {
      
      user: currentUser?.user || null,
      data: currentUser?.token, 
      isAuthenticated: !!currentUser?.token, // data?.data?.token
      //!! boolean, if i dont add the !! i will get a truthy or falsy, when i add the !! i will get a boolean
      setUser: setUserHandler,
      logout: logoutHandler,

     
    };
  });

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
