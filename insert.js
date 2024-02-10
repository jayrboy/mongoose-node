import { Emp } from './model.js'

save()

function save() {
  let doc1 = {
    name: 'James Bond',
    salary: 30000,
    birthday: new Date(1990, 9, 30),
    married: true,
    phones: ['081566XXXX', '02976XXXX'],
  }

  new Emp(doc1)
    .save()
    .then(() => {
      console.log('doc1 saved')
      create()
    })
    .catch((err) => console.log(err))
}

function create() {
  let doc2 = {
    name: 'Flint Stone',
    salary: 25000,
    birthday: new Date(1995, 12, 31),
    married: false,
    phones: ['085988XXXX'],
  }

  new Emp(doc2)
    .save()
    .then(() => {
      console.log('doc2 saved')
      insertMany()
    })
    .catch((err) => console.log(err))
}

function insertMany() {
  let docs = [
    {
      name: 'Tom Jerry',
      salary: 23000,
      birthday: new Date(1997, 10, 10),
      married: true,
      phones: [],
    },
    {
      name: 'Harry Potter',
      salary: 20000,
      birthday: new Date(1998, 2, 14),
      married: false,
      phones: [],
    },
  ]

  Emp.insertMany(docs)
    .then(() => {
      console.log('docs inserted')
    })
    .catch((err) => console.log(err))
}
