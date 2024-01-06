export const API_ENDPOINT_PATH =
    process.env.NODE_ENV === "production"
        ? "https://calm-parka-fawn.cyclic.app"
        : "http://localhost:3001";
console.log(process.env.NODE_ENV);
