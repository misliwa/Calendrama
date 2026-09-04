import {createBasicCrudApi} from "./basicCrud.js";
import API_BASE_URL from "./api.js";
import {ApiError} from "./ApiError.js";
import {WebSocketAlias} from "vite";

export const unavailabilityColumns = [
    {
        name: "id",
        getValue: profession => profession.id
    },
    {
        name: "Nazwa",
        getValue: profession => profession.name
    }
];

export const unavailabilityApi = () => {
    const PARENT_URL = `employees`;
    const CHILD_URL = 'unavailability'

    const create = async (employeeId, item) => {
        const response = await fetch(`${PARENT_URL}/${employeeId}/${CHILD_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item)
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

    const updateById = async (parentId, id, item) => {
        const response = await fetch(`${PARENT_URL}/${parentId}/${CHILD_URL}${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item)
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

    const findAll = async (parentId) => {
        const response = await fetch(`${PARENT_URL}/${parentId}/${CHILD_URL}`);
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

    const deleteById = async (parentId, id) => {
        const response = await fetch(`${PARENT_URL}/${parentId}/${CHILD_URL}/${id}`,
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

    const getById = async (parentId, id) => {
        const response = await fetch(`${PARENT_URL}/${parentId}/${CHILD_URL}/${id}`);
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