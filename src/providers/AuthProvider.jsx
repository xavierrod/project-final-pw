import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';
import isEmpty from '../helpers/isEmpty.js';

const AuthProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const [currentUser, setCurrentUser] = useState(localUser);

  const setUserHandler = (user = {}) => {
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
      //tokens: 
      user: currentUser?.user || null,
      token: currentUser?.data?.token,
      isAuthenticated: !!currentUser?.user?.data?.token,
      setUser: setUserHandler,
      logout: logoutHandler,
    };
  });

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
