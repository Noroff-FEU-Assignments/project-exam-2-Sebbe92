import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = React.createContext([null, () => {}]);

export const UserProvider = (props) => {
  const [user, setUser] = useLocalStorage("user", null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
