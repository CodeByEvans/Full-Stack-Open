import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../reducers/authReducer";
import { showNotification } from "../reducers/notificationReducer";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";

const Navigation = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const elements = {
    padding: 8,
    fontSize: 18,
    margin:0
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(showNotification(`bye bye ${user.name}`, "success", 5));
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
        Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
        Users
        </Button>
        <p style={elements}>Welcome {user.name}</p>
        <Button color="inherit" onClick={handleLogOut}>logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
