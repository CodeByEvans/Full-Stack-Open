import { useDispatch } from "react-redux";
import Notification from "./Notification";
import { showNotification } from "../reducers/notificationReducer";
import { logIn } from "../reducers/authReducer";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(logIn(username, password));
    } catch (exception) {
      dispatch(showNotification(`Incorrect username or password`, "error", 5));
      console.log(username, password);
    }
  };

  // Styles
  const buttonStyle = {
    marginTop: 10,
  };

  return (
    <div
      className="container d-grid justify-content-center"
      style={{ marginTop: 40 }}
    >
      <Notification />
      <h2 className="text-center m-5">Log in the application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={buttonStyle}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
