import React, { Dispatch, SetStateAction } from "react";
import { Iuserdetails } from "../provider/authProvider";

interface InitialState {
  user: Iuserdetails;
  setUser: Dispatch<SetStateAction<Iuserdetails>>;
  login: (params: Iuserdetails) => void;
  logout: () => void;
  check?: boolean;
}

const InitialState: InitialState = {
  login: () => {},
  logout: () => {},
  setUser: () => {},
  user: {},
};

export const AuthContext = React.createContext<InitialState>({
  ...InitialState,
});

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Auth Context must be used inside the auth provider.");
  }
  return auth;
};
