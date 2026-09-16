import {createBasicCrudApi} from "./basicCrud.js";
import {ApiError} from "./ApiError.js";
import BASE_URL from "./api.js";

export const eventColumns = [
    {
        name: "id",
        getValue: event => event.id
    },
    {
        name: "Typ",
        getValue: event => event.type
    },
    {
        name: "Tytuł",
        getValue: event => event.title
    },
    {
        name: "Czas rozpoczęcia",
        getValue: event => event.start
    },
    {
        name: "Czas Zakończenia",
        getValue: event => event.end
    },
    {
        name: "Scena",
        getValue: event => event.stage
    },
    {
        name: "Spektakl",
        getValue: event => event.play
    },
    {
        name: "Opis",
        getValue: event => event.description
    }
];
const basicApi = createBasicCrudApi("events");

const updateAssignments = async (eventId, assignments) => {
    const response = await fetch(
        `${BASE_URL}/events/${eventId}/assignments`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assignments),
        }
    );

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

export const eventsApi = {
    ...basicApi,
    updateAssignments,
};