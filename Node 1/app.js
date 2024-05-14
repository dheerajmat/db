const express = require("express");
const db = require("./db");
const MenueItem = require("./models/MenuItem")
const Teacher = require("./models/Teacherschema")
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded())

app.get("/", (req, res) => {
  res.send("hello its me");
});


////menu items/////
app.get("/students",async(req,res)=>{
  try{
   const data = await MenueItem.find();
  //  console.log("menu fatched");
   res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"})
  }
})



app.get("/teachers",async(req,res)=>{
  try{
   const data = await Teacher.find();
   console.log("menu fatched");
   res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"})
  }
})


// app.get("/menuitem/:id",async(req,res)=>{
//   try{
//     const userid = req.params.id
//    const data = await MenueItem.find({userid});
//   //  console.log("menu fatched");
//    res.status(200).json(data)
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:"internal server error"})
//   }
// })


app.post("/students",async(req,res)=>{
  try{
    const data = req.body;
    const addmenu = new MenueItem(data);
    const response = await addmenu.save()
    console.log("menu added");
    res.status(200).json(response)
  }catch(err){
     console.log(err);
     res.status(500).json({error:"internal server error"})
  }
})

app.post("/teachers",async(req,res)=>{
  try{
    const data = req.body;
    const addmenu = new Teacher(data);
    const response = await addmenu.save()
    console.log("menu added");
    res.status(200).json(response)
  }catch(err){
     console.log(err);
     res.status(500).json({error:"internal server error"})
  }
})
app.put('/students/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { complain } = req.body; // Assuming you're sending only one complaint at a time from the frontend
//     const student = await MenueItem.findById(id);
//     if (!student) {
//         return res.status(404).json({ message: "Student not found." });
//     }
//     student.complains.push({ complain });
//     await student.save();
//     res.json(student);
// } catch (err) {
//     res.status(400).json({ message: err.message });
// }


try {
  const { id } = req.params;
  const { date } = req.body;
  const { complain } = req.body;
  const student = await MenueItem.findById(id);
  if (!student) {
      return res.status(404).json({ message: "Student not found." });
  }

  student.complains.push({date, complain })
  await student.save();
  res.json(student);
} catch (err) {
  res.status(400).json({ message: err.message });
}


// try {
//   const { id } = req.params;/
//   const { complain } = req.body; // Assuming you're sending a single complaint from the frontend
//   const student = await MenueItem.findById(id);
//   if (!student) {
//       return res.status(404).json({ message: "Student not found." });
//   }
  
//   // Push the complaint into the complains array
//   student.complains.push(complain);
  
//   await student.save();
//   res.json(student);
// } catch (err) {
//   res.status(400).json({ message: err.message });
// }

});



app.delete('/students/:id', async (req, res) => {
  try {
    const userid = req.params.id
    const userupdatedatas = await MenueItem.findByIdAndDelete(userid)
  } catch (error) {
    console.log(error + "patch")
  }
});


app.delete('/teachers/:id', async (req, res) => {
  try {
    const userid = req.params.id
    const userupdatedatas = await Teacher.findByIdAndDelete(userid)
  } catch (error) {
    console.log(error + "patch")
  }
});


app.listen(2000, () => console.log("connected to port 1000"));
