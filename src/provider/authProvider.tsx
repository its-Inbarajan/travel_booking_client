import React, { JSX } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export interface Iuserdetails {
  email?: string;
  user_type?: string;
  userId?: string;
  user_name?: string;
  profile?: string;
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = React.useState<Iuserdetails>(() =>
    JSON.parse(localStorage.getItem("user") as string)
  );
  const navigate = useNavigate();
  const login = async (params: Iuserdetails) => {
    console.log(params);
    setUser(params);
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        check: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
