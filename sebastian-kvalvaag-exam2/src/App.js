import "./App.scss";
import TopNav from "./components/TopNav";

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const getProfile = async () => {
    const response = await fetch(
      "https://api.noroff.dev/api/v1/social/profiles/sebbe92",
      {
        method: "GET",
        headers: {
          Authorization: "",
        },
      }
    );
    const data = await response.json();
    setUser(data);
    return data;
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <main>
      <TopNav></TopNav>
      <h2>{user.name}</h2>
    </main>
  );
}

export default App;
