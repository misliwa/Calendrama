import API_BASE_URL from "./api.js";
import {ApiError} from "./ApiError.js";

export const createBasicCrudApi = (resourcePath) => {
    const RESOURCE_API_URL = `${API_BASE_URL}/${resourcePath}`;

    const create = async (stage) => {
        const response = await fetch(`${RESOURCE_API_URL}`,
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
    };

    const updateById = async (id, stage) => {
        const response = await fetch(`${RESOURCE_API_URL}/${id}`,
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
    };

    const findAll = async () => {
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
    };

    const deleteById = async (id) => {
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
    };

    const getById = async (id) => {
        const response = await fetch(`${RESOURCE_API_URL}/${id}`);
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

    return {
        create,
        updateById,
        findAll,
        deleteById,
        getById
    };
}