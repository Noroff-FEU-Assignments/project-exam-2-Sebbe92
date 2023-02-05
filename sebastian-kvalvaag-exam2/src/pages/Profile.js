import React, { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Button from "react-bootstrap/Button";
import CenteredModal from "../components/CenteredModal";
import ModalContext from "../context/ModalContext";
import PageContext from "../context/PageContext";
import ProfileImageWBanner from "../components/ProfileImageWBanner";
const postLimit = 20;

export default function Profile(props) {
  const http = useAxios();
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useContext(PageContext);
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    const response = await http.get(
      `profiles/${page.profileName}?_followers=true&_following=true&_posts=true`
    );
    setProfile(response.data);
    console.log(response);
  };

  async function getProfilePosts(page) {
    try {
      const response = await http.get(
        `/profiles/${props.name}?limit=${postLimit}&offset=${page}&_author=true&_comments=true`
      );
      if (posts) {
        const temp = posts.concat(response.data);
        console.log(temp);
        setPosts(temp);
      } else {
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center mt-nav-h">
      {profile ? (
        <div>
          <ProfileImageWBanner
            banner={profile.banner}
            avatar={profile.avatar}
          />
          <h1 className="text-center">{profile.name}</h1>

          <section>
            <h2>Following</h2>
            username123
          </section>
          <section>
            <h2>Followers</h2>
            username123
          </section>
          <section>
            <h2>Posts</h2>
            psot post post
          </section>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
