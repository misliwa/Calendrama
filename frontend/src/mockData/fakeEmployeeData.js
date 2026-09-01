const fakeEmployeeData = {
   columns: [
       {
           name: "id",
           getValue: employee => employee.name
       },
       {
           name: "Nazwisko",
           getValue: employee => employee.professionName
       },
       {
           name: "Zawód",
           getValue: employee => employee.professionName
       },
       {
           name: "Zatrudnienie",
           getValue: employee => employee.contractType
       },
   ],

    data: [
        {
            id: 1,
            name: "Jan Paweł Adamczewski",
            professionName: "actor",
            contractType: "employment",
        },
        {
            id: 2,
            name: "Andrzej Kowalski",
            professionName: "actor",
            contractType: "guest",
        },
        {
            id: 3,
            name: "Mirosław Nowak",
            professionName: "crew",
            contractType: "employment",
        },
        {
            id: 4,
            name: "Marek Wiśniewski",
            professionName: "crew",
            contractType: "employment",
        },
        {
            id: 5,
            name: "Mirosław Aktorski",
            professionName: "actor",
            contractType: "employment",
        },
        {
            id: 6,
            name: "Tomasz Zieliński",
            professionName: "director",
            contractType: "employment",
        },
        {
            id: 7,
            name: "Piotr Lewandowski",
            professionName: "crew",
            contractType: "guest",
        },
        {
            id: 8,
            name: "Katarzyna Malinowska",
            professionName: "actor",
            contractType: "employment",
        },
        {
            id: 9,
            name: "Anna Dąbrowska",
            professionName: "makeup",
            contractType: "employment",
        },
        {
            id: 10,
            name: "Monika Król",
            professionName: "costume",
            contractType: "guest",
        },
        {
            id: 11,
            name: "Łukasz Krawczyk",
            professionName: "crew",
            contractType: "employment",
        },
        {
            id: 12,
            name: "Paweł Wójcik",
            professionName: "actor",
            contractType: "guest",
        },
        {
            id: 13,
            name: "Dorota Pawlak",
            professionName: "director",
            contractType: "employment",
        },
        {
            id: 14,
            name: "Natalia Michalak",
            professionName: "makeup",
            contractType: "employment",
        },
        {
            id: 15,
            name: "Damian Zając",
            professionName: "crew",
            contractType: "employment",
        },
        {
            id: 16,
            name: "Karolina Jabłońska",
            professionName: "actor",
            contractType: "guest",
        },
        {
            id: 17,
            name: "Michał Szymański",
            professionName: "sound",
            contractType: "employment",
        },
        {
            id: 18,
            name: "Aleksandra Kaczmarek",
            professionName: "costume",
            contractType: "employment",
        },
        {
            id: 19,
            name: "Robert Wojciechowski",
            professionName: "crew",
            contractType: "guest",
        },
        {
            id: 20,
            name: "Ewa Kamińska",
            professionName: "actor",
            contractType: "employment",
        }
    ]
}

export default fakeEmployeeData;