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

4. การเปรียบเทียบด้วย RegEx

- Regular Express เปรียบเทียบ field ที่เป็น "string"
- กำหนดเงื่อนไขให้แก้ find() หรือ where() อย่างใดอย่างหนึ่ง

```js
Emp.find({ name: { $regex: /^T/, $options: 'i' } }) // ขึ้นต้นด้วย T หรือ t
  .exec()
  .then((docs) => console.log(docs))
```

```js
Emp.find()
  .where('name')
  .equals(/ON/i) // มีคำว่า on ที่ส่วนใดส่วนหนึ่ง ไม่สนใจรูปแบบตัวพิมพ์
  .exec()
  .then((docs) => console.log(docs))
```

```js
Emp.find()
  .where('name')
  .equals(/martin$/i) // ลงท้ายด้วย matin
  .exec()
  .then((docs) => console.log(docs)) // []
```

# 5. การค้นหาด้วยค่า id

- ถูกเพิ่มอัตโนมัติ ค่าไม่ซ้ำกันในแต่ละ document ของ collection เดียวกัน

```js
{
  _id: <ObjectId>
}
```

- นำค่า id ไปเก็บไว้ในอีก collection หนึ่ง เพื่อเชื่อมโยงระหว่างกัน
- ใช้ id มาเป็นเงื่อนไขในการค้นหาข้อมูล อาจใช้ find() หรือ where() ก็ได้

  - findById(id)

```js
Emp.findById('65c831969963b4917e72fd7c')
  .exec()
  .then((docs) => {
    if (!docs) {
      console.log('ไม่มีข้อมูล')
    } else {
      console.log(docs._id, docs.name) // ข้อมูลรายการเดียว
    }
  })
```

6. การเรียงเรียงลำดับและกำหนดช่วงผลลัพธ์

- ปกติข้อมูลที่อ่านได้ จะเียงตามที่จัดเก็บไว้ในฐานข้อมูล
- กำหนดวิธีการเรียงลำดับให้ตรงตามที่ต้องการ
- จำกัดผลลัพธ์ไม่ให้เกินจำนวนที่ระบุได้

- sort('field')

```js
//TODO: ถ้าเป็น "string" เรียงจาก A -> Z
//TODO: ถ้าเป็นวันเวลา เรียงจาก เวลามาก่อน -> วันเวลาที่มาทีหลัง
Emp.find()
  .sort('salary')
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.salary)
    })
  })

//TODO: ถ้าเป็นแบบตรงกันข้าม (มากไปน้อย) วางเครื่องหมาย - ไว้หน้าชื่อ field
Emp.find()
  .sort('-birthday')
  .exec()
  .then((docs) => {
    docs.map((d) => {
      console.log(d.name, d.birthday)
    })
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
```

- limit(num_docs)
- ควรเรียงตามลำดับผลลัพธ์ด้วย sort() แล้วค่อยเรียกเมธอด limit()

```js
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
```

- findOne(condition)

```js
//TODO: อ่านข้อมูลรายการแรกที่ตรงเงื่อนไข ผลลัพธ์เป็น object เดียว
Emp.findOne({ name: { $eq: 'Tom Jerry' } })
  .exec()
  .then((docs) => {
    console.log(docs)
  })
```

# การจัดกลุ่มข้อมูล

```
$sum
$min/ $max
$avg
```

- การหาผลรวมของเงินเดือน โดยแยกตามกลุ่มที่แต่งงานแล้ว และยังไม่ได้แต่งงาน

```js
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
    docs.map((d) => console.log(d))
  })
```

- ตรวจสอบว่า ใครอายุมากที่สุด โดยแยกตามกลุ่มทีแต่งงานแล้ว และยังไม่ได้แต่งงาน

```js
Emp.aggregate([
  {
    $group: {
      _id: '$married', // ใช้ฟิลด์ married ในการจัดกลุ่ม
      agg: { $min: '$birthday' }, // หาผลรวมของคอลัมน์ salary
    },
  },
])
  .exec()
  .then((docs) => {
    let y = new Date().getFullYear() //current year
    docs.map((d) => {
      let b = new Date(Date.parse(d.agg))
      console.log(d._id, y - b.getFullYear()) //อายุ
    })
  })
```

- การนับจำนวน โดยแยกตามกลุ่มทีแต่งงานแล้ว และยังไม่ได้แต่งงาน

```js
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
```

# การแก้ไขข้อมูล (Update)

```js
findByIdAndUpdate() // ค้นหาจาก id (ได้ผลลัพธ์รายการเดียว) แล้วอัปเดตรายการนั้น
findOneAndUpdate() // ค้นหาจากเงื่อนไข (ได้ผลลัพธ์รายการเดียว) แล้วอัปเดตรายการนั้น
updateOne() // อัปเดตเพียงรายการแรกที่ตรงตามเงื่อนไข
//! updateMany() //! อัปเดตทุกรายการที่ตรงกับเงื่อนไข (fix!)
```

