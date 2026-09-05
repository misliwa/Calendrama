import {ApiError} from "./ApiError.js";
import dayjs from "dayjs";

export const unavailabilityColumns = [
    {
        name: "id",
        getValue: unavailability => unavailability.id
    },
    {
        name: "Od:",
        getValue: unavailability => dayjs(unavailability.startDateTime).format("DD.MM.YYYY HH:mm")
    },
    {
        name: "Do:",
        getValue: unavailability => dayjs(unavailability.endDateTime).format("DD.MM.YYYY HH:mm")
    },
    {
        name: "Opis:",
        getValue: unavailability => unavailability.description
    }
];

export const unavailabilityApi = () => {
    const PARENT_URL = "http://localhost:8080/employees";
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
        const response = await fetch(`${PARENT_URL}/${parentId}/${CHILD_URL}/${id}`,
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