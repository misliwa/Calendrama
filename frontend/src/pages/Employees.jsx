import DataTable from "../components/DataTable.jsx";
import PageLayout from "../components/PageLayout.jsx";
import "../css/Employees.css";
import SearchBar from "../components/SearchBar.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {employeesApi, employeeColumns} from "../api/employees.js";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import EmployeeModal from "../components/EmployeeModal.jsx";
import {professionsApi} from "../api/professions.js";
import {useEffect} from "react";

function Employees() {
    const {
        items: employees,
        error,
        loading,
        createItem,
        updateItem,
        deleteItem,
        deleteSelectedItems
    } = useCrud(employeesApi);

    const {
        items: availableProfessions,
        createItem: createProfession
    } = useCrud(professionsApi);

    const {
        opened,
        editedItem: editedEmployee,
        openCreateModal,
        openEditModal,
        closeModal
    } = useCrudModal();
    
    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            professions: values.professions.map(Number)
        };

        try {
            if (editedEmployee) {
                console.log(payload);
                await updateItem(editedPlayId, payload);
                closeModal();
            } else {
                console.log(payload);
                await createItem(payload);
                closeModal();
            }
        } catch (error) {
            console.error('Nie udało się zapisać pracownika:', error);
        }
    };

    return (
        <PageLayout title="Pracownicy Teatru">
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
                    columns={employeeColumns}
                    data={employees}
                    onAdd={openCreateModal}
                    onEdit={openEditModal}
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                />
            )}

            <EmployeeModal
                opened={opened}
                onClose={closeModal}
                onSubmit={handleSubmit}
                employeeToEdit={editedEmployee}
                professions={availableProfessions}
                createProfession={createProfession}
            />
        </PageLayout>
    )
}

export default Employees;