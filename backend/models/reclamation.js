//Import mongoose module
const mongoose =require ("mongoose");
//schema
const reclamationSchema=mongoose.Schema({
   
    subject: String,
    description:String,
    userId:String,
});
//model Name(collection 'reclamations' will be created/genrated)
const reclamation=mongoose.model("Reclamation", reclamationSchema);
//Make file exportable
module.exports=reclamation;