const express=require("express")
const router=express.Router()
const Student=require("../models/student")

router.post("/student",async(req,res)=>{
    const student=new Student(req.body)
    await student.save()
            .then(()=>res.send("Student Created"))
            .catch((err)=>res.status(400).send(err))
})

router.get("/students",async(req,res)=>{
    const students=await Student.find({deleteFlag:null})
    if(!students) return res.status(400).send("Error fetching data")
    res.send(students)
    
})

router.get("/student/:id",async(req,res)=>{
    const student=await Student.findById(req.params.id)
    if(!student) return res.status(400).send("Error fetching data")
    res.send(student)
    
})
router.patch("/student/:id",async(req,res)=>{
    const student =await Student.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!student) return res.status(400).send("Error updating student")
    res.send("Student updated successfully")
})

//soft delete
router.delete("/student/:id",async(req,res)=>{
    const student=await Student.findByIdAndUpdate(req.params.id,{deleteFlag:true},{new:true})
    if(!student) return res.status(400).send("Error deleting student")
    res.send("Student deleted successfully")
})

// //hard delete
// router.delete("/student/:id",async(req,res)=>{
//     const student=await Student.findByIdAndDelete(req.params.id)
//     if(!student) return res.status(400).send("Error deleting student")
//     res.send("Student deleted successfully")
// })
module.exports=router