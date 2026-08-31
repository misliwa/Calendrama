import {createBasicCrudApi} from "./basicCrud.js";

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

export const {
    create,
    updateById,
    findAll,
    deleteById
} = createBasicCrudApi("professions");