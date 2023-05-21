import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  //   const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');
  const userInfo = localStorage.getItem('userInfo');

  const [authState, setAuthState] = useState({
    token: token,
    expiresAt: expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    setAuthState({ token, userInfo, expiresAt });
  };
  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) return false;
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    setAuthState({ token: null, userInfo: {}, expiresAt: null });
    // navigate('/login');
  };
  return (
    <div>
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
    </div>
  );
};

export { AuthContext, AuthProvider };
