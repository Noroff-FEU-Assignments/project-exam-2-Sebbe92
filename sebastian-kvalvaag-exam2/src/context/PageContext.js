import React, { useState } from "react";

const PageContext = React.createContext([null, () => {}]);

export const PageProvider = (props) => {
  const [Page, setPage] = useState(1);
  return (
    <PageContext.Provider value={[Page, setPage]}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContext;
