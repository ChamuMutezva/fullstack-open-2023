const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : blogs.length / blogs.length;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes;
    }, 0);
};

const mostLikedBlog = (blogs) => {
    return blogs.find(
        (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
    );
};

const mostLikes = (blogs) => {
    const result = blogs.find(
        (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
    );
    return {
        author: result.author,
        likes: result.likes,
    };
};

const mostBlogs = (blogs) => {
    const authorBlogs = blogs.reduce((op, { author }) => {
        op[author] = op[author] || 0;
        op[author]++;
        return op;
    }, {});
    const mostBlogsAuthor = Object.keys(authorBlogs).reduce((a, b) =>
        authorBlogs[a] > authorBlogs[b] ? a : b
    );
    return { author: mostBlogsAuthor, blogs: authorBlogs[mostBlogsAuthor] };
};

module.exports = {
    dummy,
    totalLikes,
    mostLikedBlog,
    mostBlogs,
    mostLikes,
};
