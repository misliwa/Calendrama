import API_BASE_URL from "./api.js";
import {ApiError} from "./ApiError.js";

export const checkPossibility = async (possibilityRequest) => {

    const response = await fetch(`${API_BASE_URL}/events/check-possibility`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(possibilityRequest)
        });
    const body = await response.json();

    if (!response.ok) {
        throw new ApiError(
            body.error?.message ?? "Wystąpił błąd API",
            response.status,
            body.error?.code
        );
    }

    return body;
};
