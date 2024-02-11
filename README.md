#### MongoDB และ Mongoose

- ตัวอย่างโค้ดที่เขียนแบบ Synchronous กับ Database No-SQL
- NoSQL จัดเก็บข้อมูลแบบ Binary JSON

# โครงสร้าง

1. NoSQL/Mongo Database

- Collection
  - Document
  - Field

2. SQL/Relational Database

- Table
  - Row
  - Column

## การติดตั้ง MongoDB

1. https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
2. Run Program
3. Restart Computer
4. Run -> services.msc -> MongoDB Server (MongoDB) -> Running -> Automatic

## การเชื่อมต่อ MongoDB ด้วย Mongoose

```sh
npm install express mongoose
```

- แก้ไขรหัสผ่านของผู้ใช้ root กรณีที่เชื่อมต่อ online

```js
mongoose.connect(
  'mongodb+srv://root:<password>@product-store-mern.cmkicpa.mongodb.net/?retryWrites=true&w=majority'
)
```

- สำหรับทดสอบใช้งานบนเครื่อง local

```js
mongoose.connect('mongodb://localhost/db')
mongoose.connect('mongodb://127.0.0.1/db')
```

## การสร้าง Schema และ Model

```js
import mongoose from 'mongoose'

let employeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  birthday: Date,
  married: Boolean,
  phones: Array,
})

export let Emp = mongoose.model('Emp', employeeSchema)
```

## การเพิ่มข้อมูล และ การแก้ปัญหา Asynchronous ของ Mongoose

- แยกขั้นตอนย่อยๆ ไปสร้างเป็น function
- วิธีที่ 1 นำข้อมูลมากำหนดให้แก่ constructor ของ model แล้วเรียกเมธอด save() เพื่อบันทึก

```js
import { Emp } from './model.js'

save()

function save() {
  let doc = {
    name: 'James Bond',
    salary: 30000,
    birthday: new Date(1990, 9, 30),
    married: true,
    phones: ['081566XXXX', '02976XXXX'],
  }

  new Emp(doc)
    .save()
    .then(() => {
      console.log('doc saved')
    })
    .catch((err) => console.log(err))
}
```

- วิธีที่ 2 นำข้อมูลมากำหนดให้แก่ insertMany() ของ model
- วิธีนี้ สามารถเพิ่มข้อมูลพร้อมกันได้มากกว่า 1 document

```js
import { Emp } from './model.js'

insertMany()

function insertMany() {
  let docs = [
    {
      name: 'Tom Jerry',
      salary: 23000,
      birthday: new Date(1997, 10, 10),
      married: true,
      phones: [],
    },
    {
      name: 'Harry Potter',
      salary: 20000,
      birthday: new Date(1998, 2, 14),
      married: false,
      phones: [],
    },
  ]

  Emp.insertMany(docs)
    .then(() => {
      console.log('docs inserted')
    })
    .catch((err) => console.log(err))
}
```

- เมธอด save() insertMany() ถูกสร้างจากพื้นฐานของ Promise ทำงานแบบ Asynchronous
- จัดการด้วย .then().catch()

## การอ่านข้อมูล

```js
find() // อ่านข้อมูลทั้งหมด หรือที่ตรงกับเงื่อนไข
select() // กำหนดชื่อ field ที่ต้องการอ่านข้อมูล
distinct() // เลือกรายการข้อมูลแบบไม่ซ้ำกันใน field ที่ระบุ
exec() // กำหนดวิธีดำเนินการกับข้อมูลที่ได้จาก method
```

- การหาข้อมูลทั้งหมด ไม่ต้องระบุเงื่อนไข เพียงแค่เขียนวงเล็บ {} ว่างๆ

```json
[
  { "name": "James Bond", "salary": 30000 }, // document[0]
  { "name": "Flint Stone", "price": 25000 } // document[1]
  // ...
]
```

- การเข้าถึงแต่ละรายการ (document) โดยระบุ index ลำดับอาร์เรย์และชื่อ properties (field)

```js
console.log(docs[0].name, docs[0].salary, docs[0].phones[0]) // รายการที่ 1
console.log(docs[1]['name'], docs[1]['salary']) // รายการที่ 2
```

