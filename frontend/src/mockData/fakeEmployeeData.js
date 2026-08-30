const fakeEmployeeData = {
   columns: [
       {
           name: "id",
           getValue: employee => employee.name
       },
       {
           name: "Nazwisko",
           getValue: employee => employee.profession
       },
       {
           name: "Zawód",
           getValue: employee => employee.profession
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
            profession: "actor",
            contractType: "employment",
        },
        {
            id: 2,
            name: "Andrzej Kowalski",
            profession: "actor",
            contractType: "guest",
        },
        {
            id: 3,
            name: "Mirosław Nowak",
            profession: "crew",
            contractType: "employment",
        },
        {
            id: 4,
            name: "Marek Wiśniewski",
            profession: "crew",
            contractType: "employment",
        },
        {
            id: 5,
            name: "Mirosław Aktorski",
            profession: "actor",
            contractType: "employment",
        },
        {
            id: 6,
            name: "Tomasz Zieliński",
            profession: "director",
            contractType: "employment",
        },
        {
            id: 7,
            name: "Piotr Lewandowski",
            profession: "crew",
            contractType: "guest",
        },
        {
            id: 8,
            name: "Katarzyna Malinowska",
            profession: "actor",
            contractType: "employment",
        },
        {
            id: 9,
            name: "Anna Dąbrowska",
            profession: "makeup",
            contractType: "employment",
        },
        {
            id: 10,
            name: "Monika Król",
            profession: "costume",
            contractType: "guest",
        },
        {
            id: 11,
            name: "Łukasz Krawczyk",
            profession: "crew",
            contractType: "employment",
        },
        {
            id: 12,
            name: "Paweł Wójcik",
            profession: "actor",
            contractType: "guest",
        },
        {
            id: 13,
            name: "Dorota Pawlak",
            profession: "director",
            contractType: "employment",
        },
        {
            id: 14,
            name: "Natalia Michalak",
            profession: "makeup",
            contractType: "employment",
        },
        {
            id: 15,
            name: "Damian Zając",
            profession: "crew",
            contractType: "employment",
        },
        {
            id: 16,
            name: "Karolina Jabłońska",
            profession: "actor",
            contractType: "guest",
        },
        {
            id: 17,
            name: "Michał Szymański",
            profession: "sound",
            contractType: "employment",
        },
        {
            id: 18,
            name: "Aleksandra Kaczmarek",
            profession: "costume",
            contractType: "employment",
        },
        {
            id: 19,
            name: "Robert Wojciechowski",
            profession: "crew",
            contractType: "guest",
        },
        {
            id: 20,
            name: "Ewa Kamińska",
            profession: "actor",
            contractType: "employment",
        }
    ]
}

export default fakeEmployeeData;