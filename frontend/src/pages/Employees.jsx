import "../css/Employees.css";
import {useCrud} from "../hooks/useCrud.jsx";
import {employeesApi, employeeColumns} from "../api/employees.js";
import {useCrudModal} from "../hooks/useCrudModal.jsx";
import EmployeeModal from "../components/EmployeeModal.jsx";
import {professionsApi} from "../api/professions.js";
import MantineDataTable from "../components/MantineDataTable.jsx";
import {Box, Drawer} from "@mantine/core";
import UnavailabilityModal from "../components/UnavailabilityModal.jsx";
import {unavailabilityApi, unavailabilityColumns} from "../api/unavailability.js";
import {useCrudParentChildModal} from "../hooks/useCrudParentChildModal.jsx";
import {useParentChildCrud} from "../hooks/useParentChildCrud.jsx";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";

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
        updateItem: updateUnavailability,
        items: employeesUnavailabilities,
        load: loadUnavailabilities,
        deleteItem: deleteUnavailability,
        deleteSelectedItems: deleteSelectedUnavailabilities,
        error: unavailabilityError,
        loading: unavailabilityLoading,
        clearError: clearUnavailabilityError
    } = useParentChildCrud(unavailabilityApi());

    const {
        opened: unavailabilityModalOpened,
        openCreateModal: openAddUnavailabilityModal,
        openEditModal: openEditUnavailabilityModal,
        itemParent: unavailableEmployee,
        editedItem: editedUnavailability,
        closeModal: closeUnavailabilityModal,
    } = useCrudParentChildModal();

    const [drawerOpened, {open: openDrawer, close: closeDrawer}] = useDisclosure(false);
    const [employeeInDrawer, setEmployeeInDrawer] = useState(null);

    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            professions: values.professions.map(Number)
        };

        try {
            if (editedEmployee) {
                await updateItem(editedEmployee.id, payload);
                closeModal();
            } else {
                await createItem(payload);
                closeModal();
            }
        } catch (error) {
            console.error('Nie udało się zapisać pracownika:', error);
        }
    };

    const handleOpenAddUnavailabilityModal = () => {
        clearUnavailabilityError();
        openAddUnavailabilityModal(employeeInDrawer);
    };

    const handleOpenEditUnavailabilityModal = (unavailability) => {
        clearUnavailabilityError();
        openEditUnavailabilityModal(
            employeeInDrawer,
            unavailability
        );
    };

    const handleCloseUnavailabilityModal = () => {
        clearUnavailabilityError();
        closeUnavailabilityModal();
    };

    const handleUnavailabilitySubmit = async (employeeId, values) => {
        try {
            if (editedUnavailability) {
                await updateUnavailability(
                    employeeId,
                    editedUnavailability.id,
                    values
                );
            } else {
                await createUnavailability(employeeId, values);
            }

            handleCloseUnavailabilityModal();
        } catch (error) {
            console.error("Nie udało się zapisać niedostępności:", error);
        }
    };

    const openDrawerButton = {
        name: "openDrawerButtony",
        text: "Zajętości",
        handleClick: (employee) => {
            loadUnavailabilities(employee.id)
            setEmployeeInDrawer(employee)
            openDrawer();
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
                    additionalButtons={[openDrawerButton]}
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

            <Drawer
                offset={8}
                radius="md"
                opened={drawerOpened}
                onClose={closeDrawer}
                size="xl"
                title={`Zajętości ${employeeInDrawer?.firstName} ${employeeInDrawer?.lastName}`}
            >
                <MantineDataTable
                    columns={unavailabilityColumns}
                    data={employeesUnavailabilities}
                    onAdd={() => handleOpenAddUnavailabilityModal(employeeInDrawer)}
                    onEdit={handleOpenEditUnavailabilityModal}
                    onDelete={(unavailabilityId) => deleteUnavailability(employeeInDrawer.id, unavailabilityId)}
                    onDeleteSelected={(unavailabilityIds) => deleteSelectedUnavailabilities(employeeInDrawer.id, unavailabilityIds)}
                />

            </Drawer>
            <UnavailabilityModal
                opened={unavailabilityModalOpened}
                onClose={handleCloseUnavailabilityModal}
                onSubmit={handleUnavailabilitySubmit}
                employee={unavailableEmployee}
                editedUnavailability={editedUnavailability}
                error={unavailabilityError}
            />
        </Box>
    )
}

export default Employees;