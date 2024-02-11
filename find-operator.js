import { Emp } from './model.js'

//TODO: อ่านข้อมูล find() salary มากกว่าหรือเท่ากับ 30000
Emp.find({ salary: { $gte: 30000 } }) // salary >= 30000
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.salary)
    // })
  })
  .catch((err) => console.log(err))

//TODO: อ่านข้อมูล where() salary มากกว่าหรือเท่ากับ 30000
Emp.find()
  .where({ salary: { $gte: 30000 } }) // salary >= 30000
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.salary)
    // })
  })
  .catch((err) => console.log(err))

//TODO: อ่านข้อมูล salary ค่าที่มากกว่าหรือเท่ากับ 25000 ถึง ค่าที่น้อยกว่าหรือเท่ากับ 30000
Emp.find()
  .where({ salary: { $gte: 25000, $lte: 30000 } }) // salary 25000 - 30000
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.salary)
    // })
  })
  .catch((err) => console.log(err))

//TODO: อ่านข้อมูล เฉพาะเจาะจงตามที่กำหนด
Emp.find({ name: { $in: ['Tom Jerry', 'Teddy Beer'] } })
  .exec()
  .then((docs) => {
    console.log(docs)
  })
  .catch((err) => console.log(err))
