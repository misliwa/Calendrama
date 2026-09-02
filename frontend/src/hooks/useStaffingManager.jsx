import {useState} from "react";


export function useStaffingManager() {
    const [staffingData, setStaffingData] = useState([]);

    const updateStaffing = (staffingToUpdate, newValues) => {
        setStaffingData(previous => previous
            .map(staffing =>
                staffing.clientId === staffingToUpdate.clientId ?
                    {...staffing, ...newValues}
                    : staffing
            ))
    }

    const addStaffing = (newValues) => {
        setStaffingData(prev => [
            ...prev,
            {
                ...newValues,
                id: null,
                clientId: crypto.randomUUID()
            }
        ]);
    }


    const deleteStaffing = (staffingToDelete) =>
        setStaffingData(prev =>
            prev.filter(
                staffing =>
                    staffing.clientId !== staffingToDelete.clientId
            )
        );

    return {
        staffingData,
        setStaffingData,
        addStaffing,
        updateStaffing,
        deleteStaffing
    }
}
