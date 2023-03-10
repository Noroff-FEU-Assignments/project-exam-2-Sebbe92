import React, { useContext, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import UserContext from "../../../context/UserContext";
import Button from "react-bootstrap/Button";
import ProfileImageWBanner from "../../ProfileImageWBanner";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";

export default function Settings() {
  const http = useAxios();
  const [user, setUser] = useContext(UserContext);
  const [banner, setBanner] = useState(user.banner);
  const [avatar, setAvatar] = useState(user.avatar);

  const updateMedia = async () => {
    if (!banner) {
      setBanner(user.banner);
    }
    if (!avatar) {
      setAvatar(user.avatar);
    }
    console.log(user.banner, user.avatar);
    try {
      const response = await http.put(`profiles/${user.name}/media`, {
        banner,
        avatar,
      });
      const tempUser = user;
      tempUser.avatar = avatar;
      tempUser.banner = banner;
      setUser(tempUser);
      window.location.reload(false);
      return response;
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };
  return (
    <div>
      <Form>
        <FormGroup controlId="settings-banner">
          <Form.Label>Change Banner</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setBanner(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="settings-avatar">
          <Form.Label>Change Avatar</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setAvatar(e.target.value);
            }}
          />
        </FormGroup>
        <Button
          onClick={() => {
            updateMedia();
          }}
        >
          Update Media
        </Button>
      </Form>
      <ProfileImageWBanner banner={banner} avatar={avatar} />
    </div>
  );
}
