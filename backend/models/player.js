//Import mongoose module
const mongoose =require ("mongoose");
//schema
const playerSchema=mongoose.Schema({
    name:String,
    position :String,
    number: String,
    age:Number,
});
//model Name(collection 'matches' will be created/genrated)
const player=mongoose.model("Player", playerSchema);
//Make file exportable
module.exports=player;