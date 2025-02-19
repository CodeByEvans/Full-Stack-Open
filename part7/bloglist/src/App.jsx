import SignIn from "./components/SignIn";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Users from "./components/Users";
import User from "./components/User"
import { useSelector } from "react-redux";
import { setUser } from "./reducers/authReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";

const App = ()  => {
  const user = useSelector((state) => state.auth.user);

  if (user === null) {
    return <SignIn />;
  }

  return (
    <Router>
      <div className="container">
        <Navigation/>
        <h2 className="mt-4">Blog app</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User/>}/>
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
