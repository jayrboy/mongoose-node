import { Emp } from './model.js'

Emp.findById('65c831969963b4917e72fd7c')
  .exec()
  .then((docs) => {
    if (!docs) {
      console.log('ไม่มีข้อมูล')
    } else {
      console.log(docs._id, docs.name)
    }
  })
