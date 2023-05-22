//Import mongoose module
const mongoose =require ("mongoose");
//schema
const stadiumSchema=mongoose.Schema({
    name:String,
    city:String,
    capacity: Number,
});
//model Name(collection 'stadiums' will be created/genrated)
const stadium=mongoose.model("Stadium", stadiumSchema);
//Make file exportable
module.exports=stadium;