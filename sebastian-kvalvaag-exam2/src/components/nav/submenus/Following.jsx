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
      console.log(error);
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
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowing();
  }, []); //eslint-disable-line

  return (
    <div>
      {following ? (
        following.map((profile) => (
          <div className="w-100 d-flex justify-content-between align-items-center my-2">
            <ProfileWidget profile={profile} />
            <Button
              variant="transparent"
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
