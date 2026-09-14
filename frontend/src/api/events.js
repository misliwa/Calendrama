import {createBasicCrudApi} from "./basicCrud.js";

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

export const eventsApi = createBasicCrudApi("events");