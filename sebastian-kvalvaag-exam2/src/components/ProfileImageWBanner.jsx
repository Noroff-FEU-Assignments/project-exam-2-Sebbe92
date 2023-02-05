import React from "react";
import placeholderAvatarImg from "../images/placeholder.png";
import placeholderBannerImg from "../images/pexels-anton-h-145712.jpg";

export default function ProfileImageWBanner(props) {
  return (
    <div
      className="position-relative bg-info banner"
      style={{
        backgroundImage: `url(${
          props.banner ? props.banner : placeholderBannerImg
        })`,
      }}
    >
      <div className="position-absolute start-50 top-50 translate-middle profile_img__big">
        <img
          src={props.avatar ? props.avatar : placeholderAvatarImg}
          alt="avatar"
          className=""
        />
      </div>
    </div>
  );
}