- การเข้าถึงหลายๆ รายการ ใช้ลูป for, forEach, map

```js
let numDocs = docs.length
for (let i = 0; i < numDocs; i++) {
  console.log(docs[i].name, docs[i].salary, docs[i].phones[0])
}
```

```js
docs.forEach((d) => {
  console.log(d.name, d['salary'], d['phones'][0])
})
```

```js
docs.map((d) => {
  console.log(d.name, d['salary'], d['phones'][0])
})
```

## การกำหนดเงื่อนไขในการอ่านข้อมูล

1. การเปรียบเทียบด้วย method ของ mongoose

```js
where('field') // กำหนดชื่อฟิลด์ที่จะต้องตรวจสอบเงื่อนไข
equals(value) // เท่ากับค่าที่ระบุ
ne(value) // ไม่เท่ากับค่าที่ระบุ
lt(value) // มีค่า < ค่าที่ระบุ ใช้กับฟิลด์ชนิด Number และ Date
lte(value) // มีค่า <= ค่าที่ระบุ ใช้กับฟิลด์ชนิด Number และ Date
gt(value) // มีค่า > ค่าที่ระบุ ใช้กับฟิลด์ชนิด Number และ Dat
gte(value) // มีค่า >= ค่าที่ระบุ ใช้กับฟิลด์ชนิด Number และ Dat
// in([v1, v2])  // ตรงกับค่าใดค่าหนึ่งภายในชุดข้อมูลที่ระบุ
nin([v1, v2]) // ตรงข้ามกับ in
```

- แนวทางการใช้งาน
  - find().where().exec() หรือ
  - find().select().where().exec()

```js
Emp.find()
  .select('name salary')
  .where('salary')
  .gte(25000) // salary >= 25000
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary)
    })
  })
```

2. การเปรียบเทียบด้วย operator ของ mongoose

```
$eq = equals() // =
$ne = ne() // !=
$lt = lt() // <
$lte = lte() // =<
$gt = gt() // >
$gte = gte() // >=
$in = in() // ตรงกับใครใดค่าหนึ่งภายในชุดข้อมูลที่ระบะ
$nin = nin() // ตรงกันข้าม in
```

- กำหนดให้กับ find() หรือ where() หรือ methods อื่นๆ

```js
Emp.find({ salary: { $gte: 30000 } }) // salary >= 30000
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary)
    })
  })
```

```js
Emp.find()
  .where({ salary: { $gte: 30000 } }) // salary >= 30000
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary)
    })
  })
```

3. การเปรียบเทียบแบบ logic ของ mongoose

- and() // เปรียบเทียบเงื่อนไข ซึ่งต้องเป็น true ทั้งหมดข้อมูลจึงจะถูกเลือก

```js
Emp.find() // (salary <= 25000) && (married == true)
  .where('salary')
  .lte(25000)
  .and({ married: { $eq: true } })
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary, d.married)
    })
  })
  .catch((err) => console.log(err))
```

- or() // เปรียบเทียบหลายเงื่อนไข ต้องเป็น true เพียงอันใดอันหนึ่งจึงจะถูกเลือก

```js
Emp.find({ salary: { $gte: 30000 } }) // (salary >= 30000) || (birthday <= '1980-12-31')
  .or({ birthday: { $lte: new Date(1980, 12, 31) } })
  .exec()
  .then((docs) => {
    if (docs < new Date(1980, 12, 31)) {
      console.log(`ไม่มีใครเกิด น้อยกว่า 31 ธ.ค. ${1980 + 543}`)
    }
    docs.forEach((d) => {
      console.log(d.name, d.salary, d.birthday)
    })
  })
  .catch((err) => console.log(err))
```

- nor() // เปรียบเทียบหลายเงื่อนไข ไม่ต้องเป็น true ทั้งหมดจึงจะถูกเลือก

```js
Emp.find()
  .nor([{ salary: { $gte: 25000 }, marriage: true }])
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary, d.married)
    })
  })
  .catch((err) => console.log(err))
```
