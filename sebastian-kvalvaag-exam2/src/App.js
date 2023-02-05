import "./App.scss";
import TopNav from "./components/nav/TopNav";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./context/UserContext";
import MenuContext from "./context/MenuContext";
import Login from "./components/Login";
import SideNav from "./components/nav/SideNav";
import Home from "./pages/Home.js";
import useAxios from "./hooks/useAxios";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";
import Profile from "./pages/Profile";
import PageContext from "./context/PageContext";

function App() {
  const http = useAxios();
  const [menuPage, setMenuPage] = useState(1);
  const [user, setUser] = useLocalStorage("user", "");
  const [page, setPage] = useState({ page: "home" });
  const [profile, setProfile] = useState(true);

  const follow = async () => {
    const response = await http.get(`profiles/sebbe92?_following=true`, {
      name: "sebbe92",
    });
    console.log(response);
  };
  return (
    <PageContext.Provider value={[page, setPage]}>
      <MenuContext.Provider value={[menuPage, setMenuPage]}>
        <UserContext.Provider value={[user, setUser]}>
          {user ? (
            <main className="position-relative ">
              <SideNav />
              <TopNav user={user}></TopNav>
              {(() => {
                switch (page.page) {
                  case "home":
                    return <Home />;
                  case "profile":
                    return <Profile />;
                }
              })()}
            </main>
          ) : (
            <>
              <Login />
              <SignUpForm />
            </>
          )}
        </UserContext.Provider>
      </MenuContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
