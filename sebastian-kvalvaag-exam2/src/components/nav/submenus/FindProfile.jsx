import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ProfileWidget from "../../ProfileWidget";
import useAxios from "../../../hooks/useAxios";
import addProfileIcon from "../../../icons/add-people.svg";

export default function FindProfile() {
  const [profiles, setProfiles] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const http = useAxios();
  //get users
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
    if (profiles) return;
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
      <h3>Find People</h3>
      <input
        type="text"
        onChange={(e) => {
          filterProfiles(e.target.value.toLowerCase());
        }}
      />
      {filteredList.length > 0 ? (
        filteredList.map((profile, i) => (
          <>
            <ProfileWidget key={i} profile={profile} />
            <Button
              onClick={() => {
                follow(profile.name);
              }}
            >
              <img src={addProfileIcon} alt="" />
            </Button>
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
