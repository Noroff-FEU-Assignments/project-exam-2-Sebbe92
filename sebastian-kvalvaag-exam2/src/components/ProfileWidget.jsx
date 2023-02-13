import React, { useContext } from "react";
import backupImage from "../images/placeholder.png";
import PageContext from "../context/PageContext";
import { Link } from "react-router-dom";
export default function ProfileWidget(props) {
  const [page, setPage] = useContext(PageContext);
  return (
    <a
      href={`/profile?name=${props.profile.name}`}
      className="d-flex align-items-center gap-3 "
    >
      <div className="profile_img bg-primary">
        <img
          src={props.profile.avatar ? props.profile.avatar : backupImage}
          alt="avatar"
        />
      </div>
      <h3>{props.profile.name}</h3>
    </a>
  );
}
