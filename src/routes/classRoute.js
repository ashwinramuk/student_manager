const router = require("express").Router();
const classModel = require("../models/classModel.js");
const studentModel = require("../models/studentModel");

router.post("/",async (req, res)=>{
    try{
        let result = await classModel.create(req.body);
        res.status(201).json(result)

    }catch(e){
        res.status(403).json({
            status:"Failed",
            message:e.message
        })
    }
})
router.post("/:myClassId/students", async (req, res)=>{
    try{
        let classId = req.params.myClassId
        let result = await studentModel.create({...req.body, classId:classId})
        res.status(201).json(result)
    }catch(e){
        res.status(403).json({
            status:"Failed"
        })
    }
})
router.get("/",async (req, res)=>{
    try{
        let result = await classModel.find()
        res.status(200).json(result)
    }catch(e){
        res.status(403).json({
            status:"Failed"
        })
    }
})
router.get("/:myClassId", async (req, res)=>{
    try{
        let classId = req.params.myClassId
        let result = await classModel.find({_id:classId})
        if(!result.length){
            return res.status(404).json({
                error:"There is no class at that id"
            })
        }
        res.status(200).json(result)
    }catch(e){
        res.status(403).json({
            status:"Failed"
        })
    }
})
router.get("/:myClassId/students", async (req, res)=>{
    try{
        let classId = req.params.myClassId
        let result = await studentModel.find({classId:classId})
        if(!result.length){
            return res.status(404).json({
                error:"There is no students at this id"
            })
        }
        res.status(200).json(result)
    }catch(e){
        res.status(403).json({
            status:"Failed"
        })
    }
})
router.get("/:myClassId/students/:studentId", async (req, res)=>{
    try{
        let classId = req.params.myClassId
        let studentId = req.params.studentId
        let result = await studentModel.findOne({$and:[{classId:classId},{_id:studentId}]})
        if(!result){
            return res.status(404).json({
                error:"There is no student at that id"
            })
        }
        res.status(200).json(result)
    }catch(e){
        res.status(403).json({
            status:"Failed"
        })
    }
})
router.put("/:myClassId/students/:studentId", async (req, res)=>{
    try{
        let classId = req.params.myClassId
        let studentId = req.params.studentId
        let result = await studentModel.updateOne({$and:[{classId:classId},{_id:studentId}]},req.body)
        
        if(!result){
            return res.status(404).json({
                error:"There is no student at that id"
            })
        }
        res.status(204).json(result)
    }catch(e){
        res.status(403).json({
            status:"Failed"
        })
    }
})
router.delete("/:myClassId/students/:studentId", async (req, res)=>{
    try{
        let classId = req.params.myClassId
        let studentId = req.params.studentId
        let result = await studentModel.deleteOne({$and:[{classId:classId},{_id:studentId}]})
        
        if(result){
            return res.status(404).json({
                error:"There is no student at that id",
                result
            })
        }
        res.status(204)
    }catch(e){
        res.status(403).json({
            status:"Failed"
        })
    }
})
router.delete("/:myClassId", async (req, res)=>{
    try{
        let classId = req.params.myClassId
        let result = await classModel.deleteOne({_id:classId})
        
        if(result.deletedCount){
            return res.status(404).json({
                error:"There is no class at that id",
                result
            })
        }
        res.status(204)
    }catch(e){
        res.status(403).json({
            status:"Failed",
            e
        })
    }
})


module.exports=router;