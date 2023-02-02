import "./App.scss";
import TopNav from "./components/nav/TopNav";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./context/UserContext";
import Login from "./components/Login";
import SideNav from "./components/nav/SideNav";
import Home from "./pages/Home.js";
import useAxios from "./hooks/useAxios";
import SignUpForm from "./components/SignUpForm";

function App() {
  const http = useAxios();
  const [user, setUser] = useLocalStorage("user", "");
  console.log(user);
  const follow = async () => {
    const response = await http.get(`profiles/sebbe92?_following=true`, {
      name: "sebbe92",
    });
    console.log(response);
  };
  return (
    <UserContext.Provider value={[user, setUser]}>
      {user ? (
        <main className="position-relative ">
          <SideNav />
          <TopNav user={user}></TopNav>
          <Home />
        </main>
      ) : (
        <>
          <Login />
          <SignUpForm />
        </>
      )}
    </UserContext.Provider>
  );
}

export default App;
