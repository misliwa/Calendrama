import API_BASE_URL from "./api.js";
import {ApiError} from "./ApiError.js";

const RESOURCE_API_URL = `${API_BASE_URL}/professions`;

export const columns = [
    {
        name: "id",
        getValue: profession => profession.id
    },
    {
        name: "Nazwa",
        getValue: profession => profession.name
    }
];

export const create = async (profession) => {
    const response = await fetch(`${RESOURCE_API_URL}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profession)
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

export const updateById = async (id, profession) => {
    const response = await fetch(`${RESOURCE_API_URL}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profession)
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

export const findAll = async () => {
    const response = await fetch(`${RESOURCE_API_URL}`);
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

export const deleteById = async (id) => {
    const response = await fetch(`${RESOURCE_API_URL}/${id}`,
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