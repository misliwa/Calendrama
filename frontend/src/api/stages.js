import {createBasicCrudApi} from "./basicCrud.js";

export const columns = [
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

export const {
    create,
    updateById,
    findAll,
    deleteById
} = createBasicCrudApi("stages");