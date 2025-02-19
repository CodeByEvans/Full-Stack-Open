import  {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import BlogForm from '../src/components/BlogForm';
import { expect, vi } from 'vitest';

const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: { name: 'Test User', id: 'user123' },
};

test('title and author are visible by default but details are not visible', () => {
    const {container} = render(<Blog blog={blog}/>)
    
    const initial = container.querySelector('.blog-default')
    expect(initial).toBeVisible()

    const details = container.querySelector('.blog-details')
    expect(details).toBeNull()
})

test('URL and Likes are visible when the button is clicked',async () => {
    const { container } = render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).toBeVisible
})

test('should call event handler twice when like button is clicked twice', async () => {
    const mockUpdateBlog = vi.fn()

    render(<Blog blog={blog} updateBlog={mockUpdateBlog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)

})

test('calls the event handler with the correct details when a new blog is created', async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')
    
    await userEvent.type(titleInput, 'New Blog Title')
    await userEvent.type(authorInput, 'New Blog Author' )
    await userEvent.type(urlInput, 'http://newblog.com')

    const submitButton = screen.getByText('Create')
    await user.click(submitButton);

    expect(createBlog).toHaveBeenCalledWith({
        title: 'New Blog Title',
        author: 'New Blog Author',
        url: 'http://newblog.com',
    });
});