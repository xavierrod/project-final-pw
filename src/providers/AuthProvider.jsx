import { useEffect, useMemo, useState } from 'react';

import AuthContext from '../contexts/AuthContext.js';
import isEmpty from '../helpers/isEmpty.js';

import jwt_decode from 'jwt-decode';

const AuthProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const [currentUser, setCurrentUser] = useState(localUser); //user in localstorage

  const setUserHandler = (user = {}) => {
    if (isEmpty(user)) return;

    const newUser = {
      ...currentUser,
      ...user,
    };

    if (newUser?.token && !newUser?.user?.id) {
      const result = jwt_decode(user?.token);
      const userData = { id: result.id };
      newUser.user = userData;
    }

    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    return setCurrentUser(null);
  };

  const authValues = useMemo(() => {
    return {
      user: currentUser?.user || null,
      token: currentUser?.token,
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
