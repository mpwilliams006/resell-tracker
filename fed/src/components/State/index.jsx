import React, { useState, useEffect } from 'react';

const initialGlobalState = {
  user: {}
};
export const GlobalStateContext = React.createContext({
  state: initialGlobalState,
  updateState: () => { }
});

const GlobalStateContextProvider = ({ children }) => {
  const [state, setState] = useState(
    initialGlobalState
  );


  const setStateHandler = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }

  return (
    <GlobalStateContext.Provider value={{ updateState: setStateHandler, state: state }}>
      {children}
    </GlobalStateContext.Provider >
  );
};


export default GlobalStateContextProvider;