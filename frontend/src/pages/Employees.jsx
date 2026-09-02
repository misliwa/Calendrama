import DataTable from "../components/DataTable.jsx";
import PageLayout from "../components/PageLayout.jsx";
import "../css/Employees.css";
import SearchBar from "../components/SearchBar.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {employeesApi, employeeColumns} from "../api/employees.js";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import EmployeeModal from "../components/EmployeeModal.jsx";
import {professionsApi} from "../api/professions.js";

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
        items: professions,
    } = useCrud(professionsApi);

    const {
        opened,
        editedItem: editedEmployee,
        openCreateModal,
        openEditModal,
        closeModal
    } = useCrudModal();


    const handleModalSubmit = async (values) => {
        if (editedEmployee) {
            await updateItem(editedEmployee.id, values);
        } else {
            await createItem(values);
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
                onSubmit={handleModalSubmit}
                employeeToEdit={editedEmployee}
                professions={professions}
            />
        </PageLayout>
    )
}

export default Employees;