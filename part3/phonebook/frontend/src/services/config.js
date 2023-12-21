export const API_ENDPOINT_PATH =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production"
        ? "https://lazy-ruby-jay-cap.cyclic.app"
        : "http://localhost:3001";
// eslint-disable-next-line no-undef
console.log(process.env.NODE_ENV);