import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [url, setUrl] = useState("");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [infoMessage, setInfoMessage] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const logout = () => {
        console.log("log out");
        setUser(null);
        return window.localStorage.removeItem("loggedBlogAppUser");
    };

    const handleCreateBlog = (event) => {
        event.preventDefault();
        const blogObject = {
            author: author,
            title: title,
            url: url,
        };

        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog));
            setAuthor("");
            setTitle("");
            setUrl("");
        });

        setInfoMessage(
            `A new blog ${blogObject.title} by ${blogObject.author}`
        );
        setTimeout(() => {
            setInfoMessage(null);
        }, 5000);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("logging in with", username, password);

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem(
                "loggedBlogAppUser",
                JSON.stringify(user)
            );

            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
            console.log(user.token);
        } catch (exception) {
            setErrorMessage("Wrong username or password");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>Login to application</h2>
            <div>
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    return (
        <div>
            <Notification
                message={errorMessage || infoMessage}
                className={errorMessage ? "error" : "info"}
            />
            {!user && loginForm()}
            {user && (
                <div className="blogs">
                    <h2>blogs</h2>
                    <p>{user.username} logged in</p>
                    <button onClick={logout}>Log out</button>
                    <div>
                        <h3>Create new</h3>
                        <form noValidate onSubmit={handleCreateBlog}>
                            <div>
                                <label htmlFor="title">title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    name="title"
                                    onChange={({ target }) =>
                                        setTitle(target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="author">author</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={author}
                                    name="author"
                                    onChange={({ target }) =>
                                        setAuthor(target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="url">url</label>
                                <input
                                    type="url"
                                    id="url"
                                    value={url}
                                    name="url"
                                    onChange={({ target }) =>
                                        setUrl(target.value)
                                    }
                                />
                            </div>
                            <button type="submit">Create</button>
                        </form>
                    </div>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
