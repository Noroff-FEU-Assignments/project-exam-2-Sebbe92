import React, { useContext } from "react";
import backupImage from "../images/placeholder.png";
import PageContext from "../context/PageContext";

export default function ProfileWidget(props) {
  const [page, setPage] = useContext(PageContext);
  return (
    <div
      className="d-flex align-items-center gap-3 "
      onClick={() => {
        setPage({ page: "profile", profileName: props.profile.name });
      }}
    >
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
