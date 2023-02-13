import useAxios from "../hooks/useAxios";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import ProfileWidget from "./ProfileWidget";
import Button from "react-bootstrap/Button";
import ModalContext from "../context/ModalContext";
import CommentForm from "./CommentForm";
import commentIcon from "../icons/comment.svg";

const comment = ["id", "comment"];
function Post(props) {
  const [commentModal, setCommentModal] = useContext(ModalContext);
  const [showComments, setShowComments] = useState(false);
  const http = useAxios();
  const likePost = async () => {
    const response = await http.put(`posts/${props.children.id}/react/👍`);
    console.log(response);
  };
  return (
    <div className="bg-info shadow-inset-sm mb-2 py-2 px-3 post me-4">
      <ProfileWidget profile={props.children.author} />
      <dt>{props.children.updated}</dt>
      <div
        onClick={() => {
          console.log(props.children);
        }}
      >
        <h4>{props.children.title}</h4>
        {props.children.media ? (
          <img src={props.children.media} className="w-100" />
        ) : (
          <></>
        )}
      </div>
      <p className="break-all">{props.children.body}</p>
      <ul className="d-flex flex-wrap">
        {props.children.tags ? (
          props.children.tags.map((tag, i) => (
            <li className="tag" key={i}>
              {tag}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
      <div className="d-flex justify-content-between">
        <div onClick={likePost}>👍:{props.children._count.reactions}</div>
        <div
          onClick={() => {
            setShowComments(showComments ? false : true);
            /* setCommentModal({ show: true, id: props.children.id }); */
          }}
        >
          <img src={commentIcon} alt="comment icon" className="icon" />:
          {props.children._count.comments}
        </div>
      </div>
      {showComments && props.children.comments ? (
        <>
          <Button
            onClick={() => {
              setShowComments(false);
            }}
          >
            hide
          </Button>
          <ul>
            {props.children.comments.map((comment, i) => (
              <li key={i}>
                <ProfileWidget profile={comment.author} /> {comment.body}
              </li>
            ))}
          </ul>
          <CommentForm id={props.children.id} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;
