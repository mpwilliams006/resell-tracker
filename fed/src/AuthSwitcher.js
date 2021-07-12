import React, { useContext } from "react";

import IsAuthenticated from "./auth-context";

const AuthSwitcher = (auth) => {
  const { isAuth, setIsAuth } = useContext(IsAuthenticated);
  setIsAuth(auth);
};

export default AuthSwitcher;
