import useAxios from "../hooks/useAxios";
import { useState } from "react";

import ProfileWidget from "./ProfileWidget";
import Button from "react-bootstrap/Button";

import CommentForm from "./CommentForm";
import commentIcon from "../icons/comment.svg";

function Post(props) {
  const [showComments, setShowComments] = useState(false);
  const http = useAxios();
  const likePost = async () => {
    const response = await http.put(`posts/${props.children.id}/react/👍`);
    return response;
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
        <h4 className="break-all">{props.children.title}</h4>
        {props.children.media ? (
          <img src={props.children.media} className="w-100" alt="" />
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
