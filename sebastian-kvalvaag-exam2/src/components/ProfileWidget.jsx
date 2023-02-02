import React from "react";
import backupImage from "../images/placeholder.png";

export default function ProfileWidget(props) {
  return (
    <div className="d-flex align-items-center gap-3 ">
      <div className="profile_img">
        <img
          src={props.profile.avatar ? props.profile.avatar : backupImage}
          alt="avatar"
        />
      </div>
      <h3>{props.profile.name}</h3>
    </div>
  );
}
