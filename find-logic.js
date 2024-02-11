import { Emp } from './model.js'

//TODO: AND (salary <= 25000) && (married == true)
Emp.find()
  .where('salary')
  .lte(25000)
  .and({ married: { $eq: true } })
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.salary, d.married)
    // })
  })
  .catch((err) => console.log(err))

//TODO: OR (salary >= 30000) || (birthday <= '1980-12-31')
Emp.find({ salary: { $gte: 30000 } })
  .or({ birthday: { $lte: new Date(1980, 12, 31) } })
  .exec()
  .then((docs) => {
    // if (docs < new Date(1980, 12, 31)) {
    //   console.log(`ไม่มีใครเกิด น้อยกว่า 31 ธ.ค. ${1980 + 543}`)
    // }
    // docs.forEach((d) => {
    //   console.log(d.name, d.salary, d.birthday)
    // })
  })
  .catch((err) => console.log(err))

//TODO: NOR !(salary >= 30000) && !(married == true)
Emp.find()
  .nor([{ salary: { $gte: 25000 }, marriage: true }])
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary, d.married)
    })
  })
  .catch((err) => console.log(err))
