import { Emp } from './model.js'

//TODO: ต้องทราบค่า id ของรายการที่จะอัปเดต
// Emp.findByIdAndUpdate(
//   '65c831969963b4917e72fd81',
//   { name: 'Tom And Jerry' },
//   { useFindAndModify: false }
// )
//   .exec()
//   .then((docs) => {
//     if (!docs) {
//       console.log('อัปเดตไม่สำเร็จ')
//     } else {
//       console.log('อัปเดตสำเร็จ')
//     }
//   })
//   .catch((err) => console.log(err))

//TODO: ต้องทราบกำหนดเงื่อนไขของรายการที่จะอัปเดต
// Emp.findOneAndUpdate(
//   { name: { $eq: 'Flint Stone' } },
//   { married: true, birthday: new Date(1990, 1, 1) },
//   { useFindAndModify: false }
// )
//   .exec()
//   .then((docs) => {
//     if (!docs) {
//       console.log('อัปเดตไม่สำเร็จ')
//     } else {
//       console.log('อัปเดตสำเร็จ')
//     }
//   })
//   .catch((err) => console.log(err))

//TODO: เพิ่มเงินเดือนให้คนที่เกิดก่อน 1985/12/31 อีกคนละ 10,000 บาท
Emp.updateMany(
  { birthday: { $lte: new Date(1985, 11, 31) } }, // เกิดก่อน 1985/12/31
  { $inc: { salary: 10000 } } // เพิ่มจากค่าเดิมของ field salary อีก 10000
)
  .exec()
  .then((result) => {
    if (result && result.nModified) {
      console.log('จำนวนรายการที่แก้ไข: ' + result.nModified) // undefined
    } else {
      console.log('ไม่พบข้อมูลที่ต้องการอัปเดต')
    }
  })
  .catch((err) => console.log(err))
