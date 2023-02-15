import backupImage from "../images/placeholder.png";

export default function ProfileWidget(props) {
  return (
    <a
      href={`/profile?name=${props.profile.name}`}
      className="d-flex align-items-center gap-3 profile-widget"
    >
      <div className="profile_img bg-primary">
        <img
          src={props.profile.avatar ? props.profile.avatar : backupImage}
          alt="avatar"
        />
      </div>
      <h3 className="mw-100px">{props.profile.name}</h3>
    </a>
  );
}
