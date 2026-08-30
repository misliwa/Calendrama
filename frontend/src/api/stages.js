import BASE_URL from "./api.js";
import {ApiError} from "./ApiError.js";

export const getStages = async () => {
    const response = await fetch(`${BASE_URL}/stages`);
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