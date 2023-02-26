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
import Post from "../components/Post";

export default function Profile(props) {
  const http = useAxios();
  const user = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [posts, setPosts] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");

  const getProfile = async () => {
    const response = await http.get(
      `profiles/${name}?_followers=true&_following=true&_posts=true`
    );
    setProfile(await response.data);
    getPostByName(await response.data.name);
  };
  const getPostByName = async (name) => {
    try {
      const response = await http.get(
        `profiles/${name}/posts?_comments=true&_reactions=true&_author=true`
      );
      setPosts(response.data);
    } catch (error) {
      alert("error fetching posts");
    }
  };
  const follow = async (name) => {
    try {
      const response = await http.put(`profiles/${name}/follow`);
      getProfile();
      return response;
    } catch (error) {
      alert(error.response.data.status);
    }
  };
  const unFollow = async (name) => {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      getProfile();
      return response;
    } catch (error) {
      alert(error.response.data.status);
    }
  };
  useEffect(() => {
    if (profile) return;
    getProfile();
  }, []); // eslint-disable-line

  return (
    <div className="d-flex flex-column justify-content-center mt-nav-h">
      {profile ? (
        <div className="">
          <ProfileImageWBanner
            banner={profile.banner}
            avatar={profile.avatar}
          />
          <div className="d-flex flex-column align-items-center ">
            <h1 className="text-center">{profile.name}</h1>
            {profile.name === user[0].name ? (
              <></>
            ) : (
              <>
                {profile.followers.some(
                  (follower) => follower.name === user[0].name
                ) ? (
                  <Button
                    variant="danger"
                    onClick={() => {
                      unFollow(profile.name);
                    }}
                    className="mx-auto"
                  >
                    UnFollow
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => {
                      follow(profile.name);
                    }}
                  >
                    Follow
                  </Button>
                )}
              </>
            )}
          </div>
          <div className="container-fluid row m-0 p-0">
            <section className="col-12 col-lg-3 offset-lg-1 p-0">
              <h2>Following</h2>
              <ul className="vertical-scroll-container bg-info py-3 shadow-inset-sm">
                {profile.following.map((profile, i) => (
                  <li className="mx-3" key={`${profile.id}${i}`}>
                    <ProfileWidget
                      profile={{ name: profile.name, avatar: profile.avatar }}
                    />
                  </li>
                ))}
              </ul>
            </section>
            <section className="col-12 col-lg-3 offset-lg-1 p-0">
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
            <section className="col-12 col-lg-4">
              <h2>Posts</h2>
              {profile.name === user[0].name ? (
                <ul>
                  {posts ? (
                    posts.map((post, i) => (
                      <li key={i}>
                        <Post>{post}</Post>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setEditModal(post.id);
                          }}
                        >
                          edit
                        </Button>
                      </li>
                    ))
                  ) : (
                    <>No posts</>
                  )}
                </ul>
              ) : (
                <ul>
                  {posts ? (
                    posts.map((post) => <Post>{post}</Post>)
                  ) : (
                    <>no posts</>
                  )}
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
                  Edit Post
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditForm id={editModal} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
