import React, { useEffect, useState } from "react";
import ProfileWidget from "../../ProfileWidget";
import useAxios from "../../../hooks/useAxios";

export default function FindProfile() {
  const [profiles, setProfiles] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const http = useAxios();
  //get users
  let offset = 0;
  let tempList = [];
  const getAllProfiles = async () => {
    console.log(profiles, tempList, offset);
    const test = await getProfiles(offset);
    console.log(test);
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
    if (!profiles) {
      setProfiles([]);
      getAllProfiles();
    }
  }, []);

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
          <ProfileWidget key={i} profile={profile} />
        ))
      ) : (
        <></>
      )}
    </>
  );
}
