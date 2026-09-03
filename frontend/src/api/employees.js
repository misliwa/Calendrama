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
        getValue: employee =>
            employee.professions
                .map(profession => profession.name)
                .join(", ")
    },
    {
        name: "Status",
        getValue: employee =>
            employee.employed
                ? "Etatowy"
                : "Gościnny"
    }
];

export const employeesApi = createBasicCrudApi("employees");