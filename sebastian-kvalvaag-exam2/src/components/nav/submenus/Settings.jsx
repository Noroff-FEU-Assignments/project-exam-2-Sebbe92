import React, { useContext, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import UserContext from "../../../context/UserContext";
import { Button } from "react-bootstrap";

export default function Settings() {
  const http = useAxios();
  const [user, setUser] = useContext(UserContext);
  const [banner, setBanner] = useState("");
  const [avatar, setAvatar] = useState("");

  const updateMedia = async () => {
    try {
      const response = await http.put(`profiles/${user.name}/media`, {
        banner,
        avatar,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setBanner(e.target.value);
        }}
      />
      <input
        type="text"
        onChange={(e) => {
          setAvatar(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          updateMedia();
        }}
      >
        Update Media
      </Button>
    </div>
  );
}
