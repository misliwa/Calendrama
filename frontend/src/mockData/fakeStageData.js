const fakeStageData = {
   columns: [
       {
           name: "id",
           getValue: stage => stage.name
       },
       {
           name: "Nazwa",
           getValue: stage => stage.name
       },
       {
           name: "Opis",
           getValue: stage => stage.description
       },

   ],

    data: [
        {
            id: 1,
            name: "Duża Scena",
            description: "Największa w teatrze",
        },
        {
            id: 2,
            name: "Scena Kameralna",
            description: "Mniejsza",
        }
    ]
}

export default fakeStageData;