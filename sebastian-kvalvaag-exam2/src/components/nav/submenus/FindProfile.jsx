import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ProfileWidget from "../../ProfileWidget";
import useAxios from "../../../hooks/useAxios";
import addProfileIcon from "../../../icons/add-people.svg";
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
    const test = await getProfiles(offset);
    tempList = tempList.concat(test);
    offset = offset + 100;
    if (test[0]) {
      getAllProfiles();
    } else {
      offset = 0;
      setProfiles(tempList);
    }
  };
  const getProfiles = async (offset) => {
    try {
      const response = await http.get(
        `profiles?offset=${offset}&sortOrder=asc`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(profiles);
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
    console.log(newList);
  };
  //display profilewidgets for each result
  const follow = async (name) => {
    try {
      const response = await http.put(`profiles/${name}/follow`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
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
          filteredList.map((profile, i) => (
            <div
              key={i}
              className="d-flex justify-content-between align-items-center my-2"
            >
              <ProfileWidget profile={profile} />
              <Button
                variant="transparent"
                onClick={() => {
                  follow(profile.name);
                  console.log(user, profile);
                }}
              >
                <img src={addProfileIcon} alt="" />
              </Button>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
