import DataTable from "../components/DataTable.jsx";
import PageLayout from "../components/PageLayout.jsx";
import "../css/Employees.css";
import SearchBar from "../components/SearchBar.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {employeesApi, employeeColumns} from "../api/employees.js";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import EmployeeModal from "../components/EmployeeModal.jsx";
import {professionsApi} from "../api/professions.js";
import MantineDataTable from "../components/MantineDataTable.jsx";
import {Box} from "@mantine/core";
import AddUnavailabilityModal from "../components/AddUnavailabilityModal.jsx";
import {unavailabilityApi} from "../api/unavailability.js";
import {useCrudParentChildModal} from "../hooks/useCrudParentChildModal.jsx";
import {useParentChildCrud} from "../hooks/useParentChildCrud.jsx";

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

    const {
        createItem: createUnavailability,
    } = useParentChildCrud(unavailabilityApi());

    const {
        opened: unavailabilityModalOpened,
        openCreateModal: openAddUnavailabilityModal,
        itemParent: unavailableEmployee,
        closeModal: closeUnavailabilityModal
    } = useCrudParentChildModal();

    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            professions: values.professions.map(Number)
        };

        try {
            if (editedEmployee) {
                console.log(payload);
                await updateItem(editedEmployee.id, payload);
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

    const handleUnavailabilitySubmit = async (employeeId, values) => {
       await createUnavailability(employeeId, values);
       closeUnavailabilityModal();
    }

    const addUnavailabilityButton = {
        name: "addUnavailabilityButton",
        text: "Dodaj zajętość",
        handleClick: (unavailableEmployee) => {
            openAddUnavailabilityModal(unavailableEmployee);
        }
    }

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
                    columns={employeeColumns}
                    data={employees}
                    onAdd={openCreateModal}
                    onEdit={openEditModal}
                    onDelete={deleteItem}
                    onDeleteSelected={deleteSelectedItems}
                    additionalButtons={[addUnavailabilityButton]}
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

            <AddUnavailabilityModal
                opened={unavailabilityModalOpened}
                onClose={closeUnavailabilityModal}
                onSubmit={handleUnavailabilitySubmit}
                employee={unavailableEmployee}
            />
        </Box>
    )
}

export default Employees;