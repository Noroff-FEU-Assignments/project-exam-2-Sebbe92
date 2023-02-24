import useAxios from "../hooks/useAxios";
import { useRef, useState } from "react";

import ProfileWidget from "./ProfileWidget";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import CommentForm from "./CommentForm";
import commentIcon from "../icons/comment.svg";

function Post(props) {
  const http = useAxios();

  const [showComments, setShowComments] = useState(false);
  /* const [like, setLike] = useState(false);
  const [love, setLove] = useState(false);
  const [hate, setHate] = useState(false); */

  const postRef = useRef();

  //date formatting
  const date = new Date(props.children.updated);
  const formattedDate = `${date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })}  ${date.toLocaleTimeString()}`;
  //

  /* const reactionCount = () => {
    console.log(props);
    if (props.children.reactions) {
      const reactions = props.children.reactions;
      reactions.map((reaction) => {
        switch (reaction.symbol) {
          case "👍":
            console.log("👍");
            setLike(true);
            break;
          case "😍":
            console.log("😍");
            setLove(true);
            break;
          case "🤬":
            console.log("🤬");
            setHate(true);
            break;
          default:
            console.log(reaction);
            break;
        }
      });
    }
  }; */

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
      className="bg-info shadow-inset-sm my-4 pt-2 pb-4 px-3 post"
      ref={postRef}
    >
      <ProfileWidget profile={props.children.author} />
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
        <DropdownButton
          id="react-dropdown"
          title={`React: ${props.children._count.reactions} `}
          variant="info"
          size="sm"
          className="d-flex"
          align="end"
        >
          <Dropdown.Item
            onClick={() => {
              likePost("👍");
            }}
          >
            👍
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => {
              likePost("😍");
            }}
          >
            😍
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => {
              likePost("🤬");
            }}
          >
            🤬
          </Dropdown.Item>

          {props.children.reactions ? (
            props.children.reactions.map((reaction) => (
              <Dropdown.Item
                onClick={() => {
                  likePost(reaction.symbol);
                }}
              >
                {reaction.symbol}:{reaction.count}
              </Dropdown.Item>
            ))
          ) : (
            <></>
          )}
        </DropdownButton>

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
