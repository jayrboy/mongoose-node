import { Emp } from './model.js'

//TODO: แบบที่ (1) อ่านข้อมูล name ที่มี salary มากกว่าหรือเท่ากับ 25000
Emp.find()
  .select('name salary')
  .where('salary')
  .gte(25000) // salary >= 25000
  .exec()
  .then((docs) => {
    //* แบบที่ 1
    // for (let i = 0; i < docs.length; i++) {
    //   console.log(docs[i].name, docs[i].salary)
    // }
    //* แบบที่ 2
    // docs.forEach((d) => {
    //   console.log(d.name, d.salary)
    // })
    //* แบบที่ 3
    // docs.map((d) => {
    //   console.log(d.name, d.salary)
    // })
  })
  .catch((e) => console.log(e))

//TODO: แบบที่ (2) หรือเปรียบเทียบมากกว่า 1 เงื่อนไข
Emp.find()
  .where('salary')
  .gte(25000)
  .lte(30000) // salary 25000 - 30000
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.salary)
    // })
  })
  .catch((e) => console.log(e))

//TODO: เปรียบเทียบมากกว่า 1 field ระบุ where() แยกกัน
Emp.find()
  .where('salary')
  .gte(25000) // salary >= 25000
  .where('married')
  .equals(true) // married = true
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.salary)
    // })
  })
  .catch((e) => console.log(e))

//TODO: อ่านข้อมูล birthday ที่น้อยกว่า ในเวลาที่กำหนดตาม ปี/เดือน/วัน
Emp.find()
  .where('birthday')
  .lt(new Date(1980, 1, 1)) // birthday < new Date(1980, 1, 1)
  .exec()
  .then((docs) => {
    // if (docs < new Date(1980, 1, 1)) {
    //   console.log(`ไม่มีใครเกิด น้อยกว่า 1 ม.ค. ${1980 + 543}`)
    // }
    // docs.forEach((d) => {
    //   console.log(d.name, d.birthday)
    // })
  })
  .catch((e) => console.log(e))

//TODO: อ่านข้อมูล name เฉพาะเจาะจง
Emp.find()
  .where('name')
  .in(['Tom Jerry', 'Flint Stone'])
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary, d.birthday, d.married, d.phones)
    })
  })
  .catch((e) => console.log(e))
