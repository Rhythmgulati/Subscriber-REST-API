const mongoose = require("mongoose");

const subschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subscriberToChannel:{
        type:String,
        required:true
    },
    subscriberDate:{
        type:Date,
        required:true,
        default:Date.now()
    }
})


module.exports = mongoose.model("Subscriber",subschema);