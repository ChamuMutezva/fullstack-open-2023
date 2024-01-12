import React from "react";

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => (
    <form onSubmit={handleSubmit}>
        <h2>Login to application</h2>
        <div>
            <label htmlFor="username">username</label>
            <input
                type="text"
                id="username"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
            />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input
                type="password"
                id="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">login</button>
    </form>
);

export default LoginForm;
