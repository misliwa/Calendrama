import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {professionsApi, professionColumns} from "../api/professions.js";
import ProfessionModal from "../components/ProfessionModal.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {useCrudModal} from "../hooks/useCrudModal.jsx";

function Professions() {
    const {
        items: professions,
        error,
        loading,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems
    } = useCrud(professionsApi);

    const {
        opened,
        editedItem: editedProfession,
        openCreateModal,
        openEditModal,
        closeModal
    } = useCrudModal();


    const handleModalSubmit = async (values) => {
        if (editedProfession) {
            await updateItem(editedProfession.id, values);
        } else {
            await createItem(values);
        }
    };

    return (
        <PageLayout title="Zawody">
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
                    columns={professionColumns}
                    data={professions}
                    onAdd={openCreateModal}
                    onEdit={openEditModal}
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                />
            )}
            <ProfessionModal
                opened={opened}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                professionToEdit={editedProfession}
            />

        </PageLayout>
    );
}

export default Professions;