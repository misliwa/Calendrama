function EmployeeSearchBar(){
    return (
        <form>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    name="surname"
                    placeholder="Nazwisko pracownika"/>

                <button className="btn btn-primary" type="submit">
                    Wyszukaj
                </button>
            </div>
        </form>

    );
}

export default EmployeeSearchBar;