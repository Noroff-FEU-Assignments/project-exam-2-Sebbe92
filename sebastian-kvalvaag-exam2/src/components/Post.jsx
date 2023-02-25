import useAxios from "../hooks/useAxios";
import { useRef, useState } from "react";

import ProfileWidget from "./ProfileWidget";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

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

  const likePost = async (emoji) => {
    try {
      const response = await http.put(
        `posts/${props.children.id}/react/${emoji}`
      );
      return response;
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };
  return (
    <div
      className="bg-info shadow-inset-sm my-2 pt-2 pb-4 px-3 post pe-4"
      ref={postRef}
    >
      {props.children.author ? (
        <ProfileWidget profile={props.children.author} />
      ) : (
        <></>
      )}

      <dt className="fs-7 mb-4">{formattedDate}</dt>
      <a href={`/posts?id=${props.children.id}`}>
        <h4 className="break-all">{props.children.title}</h4>
        {props.children.media ? (
          <img src={props.children.media} className="w-100" alt="" />
        ) : (
          <></>
        )}
      </a>
      <p className="break-all">{props.children.body}</p>
      <ul className="d-flex flex-wrap justify-content-between p-0">
        {props.children.tags ? (
          props.children.tags.map((tag, i) => {
            if (tag) {
              return (
                <li
                  className="tag"
                  key={i}
                  onClick={() => {
                    console.log(tag);
                  }}
                >
                  {tag}
                </li>
              );
            }
            return <></>;
          })
        ) : (
          <></>
        )}
      </ul>
      <div className="d-flex justify-content-between">
        <Dropdown as={ButtonGroup}>
          <Button
            variant="info"
            onClick={() => {
              likePost("👍");
            }}
          >
            👍
          </Button>
          <Button
            variant="info"
            onClick={() => {
              likePost("😍");
            }}
          >
            😍
          </Button>
          <Button
            variant="info"
            onClick={() => {
              likePost("🤬");
            }}
          >
            🤬
          </Button>
          <Dropdown.Toggle variant="info" id="dropdown-custom-2" />
          <Dropdown.Menu className="bg-info">
            {props.children.reactions ? (
              props.children.reactions.map((reaction) => (
                <Dropdown.Item
                  onClick={() => {
                    likePost(reaction.symbol);
                  }}
                >
                  {reaction.symbol}
                  <span className="fw-bold text-white">{reaction.count}</span>
                </Dropdown.Item>
              ))
            ) : (
              <></>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Button
          variant="transparent"
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
