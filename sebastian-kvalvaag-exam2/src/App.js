import "./App.scss";
import TopNav from "./components/nav/TopNav";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./context/UserContext";
import MenuContext from "./context/MenuContext";
import Login from "./pages/Login";
import SideNav from "./components/nav/SideNav";
import Home from "./pages/Home.js";
import Welcome from "./pages/Welcome";
import { useState } from "react";
import Profile from "./pages/Profile";
import PageContext from "./context/PageContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ProfilesContext from "./context/ProfilesContext";
import Error from "./components/Error";

function App() {
  const [menuPage, setMenuPage] = useState(1);
  const [user, setUser] = useLocalStorage("user", "");
  const [page, setPage] = useState({ page: "home" });
  const [profiles, setProfiles] = useState(null);

  const loggedIn = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile/",
      element: <Profile />,
    },
    {
      path: "/login",
      errorElement: <Error />,
    },
    {
      path: "/signup",
      errorElement: <Error />,
    },
  ]);

  const loggedOut = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return (
    <PageContext.Provider value={[page, setPage]}>
      <MenuContext.Provider value={[menuPage, setMenuPage]}>
        <UserContext.Provider value={[user, setUser]}>
          {user ? (
            <main className="position-relative ">
              <ProfilesContext.Provider value={[profiles, setProfiles]}>
                <SideNav />
                <TopNav user={user}></TopNav>
                <RouterProvider router={loggedIn} />
              </ProfilesContext.Provider>
            </main>
          ) : (
            <>
              <div className="vh-100 mx-auto d-flex flex-column align-items-center justify-content-center welcome-background animate-left">
                <h1>Social Hub</h1>
                <RouterProvider router={loggedOut} />
              </div>
            </>
          )}
        </UserContext.Provider>
      </MenuContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
