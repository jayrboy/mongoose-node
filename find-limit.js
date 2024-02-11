import { Emp } from './model.js'

//TODO: ระบุจำนวนรายการผลลัพธ์ (document) ที่ต้องการ
Emp.find()
  .sort('-salary') // มากไปหาน้อย
  .limit(3)
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary)
    })
  })
