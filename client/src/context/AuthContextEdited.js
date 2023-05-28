import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [authState, setAuthState] = useState({
    token: token,
    expiresAt: expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('expiresAt', expiresAt);
    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setUserInfo(localStorage.getItem('userInfo'));
    setExpiresAt(localStorage.getItem('expiresAt'));
  }, []);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    setAuthState({
      token: null,
      userInfo: null,
      expiresAt: {},
    });
    // navigate('/login');
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
    //return true
  };

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
