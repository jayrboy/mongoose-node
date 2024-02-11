import { Emp } from './model.js'

//TODO: อ่านข้อมูลรายการแรกที่ตรงเงื่อนไข ผลลัพธ์เป็น object เดียว
Emp.findOne({ name: { $eq: 'Tom Jerry' } })
  .exec()
  .then((docs) => {
    console.log(docs)
  })
