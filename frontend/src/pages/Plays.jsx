import PageLayout from "../components/PageLayout.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {playsApi, playColumns} from "../api/plays.js";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {useNavigate} from "react-router-dom";
import {Box} from "@mantine/core";
import MantineDataTable from "../components/MantineDataTable.jsx";

function Plays(){
    const {
        items: plays,
        error,
        loading,
        deleteItem,
        deleteSelectedItems
    } = useCrud(playsApi);

    const navigate = useNavigate();

    return (
        <Box h="100%" style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            {error &&
                <div className="alert alert-danger">
                    {error.message}
                </div>
            }
            {loading ? (
                <div>Loading...</div>
            ) : (
                <MantineDataTable
                    columns={playColumns}
                    data={plays}
                    onAdd={() => navigate('/plays/new')}
                    onEdit={(play) =>
                        navigate(`/plays/${play.id}/edit`)
                    }
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                />
            )}
        </Box>
    );
}

export default Plays;