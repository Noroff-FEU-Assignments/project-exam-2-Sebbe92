import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import Button from "react-bootstrap/Button";
import addProfileIcon from "../icons/add-people.svg";
import removeProfileIcon from "../icons/remove-people.svg";
export default function FollowBtn(props) {
  const http = useAxios();
  const [isFollowing, setIsFollowing] = useState(null);
  const profile = props.children;
  const currentUsername = props.name;
  if (
    profile.followers.some((follower) => {
      return follower.name === currentUsername;
    })
  ) {
    setIsFollowing(true);
  }

  const unFollow = async (name) => {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      return response;
    } catch (error) {
      console.log(error);
      alert(error.data);
    }
  };

  return (
    <>
      <Button
        variant="transparent"
        onClick={() => {
          unFollow(profile.name);
          setIsFollowing(false);
        }}
      >
        <img
          src={isFollowing ? removeProfileIcon : addProfileIcon}
          alt="remove profile"
        />
      </Button>
    </>
  );
}
