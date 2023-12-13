/* eslint-disable react/prop-types */

function AddPerson({ handleSubmit, onChange, phone, name }) {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="input-container">
                <label htmlFor="name">name:</label>
                <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
            </div>
            <div className="input-container">
                <label htmlFor="name">Phone Number:</label>
                <input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    className="bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="rounded-lg bg-slate-900 text-white p-2 min-w-[8rem]"
                >
                    add
                </button>
            </div>
        </form>
    );
}

export default AddPerson;
