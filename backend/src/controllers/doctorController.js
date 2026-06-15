import Doctor from "../models/Doctor.js";

export const createDoctor =
async(req,res)=>{

try{

const doctor =
await Doctor.create({

 name:req.body.name,

 designation:req.body.designation,

 qualification:req.body.qualification,

 specialization:req.body.specialization,

 experience:req.body.experience,

 image:req.body.image,

 about:req.body.about,

 timings:req.body.timings

});

res.status(201).json(
 doctor
);

}catch(error){

res.status(500).json({
 message:error.message
});

}
};
export const deleteDoctor =
async(req,res)=>{

await Doctor.findByIdAndDelete(
 req.params.id
);

res.json({
 message:"Doctor Deleted"
});

};
export const getDoctors =
async(req,res)=>{

const doctors =
await Doctor.find()
.sort({createdAt:-1});

res.json(doctors);

};