import API_BASE_URL from "./api.js";
import {ApiError} from "./ApiError.js";

export const stageColumns = [
    {
        name: "id",
        getValue: stage => stage.id
    },
    {
        name: "Nazwa",
        getValue: stage => stage.name
    },
    {
        name: "Opis",
        getValue: stage => stage.description
    },
];

export const addStage = async (stage) => {
    const response = await fetch(`${API_BASE_URL}/stages`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stage)
        });
    const body = await response.json();

    if (response.status !== 201) {
        throw new ApiError(
            body.error?.message ?? "Wystąpił błąd API",
            response.status,
            body.error?.code
        );
    }

    return body;
}

export const updateStage = async (id, stage) => {
    const response = await fetch(`${API_BASE_URL}/stages/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stage)
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
}

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