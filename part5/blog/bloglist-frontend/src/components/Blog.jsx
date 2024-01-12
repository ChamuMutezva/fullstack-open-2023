import { useState } from "react";

const Blog = ({ blog, update, deleteBlog, user }) => {
    const [hide, setHide] = useState(true);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };
    
    return (
        <div style={blogStyle} className={`disclosure`}>
            <h3>{blog.title}</h3>
            <div
                id="content"
                className={`disclosure__content ${hide ? "hide" : ""}`}
            >
                <p>{blog.author}</p>
                <p>{blog.url}</p>
                <div>
                    <span>Likes {blog.likes}</span>{" "}
                    <button onClick={update}>Like</button>
                </div>
                {(user === blog.user.username) && (
                    <button onClick={deleteBlog}>Delete</button>
                )}
            </div>
            <button
                aria-expanded="false"
                aria-controls="content"
                onClick={() => setHide(!hide)}
            >
                {hide ? "View" : "hide"}
            </button>
        </div>
    );
};

export default Blog;
