import {ApiError} from "./ApiError.js";
import API_BASE_URL from "./api.js";


export const staffingColumns = [
    {
        name: "id",
        getValue: staffing => staffing.id
    },
    {
        name: "Zawód",
        getValue: staffing => staffing.profession
    },
    {
        name: "Nazwa roli",
        getValue: staffing => staffing.roleName
    },
];

export const playStaffingsApi  = {
    findAllById: async (playId) => {
        const response = await fetch(`${API_BASE_URL}/plays/${playId}/staffings`);
        const body = await response.json();

        if (!response.ok) {
            throw new ApiError(
                body.error?.message ?? "Wystąpił błąd API",
                response.status,
                body.error?.code
            );
        }

        return body;
    }
};