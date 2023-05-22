//Import mongoose module
const mongoose =require ("mongoose");
//schema
const matchSchema=mongoose.Schema({
    scoreOne:Number,
    scoreTwo:Number,
    teamOne: String,
    teamTwo:String,
});
//model Name(collection 'matches' will be created/genrated)
const match=mongoose.model("Match", matchSchema);
//Make file exportable
module.exports=match;