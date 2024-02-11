import { Emp } from './model.js'

Emp.find({ name: { $regex: /^T/, $options: 'i' } }) // ขึ้นต้นด้วย T หรือ t
  .exec()
//   .then((docs) => console.log(docs))

Emp.find()
  .where('name')
  .equals(/ON/i) // มีคำว่า on ที่ส่วนใดส่วนหนึ่ง ไม่สนใจรูปแบบตัวพิมพ์
  .exec()
//   .then((docs) => console.log(docs))

Emp.find()
  .where('name')
  .equals(/martin$/i) // ลงท้ายด้วย matin
  .exec()
  .then((docs) => console.log(docs)) // []
