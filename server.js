var studentcount=0,mentorcount=0
const PORT = process.env.PORT || 9000;
const express=require("express");
const app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.json())
const mongodb=require("mongodb");
const mongoclient=mongodb.MongoClient;
const url="mongodb+srv://vishnu:123abc@cluster0.o2tjj.mongodb.net/form_react?retryWrites=true&w=majority";
const cors=require("cors")
app.use(cors({
    origin:"*"
}))



app.post("/save",async function(req,res){   
let client=await mongoclient.connect(url,{ useUnifiedTopology: true })
let db=client.db("form_react")
console.log(req.body)
await db.collection("data").insertOne({_id:req.body.email,name:req.body.name,address1:req.body.address1,address2:req.body.address2,country:req.body.country,state:req.body.state,city:req.body.city,gender:req.body.gender,food:req.body.food,color:req.body.color})
client.close()
res.json({message:"success"})
})

app.post("/edit",async function(req,res){   
    let client=await mongoclient.connect(url,{ useUnifiedTopology: true })
    let db=client.db("form_react")
    console.log(req.body)
    await db.collection("data").findOneAndUpdate({_id:req.body.email},{_id:req.body.email,name:req.body.name,address1:req.body.address1,address2:req.body.address2,country:req.body.country,state:req.body.state,city:req.body.city,gender:req.body.gender,food:req.body.food,color:req.body.color})
    client.close()
    res.json({message:"success"})
    })

app.get("/data",async function(req,res){
    let client=await mongoclient.connect(url,{ useUnifiedTopology: true })
    let db=client.db("form_react")
    let arr=await db.collection("data").find().toArray()
    console.log(arr)
    client.close() 
    res.json(arr)   
})

app.post("/delete",async function(req,res){   
    let client=await mongoclient.connect(url,{ useUnifiedTopology: true })
    let db=client.db("form_react")
    
    await db.collection("data").findOneAndDelete({_id:req.body._id})
    client.close()
    console.log("deleted")
    res.json({message:"deleted"})
    })


app.listen(PORT, () => console.log(`server running on ${PORT}`));




