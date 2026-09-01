import {createBasicCrudApi} from "./basicCrud.js";

export const stagesColumns = [
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

export const stagesApi = createBasicCrudApi("stages");