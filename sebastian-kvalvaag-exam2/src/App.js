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
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjA3LCJuYW1lIjoic2ViYmU5MiIsImVtYWlsIjoiU2ViS3ZhOTUxMzhAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjc0NjIyOTY0fQ.4pPaCVyAwa_PAytsJTqSzWdRG3RWVxhJEx2GqgT3xKI",
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
