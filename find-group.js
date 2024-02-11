import { Emp } from './model.js'

//TODO: การหาผลรวมของเงินเดือน โดยแยกตามกลุ่มที่แต่งงานแล้ว และยังไม่ได้แต่งงาน
Emp.aggregate([
  {
    $group: {
      _id: '$married', // ใช้ฟิลด์ married ในการจัดกลุ่ม
      agg: { $sum: '$salary' }, // หาผลรวมของคอลัมน์ salary
    },
  },
])
  .exec()
  .then((docs) => {
    // docs.map((d) => console.log(d._id, d.agg))
  })

//TODO: ตรวจสอบว่า ใครอายุมากที่สุด โดยแยกตามกลุ่มทีแต่งงานแล้ว และยังไม่ได้แต่งงาน
Emp.aggregate([
  {
    $group: {
      _id: '$married', // ใช้ฟิลด์ married ในการจัดกลุ่ม
      agg: { $min: '$birthday' },
    },
  },
])
  .exec()
  .then((docs) => {
    let y = new Date().getFullYear() //current year
    docs.map((d) => {
      let b = new Date(Date.parse(d.agg))
      //   console.log(d._id, y - b.getFullYear()) //อายุ
    })
  })

//TODO: การนับจำนวน โดยแยกตามกลุ่มทีแต่งงานแล้ว และยังไม่ได้แต่งงาน
Emp.aggregate([
  {
    $group: {
      _id: '$married', // ใช้ฟิลด์ married ในการจัดกลุ่ม
      agg: { $sum: 1 },
    },
  },
])
  .exec()
  .then((docs) => {
    docs.map((d) => console.log(d._id, d.agg))
  })
