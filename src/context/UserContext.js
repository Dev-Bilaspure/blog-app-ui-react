import React, { createContext, useState, useEffect } from 'react';


const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const UserContext = createContext(INITIAL_STATE);

const UserContextProvider = (props) => {
  const [userState, setUserState] = useState(INITIAL_STATE);
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userState.user));
  }, [userState.user])


  const loginStart = () => {
    setUserState({
      user: null,
      isFetching: true,
      error: false
    })
  }
  const loginSuccess = (user) => {
    setUserState({
      user: user,
      isFetching: false,
      error: false
    })
  }
  const loginFailure = () => {
    setUserState({
      user: null,
      isFetching: false,
      error: true
    })
  }
  const logout = () => {
    setUserState({
      user: null,
      isFetching: false,
      error: false
    })
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider value={{
      user: userState.user, 
      loginStart, 
      loginSuccess, 
      loginFailure, 
      logout, 
      isFetching: userState.isFetching
    }}>
      {props.children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;
