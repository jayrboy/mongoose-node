import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1/db1').catch((err) => console.log(err))

let employeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  birthday: Date,
  married: Boolean,
  phones: Array,
})
export let Emp = mongoose.model('Emp', employeeSchema)

//TODO: การกำหนด Schema ที่ซับซ้อนขึ้น
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { ype: String, default: 'male' },
  age: {
    type: Number,
    set: (v) => {
      let a = perseInt(v)
      return a == NaN ? 0 : a
    },
  },
})
export const Person = mongoose.model('Person', personSchema)

//TODO: การกำหนดฟิลด์ชนิด String (options)
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

//TODO: การกำหนดฟิลด์ชนิด Number และ Date
const productSchema = new mongoose.Schema({
  price: { type: Number, min: 0 },
  expires: { type: Number, min: new Date() },
})
export const Product = mongoose.model('Product', productSchema)