```js
//TODO: เปลี่ยนชื่อเดิมเป็น Tom And Jerry
Emp.findByIdAndUpdate(
  '65c831969963b4917e72fd81',
  { name: 'Tom And Jerry' },
  { useFindAndModify: false }
)
  .exec()
  .then((docs) => {
    if (!docs) {
      console.log('อัปเดตไม่สำเร็จ')
    } else {
      console.log('อัปเดตสำเร็จ')
    }
  })
  .catch((err) => console.log(err))
```

```js
//TODO: ต้องทราบกำหนดเงื่อนไขของรายการที่จะอัปเดต
Emp.findOneAndUpdate(
  { name: { $eq: 'Flint Stone' } },
  { married: true, birthday: new Date(1990, 1, 1) },
  { useFindAndModify: false }
)
  .exec()
  .then((docs) => {
    if (!docs) {
      console.log('อัปเดตไม่สำเร็จ')
    } else {
      console.log('อัปเดตสำเร็จ')
    }
  })
  .catch((err) => console.log(err))
```

- updateOne() และ updateMany() หลักการใช้งานแบบเดียวกัน อาจจะไม่ต้องระบุ useFindAndModify ก็ได้
- ถ้าเงื่อนไขที่ระบุไม่มีอยู่จริง ข้อมูลก็จะไม่อัปเดต ตรวจสอบได้จาก nModified ใช้กับ methods ที่เกี่ยวกับการอัปเดตทั้งหมด

- อัปเดตค่าเดิม ร่วมกับ operator

```js
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
```

# การลบข้อมูล (Delete)

```js
findByIdAndDelete() // ค้นหาจาก id (ได้ผลลัพธ์รายการเดียว) แล้วลบรายการนั้น
findOneAndDelete() // ค้นหาจากเงื่อนไข (ได้ผลลัพธ์รายการเดียว) แล้วลบรายการนั้น
deleteOne() // ลบเพียงรายการแรกที่ตรงตามเงื่อนไข
deleteMany() //! ลบทุกรายการที่ตรงกับเงื่อนไข
```

```js
Emp.findByIdAndDelete('65c831969963b4917e72fd7c', { useFindAndModify: false })
  .exec()
  .then(() => console.log('ลบข้อมูลเรียบร้อย'))
  .catch((err) => console.log('ลบข้อมูลไม่สำเร็จ'))
```

```js
Emp.deleteMany({ birthday: { $lte: new Date(1950, 12, 31) } })
  .exec()
  .then((result) => console.log('จำนวนรายการที่ลบ: ' + result.deletedCount)) // จำนวนรายการที่ถูกลบ
  .catch((err) => console.log('ลบข้อมูลไม่สำเร็จ'))
```

## การกำหนด Schema ที่ซับซ้อนขึ้น

```
default   // ถ้าตอนเพิ่มข้อมูล ไม่ระบุฟิลด์นี้ ก็จะเป็นค่าดังกล่าวแทน
require   // บังคับว่าต้องใส่ข้อมูลในฟิลด์นี้ (true/false)
unique    // ข้อมูลในฟิลด์นี้ซ้ำกันได้หรือไม่ (true/false)
get       // กำหนด function เพื่อจัดการก่อนที่จะ ใส่ลง ในฟิลด์นั้น
set       // กำหนด function เพื่อจัดการก่อนที่จะ อ่านค่า จากฟิลด์นั้น
```

```js
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: 'male',
  },
  age: {
    type: Number,
    set: (v) => {
      let a = perseInt(v)
      return a == NaN ? 0 : a
    },
  },
})
export const Person = mongoose.model('Person', personSchema)
```

- การกำหนดฟิลด์ชนิด String (options)

```
lowercase/uppercase   //* บังคับต้องใส่ พิมพ์เล็ก/พิมพ์ใหญ่ ทั้งหมดหรือไม่ (true/false)
enum  //* กำหนดชุดข้อมูลที่ใส่ลงไปได้ (จะกำหนดค่าอื่นๆ นอกเหนือจากนี้ไม่ได้)
trim  //* ตัดช่องว่างก่อนและหลังสตริงออกไปหรือไม่ (true/false)
match //* กำหนดรูปแบบสตริงด้วย Regular Express
minlength/maxlength   //* ความยาวต่ำสุด/สูงสุด ของสตริง
```

```js
const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, trim: true },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
})
export const User = mongoose.model('User', userSchema)
```

- การกำหนดฟิลด์ชนิด Number และ Date

```js
const productSchema = new mongoose.Schema({
  price: { type: Number, min: 0 },
  expires: { type: Number, min: new Date() },
})
export const Product = mongoose.model('Product', productSchema)
```
