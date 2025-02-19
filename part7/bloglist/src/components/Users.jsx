import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleButton = () => {
    console.log(users);
  };

  const usersStyle = {
    paddingLeft: 2,
    paddingTop: 10,
  };

  return (
    <div style={usersStyle}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td style={{ paddingLeft: 50 }}> {user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
