require("dotenv").config();
const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
};

blogRouter.get("/", (request, response) => {
    response.send(`<h1>Blog</h1>`);
});

blogRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
        id: 1,
    });
    console.log(blogs);
    response.json(blogs);
});

blogRouter.put("/api/blogs/:id", (request, response, next) => {
    const body = request.body;

    const blog = {
        likes: body.likes,
    };

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then((updatedBlog) => {
            response.json(updatedBlog);
        })
        .catch((error) => next(error));
});

blogRouter.delete(`/api/blogs/:id`, async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogRouter.post("/api/blogs", async (request, response) => {
    const { title, url, likes, author } = request.body;

    if (!title) {
        return response.status(400).json({ error: "Title is missing" });
    }

    if (!url) {
        return response.status(400).json({ error: "url is missing" });
    }

    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    // const blog = new Blog(request.body);
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

module.exports = blogRouter;
