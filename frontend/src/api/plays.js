import {createBasicCrudApi} from "./basicCrud.js";

export const playColumns = [
    {
        name: "id",
        getValue: play => play.id
    },
    {
        name: "Tytuł",
        getValue: play => play.title
    },
    {
        name: "Opis",
        getValue: play => play.description
    },
    {
        name: "Data Premiery",
        getValue: play => play.premiereDate
    },
    {
        name: "Czas trwania (m)",
        getValue: play => play.durationInMinutes
    },
    {
        name: "Scena",
        getValue: play => play.stageName
    }
];

export const playsApi = createBasicCrudApi("plays");