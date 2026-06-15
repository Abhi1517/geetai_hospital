import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true
  },

  designation:{
    type:String,
    required:true
  },

  qualification:{
    type:String,
    required:true
  },

  specialization:{
    type:String,
    required:true
  },

  experience:{
    type:Number,
    required:true
  },

  image:{
    type:String,
    default:""
  },

  about:{
    type:String
  },

  timings:{
    type:String
  }
},
{
  timestamps:true
}
);

export default mongoose.model(
"Doctor",
doctorSchema
);