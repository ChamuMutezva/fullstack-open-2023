import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import loginService from "./services/login";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
        };

        noteService.create(noteObject).then((returnedNote) => {
            setNotes(notes.concat(returnedNote));
            setNewNote("");
        });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };
        console.log(note);
        noteService
            .update(id, changedNote)
            .then((returnedNote) => {
                setNotes(
                    notes.map((note) =>
                        Number(note.id) !== Number(id) ? note : returnedNote
                    )
                );
            })
            .catch((error) => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
        //  console.log(changedNote);
    };

    console.log(user);

    const logout = () => {
        console.log("log out");
        setUser(null)
       return window.localStorage.removeItem('loggedNoteappUser')
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
                "loggedNoteappUser",
                JSON.stringify(user)
            );

            noteService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
            console.log(user.token);
        } catch (exception) {
            setErrorMessage(exception.message);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>           
            <button type="submit">login</button>
        </form>
    );

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type="submit">save</button>
        </form>
    );

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);
    // console.log(notesToShow);
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.username} logged in</p>
                    {noteForm()}
                </div>
            )}
             {user &&
            <button type="button" onClick={logout}>
                Logout{" "}
            </button>
            }
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {notesToShow?.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    );
};

export default App;
