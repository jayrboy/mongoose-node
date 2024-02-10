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
