import backupImage from "../images/placeholder.png";

export default function ProfileWidget(props) {
  return (
    <a
      href={`/profile?name=${props.profile.name}`}
      className="d-flex align-items-center gap-3 mw-100px hover-border"
    >
      <div className="profile_img bg-primary">
        <img
          src={props.profile.avatar ? props.profile.avatar : backupImage}
          alt="avatar"
        />
      </div>
      <h3 className="text-white">{props.profile.name}</h3>
    </a>
  );
}
