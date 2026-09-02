import {createBasicCrudApi} from "./basicCrud.js";

export const employeeColumns = [
    {
        name: "id",
        getValue: employee => employee.id
    },
    {
        name: "Imię",
        getValue: employee => employee.firstName
    },
    {
        name: "Nazwisko",
        getValue: employee => employee.lastName
    },
    {
        name: "Zawody",
        getValue: employee => employee.professions
    },
    {
        name: "Pracownik etetowy",
        getValue: employee => employee.employed
    }
];

export const employeesApi = createBasicCrudApi("employees");