import React, { useState } from "react";

const MenuContext = React.createContext([null, () => {}]);

export const MenuProvider = (props) => {
  const [menuPage, setMenuPage] = useState(1);
  return (
    <MenuContext.Provider value={[menuPage, setMenuPage]}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
