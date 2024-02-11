import { Emp } from './model.js'

//TODO: ถ้าเป็น "string" เรียงจาก A -> Z
//TODO: ถ้าเป็นวันเวลา เรียงจาก เวลามาก่อน -> วันเวลาที่มาทีหลัง

Emp.find()
  .sort('salary')
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.salary)
    // })
  })

//TODO: ถ้าเป็นแบบตรงกันข้าม (มากไปน้อย) วางเครื่องหมาย - ไว้หน้าชื่อ field
Emp.find()
  .sort('-birthday')
  .exec()
  .then((docs) => {
    // docs.map((d) => {
    //   console.log(d.name, d.birthday)
    // })
  })

//TODO: แบบจัดเรียงลำดับมากกว่า 1 field
Emp.find()
  .sort('-birthday salary')
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary, d.birthday)
    })
  })
