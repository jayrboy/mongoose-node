import { Emp } from './model.js'

//TODO: ค้นหาจาก id (ได้ผลลัพธ์รายการเดียว) แล้วลบรายการนั้น
// Emp.findByIdAndDelete('65c831969963b4917e72fd7c', { useFindAndModify: false })
//   .exec()
//   .then(() => console.log('ลบข้อมูลเรียบร้อย'))
//   .catch((err) => console.log('ลบข้อมูลไม่สำเร็จ'))

Emp.deleteMany({ birthday: { $lte: new Date(1950, 12, 31) } })
  .exec()
  .then((result) => console.log('จำนวนรายการที่ลบ: ' + result.deletedCount)) // จำนวนรายการที่ถูกลบ
  .catch((err) => console.log('ลบข้อมูลไม่สำเร็จ'))
