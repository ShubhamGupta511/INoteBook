const mongoose=require('mongoose');

const mongoURI="mongodb+srv://ashu511:ashutosh@cluster1.5mdqlvf.mongodb.net/test"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo sucessfully")
    })
}
module.exports=connectToMongo;