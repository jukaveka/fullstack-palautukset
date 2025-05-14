const listOfTestUsers =
  [
    {
      username: "Testimies",
      name: "Mies",
      passwordHash: "Testimiehensalasana"
    },
    {
      username: "Testinainen",
      name: "Nainen",
      passwordHash: "Testinaisensalasana"
    },
    {
      username: "Testimuu",
      name: "Muu",
      passwordHash: "Testimuunsalasana"
    }
  ]

const listOfLoginTestUsers = [
  {
    username: "Testimies",
    name: "Mies",
    password: "Testimiehensalasana"
  },
  {
    username: "Testinainen",
    name: "Nainen",
    password: "Testinaisensalasana"
  },
  {
    username: "Testimuu",
    name: "Muu",
    password: "Testimuunsalasana"
  }
]


module.exports = { 
  listOfTestUsers, 
  listOfLoginTestUsers 
}