import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import UserContext from "../../../context/UserContext";
import ProfileWidget from "../../ProfileWidget";

export default function Following(props) {
  const user = useContext(UserContext);
  console.log(user);

  const [following, setFollowing] = useState([]);
  const http = useAxios();

  const getFollowing = useCallback(async () => {
    const response = await http.get(`profiles/${user[0].name}?_following=true`);
    console.log(response);
    setFollowing(response.data.following);
  }, [http, user]);
  useEffect(() => {
    getFollowing();
  }, []); //eslint-disable-line

  return (
    <div>
      Following
      {following ? (
        following.map((profile) => <ProfileWidget profile={profile} />)
      ) : (
        <></>
      )}
    </div>
  );
}
