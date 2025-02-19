import { ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);

  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <h3>no user found, go back and start again</h3>;
  }

  return (
    <div>
      <h3>{user.name}</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Added Blogs</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map((blog) => (
            <tr>
              <td key={blog.id}>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
