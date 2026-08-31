import PageLayout from "../components/PageLayout.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import * as api from "../api/plays.js";
import * as stagesApi from "../api/stages.js";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import PlayModal from "../components/PlayModal.jsx";

function Plays(){
    const {
        items: plays,
        error,
        loading,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems
    } = useCrud(api);

    const {
        opened,
        editedItem: editedPlay,
        openCreateModal,
        openEditModal,
        closeModal
    } = useCrudModal();

    const {
        items: stages
    } = useCrud(stagesApi)


    const handleModalSubmit = async (values) => {
        if (editedPlay) {
            await updateItem(editedPlay.id, values);
        } else {
            await createItem(values);
        }
    };
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
                    onAdd={openCreateModal}
                    onEdit={openEditModal}
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                />
            )}
            <PlayModal
                opened={opened}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                playToEdit={editedPlay}
                stages={stages}
            />
        </PageLayout>
    );
}

export default Plays;