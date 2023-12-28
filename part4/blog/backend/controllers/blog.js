const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
    response.send(`<h1>Blog</h1>`);
});

blogRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
    /* Blog.find({}).then((blogs) => {
        response.json(blogs);
    });*/
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

blogRouter.post("/api/blogs", (request, response) => {
    const { title, url } = request.body;

    if (!title) {
        return response.status(400).json({ error: "Title is missing" });
    }

    if (!url) {
        return response.status(400).json({ error: "url is missing" });
    }

    const blog = new Blog(request.body);

    blog.save().then((result) => {
        response.status(201).json(result);
    });
});

module.exports = blogRouter;
