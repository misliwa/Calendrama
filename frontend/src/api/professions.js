import {createBasicCrudApi} from "./basicCrud.js";

export const professionColumns = [
    {
        name: "id",
        getValue: profession => profession.id
    },
    {
        name: "Nazwa",
        getValue: profession => profession.name
    }
];

export const professionsApi = createBasicCrudApi("professions");