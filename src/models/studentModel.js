const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const studentSchema = new Schema({
    name:{type: String, required:true},
    classId:{type: ObjectId, ref:"class"},
})

const studentModel = mongoose.model("student", studentSchema)

module.exports = studentModel;