import "./App.scss";
import TopNav from "./components/nav/TopNav";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./context/UserContext";
import MenuContext from "./context/MenuContext";
import Login from "./components/Login";
import SideNav from "./components/nav/SideNav";
import Home from "./pages/Home.js";
import Welcome from "./pages/Welcome";
import useAxios from "./hooks/useAxios";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";
import Profile from "./pages/Profile";
import PageContext from "./context/PageContext";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";

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
  const loggedIn = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile/",
      element: <Profile />,
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
              <SideNav />
              <TopNav user={user}></TopNav>
              <RouterProvider router={loggedIn} />
            </main>
          ) : (
            <>
              <RouterProvider router={loggedOut} />
            </>
          )}
        </UserContext.Provider>
      </MenuContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
