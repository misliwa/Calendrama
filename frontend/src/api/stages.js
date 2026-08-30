import API_BASE_URL from "./api.js";
import {ApiError} from "./ApiError.js";

export const getStages = async () => {
    const response = await fetch(`${API_BASE_URL}/stages`);
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

export const deleteStage = async (id) => {
    const response = await fetch(`${API_BASE_URL}/stages/${id}`,
        {method: "DELETE"});

    if (!response.ok) {
        const body = await response.json();
        throw new ApiError(
            body.error?.message ?? "Wystąpił błąd API",
            response.status,
            body.error?.code
        );
    }
}