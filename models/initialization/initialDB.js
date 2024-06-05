const mongoose=require("mongoose");
const InitData = require("./data.js");
const listing= require("../models/listings.js");

const INFO_DB="mongodb://127.0.0.1:27017/Backpacker";

async function connectDB () {
   await mongoose.connect(INFO_DB) ;
}

connectDB().then(()=>{
console.log("CONNECTION SUCCESSFUL");
}).catch(err =>{
    console.log(err);
});

app.listen(port,()=>{
    console.log("server is listening to port 8080");
});

const initDB = async () => {
    await listing.deleteMany({});
    await listing.insertMany( InitData.data ); // accesing the data key in object InitData
    console.log("success");
};
initDB ();