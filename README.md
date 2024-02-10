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
mongoose.connect('mongodb://127.0.0.1/db')
```

## การสร้าง Schema และ Model

```js
import mongoose from 'mongoose'

let userSchema = new mongoose.Schema(
  {
    user: String,
    password: String,
  },
  { timestamps: true }
)

export let User = mongoose.model('User', userSchema)
```
