const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const listingSchema =new Schema({

Title: {
    type: String,
    required:true
},
Description: String,

Image: {
  type: String,
  default: "https://unsplash.com/photos/a-person-standing-on-a-beach-next-to-a-cliff-WsNTdvjhiAc",
set:(v)=> v ==="" ? "https://unsplash.com/photos/a-person-standing-on-a-beach-next-to-a-cliff-WsNTdvjhiAc" : v,
},

Price: Number,
Location: String,
Country: String,
});

const Listing =mongoose.model("Listing",listingSchema);
module.exports = Listing;