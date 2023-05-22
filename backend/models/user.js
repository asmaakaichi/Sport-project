const mongoose=require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userSchema=mongoose.Schema({
    firstName:String,
    lastName: String,
    email:{type:String, unique: true},
    pwd:String,
    tel:String,
    role:String,
    img:String,
});
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

const user=mongoose.model("User", userSchema );
module.exports=user;