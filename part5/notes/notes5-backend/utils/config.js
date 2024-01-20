require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
    process.env.NODE_ENV.trim("") === "test"
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI;

console.log(MONGODB_URI);
console.log(typeof process.env.NODE_ENV, process.env.NODE_ENV);
console.log(process.env.NODE_ENV.trim("") === "test");
console.log(
    `length of process.env.NODE_ENV, ${process.env.NODE_ENV.trim("").length}`
);

module.exports = {
    MONGODB_URI,
    PORT,
};
