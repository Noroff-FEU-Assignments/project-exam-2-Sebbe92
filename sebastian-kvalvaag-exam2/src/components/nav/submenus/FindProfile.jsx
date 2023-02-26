import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ProfileWidget from "../../ProfileWidget";
import useAxios from "../../../hooks/useAxios";
import addProfileIcon from "../../../icons/add-people.svg";
import removeProfileIcon from "../../../icons/remove-people.svg";
import ProfilesContext from "../../../context/ProfilesContext";
import UserContext from "../../../context/UserContext";

export default function FindProfile() {
  const user = useContext(UserContext);
  const [profiles, setProfiles] = useContext(ProfilesContext);
  const [filteredList, setFilteredList] = useState(profiles ? profiles : []);

  const http = useAxios();
  //get profiles
  let offset = 0;
  let tempList = [];
  const getAllProfiles = async () => {
    try {
      const test = await getProfiles(offset);
      tempList = tempList.concat(test);
      offset = offset + 100;
      if (test[0]) {
        getAllProfiles();
      } else {
        offset = 0;
        setProfiles(tempList);
      }
    } catch (error) {
      alert("an error accrued while trying to fetch profiles");
    }
  };
  const getProfiles = async (offset) => {
    try {
      const response = await http.get(
        `profiles?offset=${offset}&sortOrder=asc&_followers=true`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (profiles) {
      return;
    }
    getAllProfiles();
  }, []); //eslint-disable-line

  //regex to match names
  const filterProfiles = (searchInput) => {
    const regex = new RegExp(searchInput);
    setFilteredList([]);
    const newList = profiles.filter((profile) =>
      regex.test(profile.name.toLowerCase())
    );
    if (newList.length > 20) {
      newList.splice(20);
    }
    setFilteredList(newList);
  };
  //display profilewidgets for each result

  //follow/un follow profile by name
  const follow = async (name) => {
    try {
      const response = await http.put(`profiles/${name}/follow`);
      console.log(response);
    } catch (error) {
      alert(error.response.data.status);
    }
  };
  const unFollow = async (name) => {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      return response;
    } catch (error) {
      alert(error.response.data.status);
    }
  };

  //The feedback when pressing the add people button should be more clear, but to make it change i would have to reload the profiles but then i risk getting an error from the database, so i choose to have it a little less than ideal instead of beeing error prone. there is another fix but i do not have the time
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h3 className="text-center">Find People</h3>
        <input
          type="text"
          className="mx-auto"
          onChange={(e) => {
            filterProfiles(e.target.value.toLowerCase());
          }}
        />
      </div>
      <div>
        {filteredList.length > 0 ? (
          filteredList.map((profile, i) => {
            return (
              <div
                key={i}
                className="d-flex justify-content-between align-items-center my-2"
              >
                <ProfileWidget profile={profile} />

                {profile.followers.some((follower) => {
                  return follower.name === user[0].name;
                }) ? (
                  <Button
                    variant="transparent"
                    onClick={() => {
                      unFollow(profile.name);
                      const tempList = filteredList[i].followers.filter(
                        (profile) => {
                          return profile.name === user[0].name;
                        }
                      );
                      console.log(tempList);
                      setFilteredList(tempList);
                    }}
                  >
                    <img src={removeProfileIcon} alt="remove profile" />
                  </Button>
                ) : (
                  <Button
                    variant="transparent"
                    onClick={() => {
                      follow(profile.name);
                    }}
                  >
                    <img src={addProfileIcon} alt="add profile" />
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
