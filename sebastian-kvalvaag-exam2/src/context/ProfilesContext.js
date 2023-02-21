import React, { useState } from "react";

const ProfilesContext = React.createContext([null, () => {}]);

export const ProfilesProvider = (props) => {
  const [Profiles, setProfiles] = useState(null);
  return (
    <ProfilesContext.Provider value={[Profiles, setProfiles]}>
      {props.children}
    </ProfilesContext.Provider>
  );
};

export default ProfilesContext;
