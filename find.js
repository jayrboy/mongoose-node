import { Emp } from './model.js'

read() // เลือกใช้เจาะจงเฉพาะ field ที่ต้องการใช้งานด้วยเมธอด select()

function read() {
  Emp.find()
    .select('name')
    .exec()
    .then((docs) => {
      if (docs) {
        console.log(`found ${docs.length} document(s)`)
        console.log('---------------')
        docs.forEach((d) => {
          console.log(d.name)
        })
      }
    })
    .catch((e) => console.log(e))
}

// ข้อมูลจะอ่านมาทุก fields ผลลัพธ์จึงมีขนาดใหญ่และทำงานช้า
// อ่านเฉพาะ name, salary, phones
list()

function list() {
  Emp.find({})
    .exec()
    .then((docs) => {
      if (docs) {
        for (let i = 0; i < docs.length; i++) {
          console.log(docs[i].name, docs[i].salary, docs[i].phones[0])
        }
      }
    })
    .catch((e) => console.log(e))
}
