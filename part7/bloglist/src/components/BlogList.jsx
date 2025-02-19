import { useDispatch, useSelector } from "react-redux";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import { intializeBlogs, updateBlog } from "../reducers/blogReducer";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(intializeBlogs());
  }, [dispatch]);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              Blogs
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    </div>
  );
};

export default BlogList;
