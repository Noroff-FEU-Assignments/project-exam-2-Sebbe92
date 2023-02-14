import React, { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import UserContext from "../context/UserContext";
import ProfileImageWBanner from "../components/ProfileImageWBanner";
import { useLocation } from "react-router";
import ProfileWidget from "../components/ProfileWidget";
import { Modal } from "react-bootstrap";
import EditForm from "../components/EditForm";

export default function Profile(props) {
  const http = useAxios();
  const [user, setUser] = useContext(UserContext);
  setUser(user);
  const [profile, setProfile] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const getProfile = async () => {
    const response = await http.get(
      `profiles/${name}?_followers=true&_following=true&_posts=true`
    );
    setProfile(response.data);
  };

  /* async function getProfilePosts(page) {
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
  } */
  useEffect(() => {
    getProfile();
  }, []); // eslint-disable-line

  return (
    <div className="d-flex flex-column justify-content-center mt-nav-h">
      {profile ? (
        <div>
          <ProfileImageWBanner
            banner={profile.banner}
            avatar={profile.avatar}
          />
          <h1 className="text-center">{profile.name}</h1>
          {profile.followers.some((follower) => follower.name === user.name) ? (
            <Button>UnFollow</Button>
          ) : (
            <Button>Follow</Button>
          )}

          <section>
            <h2>Following</h2>
            <ul className="vertical-scroll-container bg-info py-3 shadow-inset-sm">
              {profile.following.map((profile) => (
                <li className="mx-3">
                  <ProfileWidget
                    profile={{ name: profile.name, avatar: profile.avatar }}
                  />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Followers</h2>
            <ul className="vertical-scroll-container bg-info py-3 shadow-inset-sm">
              {profile.followers.map((profile) => (
                <li className="mx-3" key={profile.name}>
                  <ProfileWidget
                    profile={{ name: profile.name, avatar: profile.avatar }}
                  />
                </li>
              ))}
            </ul>
          </section>
          <section>
            {profile.name === user.name ? (
              <ul>
                {profile.posts.map((post, i) => (
                  <li key={i}>
                    <h4>{post.title}</h4>{" "}
                    <Button
                      onClick={() => {
                        setEditModal(post.id);
                      }}
                    >
                      edit
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <h2>Posts</h2>
                {profile.posts.map((post, i) => (
                  <li key={i}>
                    <h4>{post.title}</h4>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <Modal
            show={editModal}
            onHide={() => {
              setEditModal(null);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditForm id={editModal} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
