//Import mongoose module
const mongoose =require ("mongoose");
//schema
const replyrecSchema=mongoose.Schema({
   
    content: String,
    reclamationId:String,
    userId:String,
});
//model Name(collection 'Replyreclamations' will be created/genrated)
const replyrec=mongoose.model("Replyrec", replyrecSchema);
//Make file exportable
module.exports=replyrec;