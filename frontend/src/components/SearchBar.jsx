function SearchBar(){
    return (
        <form>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    name="surname"
                    placeholder="Wpisz wyszukiwaną frazę"/>

                <button className="btn btn-primary" type="submit">
                    Wyszukaj
                </button>
            </div>
        </form>

    );
}

export default SearchBar;