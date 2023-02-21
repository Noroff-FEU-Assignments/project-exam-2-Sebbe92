import useAxios from "../hooks/useAxios";
import { useRef, useState } from "react";

import ProfileWidget from "./ProfileWidget";
import Button from "react-bootstrap/Button";

import CommentForm from "./CommentForm";
import commentIcon from "../icons/comment.svg";

function Post(props) {
  const http = useAxios();

  const [showComments, setShowComments] = useState(false);

  const postRef = useRef();

  //date formatting
  const date = new Date(props.children.updated);
  const formattedDate = `${date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })}  ${date.toLocaleTimeString()}`;
  //

  const likePost = async () => {
    const response = await http.put(`posts/${props.children.id}/react/👍`);
    return response;
  };
  return (
    <div
      className="bg-info shadow-inset-sm my-4 pt-2 pb-4 px-3 post"
      ref={postRef}
    >
      <ProfileWidget profile={props.children.author} />
      <dt className="fs-7 mb-4">{formattedDate}</dt>
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
        <Button
          onClick={() => {
            setShowComments(showComments ? false : true);
          }}
        >
          <img src={commentIcon} alt="comment icon" className="icon" />:
          {props.children._count.comments}
        </Button>
      </div>
      {showComments && props.children.comments ? (
        <div>
          <ul className="comments-container">
            {props.children.comments.map((comment, i) => (
              <li key={i}>
                <ProfileWidget profile={comment.author} /> <p>{comment.body}</p>
              </li>
            ))}
          </ul>
          <CommentForm id={props.children.id} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;
