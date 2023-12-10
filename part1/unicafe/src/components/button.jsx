// eslint-disable-next-line react/prop-types
function Button({ onClick, label }) {
    return (
        <button
            onClick={onClick}
            className="shadow-lg rounded-lg block p-2 bg-slate-950 text-white min-w-[5rem]"
        >
            {label}
        </button>
    );
}

export default Button;
