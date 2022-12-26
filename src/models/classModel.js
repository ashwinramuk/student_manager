const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
    class:{type: String, required:true, unique:true},
    studentsCount:{type: Number, required:true},
})

const classModel = mongoose.model("class", classSchema)

module.exports = classModel;
