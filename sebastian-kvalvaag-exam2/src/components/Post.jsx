import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import ProfileWidget from "./ProfileWidget";
import axios from "axios";

function Post(props) {
  const http = useAxios();
  const likePost = async () => {
    const response = await http.put(`posts/${props.children.id}/react/👍`);
    console.log(response);
  };
  return (
    <div className="bg-info shadow-inset-sm mb-2 py-2 px-2 post">
      <ProfileWidget profile={props.children.author} />
      <h4>{props.children.title}</h4>
      {props.children.media ? (
        <img src={props.children.media} className="w-100" />
      ) : (
        <></>
      )}

      <p>{props.children.body}</p>
      <ul className="d-flex flex-wrap">
        {props.children.tags ? (
          props.children.tags.map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
      <div className="d-flex justify-content-between">
        <div onClick={likePost}>likes:{props.children._count.reactions}</div>
        <div>Comments:{props.children._count.comments}</div>
      </div>
    </div>
  );
}

export default Post;
