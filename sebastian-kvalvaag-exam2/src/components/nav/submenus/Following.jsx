import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import UserContext from "../../../context/UserContext";
import ProfileWidget from "../../ProfileWidget";
import removeProfileIcon from "../../../icons/remove-people.svg";
import Button from "react-bootstrap/Button";

export default function Following(props) {
  const [following, setFollowing] = useState([]);
  const http = useAxios();
  const user = useContext(UserContext);

  const unFollow = async (name) => {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      getFollowing();
      return response;
    } catch (error) {
      alert(error.response.data.errors[0].message);
    }
  };

  const getFollowing = async () => {
    try {
      const response = await http.get(
        `profiles/${user[0].name}?_following=true`
      );
      setFollowing(response.data.following);

      return response;
    } catch (error) {
      alert(error.response.data.errors[0].message);
    }
  };
  useEffect(() => {
    getFollowing();
  }, []); //eslint-disable-line

  return (
    <div>
      {following ? (
        following.map((profile) => (
          <div className="d-flex justify-content-between align-items-center my-3">
            <ProfileWidget profile={profile} />
            <Button
              variant="info"
              onClick={() => {
                unFollow(profile.name);
              }}
            >
              <img src={removeProfileIcon} alt="" />
            </Button>
          </div>
        ))
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
