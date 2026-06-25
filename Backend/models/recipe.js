const mongoose = require("mongoose");


const recipeSchema = new mongoose.Schema(

{


title:{
    type:String,
    required:true,
    trim:true
},


description:{
    type:String,
    required:true
},



ingredients:[

    {
        type:String
    }

],



category: {
  type: String,
  enum: [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
  ],
  required: true,
},



image:{

    type:String

},



userId:{

    type:mongoose.Schema.Types.ObjectId,

    ref:"User",

    required:true

},



isFavorite:{

    type:Boolean,

    default:false

}



},

{
timestamps:true
}


);



module.exports =
mongoose.model(
"Recipe",
recipeSchema
);