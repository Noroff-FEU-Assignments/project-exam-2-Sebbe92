//functions and imports
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./context/UserContext";
import MenuContext from "./context/MenuContext";
import PageContext from "./context/PageContext";
import ProfilesContext from "./context/ProfilesContext";

//pages
import Login from "./pages/Login";
import Home from "./pages/Home.js";
import Welcome from "./pages/Welcome";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
//components
import TopNav from "./components/nav/TopNav";
import SideNav from "./components/nav/SideNav";
import Error from "./components/Error";
import BasicNav from "./components/nav/BasicNav";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [menuPage, setMenuPage] = useState(1);
  const [user, setUser] = useLocalStorage("user", "");
  const [page, setPage] = useState({ page: "home" });
  const [profiles, setProfiles] = useState(null);

  //if a user is detected in localstorage this router will be used
  const loggedIn = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/profile/",
      element: <Profile />,
    },
    {
      path: "/posts/",
      element: <Posts />,
    },
  ]);
  //if a user is not detected in localstorage this router will be used
  const loggedOut = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
      errorElement: <Error />,
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
                <ScrollToTop />
                <SideNav />
                <TopNav user={user}></TopNav>
                <RouterProvider router={loggedIn} />
              </ProfilesContext.Provider>
            </main>
          ) : (
            <>
              <BasicNav />
              <div className="vh-100 mx-auto d-flex flex-column align-items-center justify-content-center welcome-background animate-left">
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
