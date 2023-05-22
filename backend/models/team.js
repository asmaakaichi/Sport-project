//Import mongoose module
const mongoose =require ("mongoose");
//schema
const teamSchema=mongoose.Schema({
    name:String,
    stadium:Number,
    owner: String,
    foundation: Number,

});
//model Name(collection 'matches' will be created/genrated)
const team=mongoose.model("Team", teamSchema);
//Make file exportable
module.exports=team;