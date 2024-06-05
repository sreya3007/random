const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const mongoose=require("mongoose");
const Listing =require("./models/listings.js");
const methodOverride=require("method-override")

const INFO_DB="mongodb://127.0.0.1:27017/Backpacker";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



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

//index route
app.get("/listings",async (req,res)=>{
 const allListings = await Listing.find({});
 res.render("listings/index.ejs",{allListings}); // we are putting all he listings inside index.ejs
});


//new ans create route
app.get("/listings/new", async (req,res)=>{
  res.render("listings/new.ejs" )
})


// show (read) route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params; // we obtained the id
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing }); // putting the particular listing according to their 
    //and its description inside show.ejs
  });

  // create route //this is to make the listings that we craeyed using th get request will be displayed

//   app.post("/listings",async (req,res)=>{
//     let {title,description,image ,price,location,country} =req.body;
//     const newAdd=req.body;
//     const newListing =new Listing(newAdd);
//     await newListing.save();
//     res.render("/listings");
//   })


app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });


  // edit route (to edit the listing)
  app.get("/listings/:id/edit", async (req,res)=>{
let {id}= req.params;
const listing = await Listing.findById(id);
res.render("listings/edit.ejs", { listing }); // putting the particular request we obtained by id in edit.ejs
  });

  // add the new upadated listings it will be a put request (remember as you are putting the data
  //and itts get request when you are getting data from somewhere)

  app.put("/listings", async(req,res)=>{
    let {id}= req.params;
    const updatedListing=await Listing.findByIdAndUpdate(...newAdd);
    res.redirect("/listings");
  });


  // to delete a listing
  app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  });