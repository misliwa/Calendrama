import PageLayout from "../components/PageLayout.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import * as api from "../api/plays.js";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {useNavigate} from "react-router-dom";

function Plays(){
    const {
        items: plays,
        error,
        loading,
        deleteItem,
        deleteSelectedItems
    } = useCrud(api);
    q
    const navigate = useNavigate();

    return (
        <PageLayout title="Spektakle">
            <SearchBar/>
            {error &&
                <div className="alert alert-danger">
                    {error.message}
                </div>
            }
            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataTable
                    columns={api.columns}
                    data={plays}
                    onAdd={() => navigate('/plays/new')}
                    onEdit={(play) =>
                        navigate(`/plays/${play.id}/edit`)
                    }
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                />
            )}
        </PageLayout>
    );
}

export default Plays;