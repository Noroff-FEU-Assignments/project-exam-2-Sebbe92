import React, { useState } from "react";

const ModalContext = React.createContext([null, () => {}]);

export const UserProvider = (props) => {
  const [commentModal, setCommentModal] = useState({ show: false, id: null });
  return (
    <ModalContext.Provider value={[commentModal, setCommentModal]}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
