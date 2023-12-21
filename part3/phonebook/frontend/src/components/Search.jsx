/* eslint-disable react/prop-types */

function Search({ searchTerm, filterChange }) {
    return (
        <div className="search">
            <label htmlFor="search">Filters shown with</label>
            <input
                type="search"
                name="search"
                id="search"
                value={searchTerm}
                onChange={filterChange}
                className="bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />
        </div>
    );
}

export default Search;
