import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import UserContext from "../../../context/UserContext";
import ProfileWidget from "../../ProfileWidget";

export default function Following(props) {
  const [user, setUser] = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const http = useAxios();

  const getFollowing = async () => {
    const response = await http.get(`profiles/${user.name}?_following=true`);
    console.log(response);
    setFollowing(response.data.following);
  };
  useEffect(() => {
    getFollowing();
  }, []);

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
