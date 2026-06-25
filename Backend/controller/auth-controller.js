const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {

  return jwt.sign(
    {
      id
    },

    process.env.JWT_SECRET,

    {
      expiresIn:"1d"
    }
  );

};






exports.signUp = async(req,res)=>{


try{


const {
name,
email,
password
}=req.body;



const existingUser =
await User.findOne({
email
});


if(existingUser){

return res.status(400).json({

message:"User already exists"

});

}



const hashedPassword =
await bcrypt.hash(
password,
10
);



const user =
await User.create({

name,

email,

password:hashedPassword

});



const token =
generateToken(user._id);



res.status(201).json({

success:true,

message:"Signup Successful",


token,


user:{

_id:user._id,

name:user.name,

email:user.email

}

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};








exports.logIn = async(req,res)=>{


try{


const {
email,
password
}=req.body;



const user =
await User.findOne({
email
});



if(!user){

return res.status(404).json({

message:"User Not Found"

});

}




const match =
await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({

message:"Wrong Password"

});

}



const token =
generateToken(user._id);





res.status(200).json({

success:true,

message:"Login Successful",


token,


user:{

_id:user._id,

name:user.name,

email:user.email

}


});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};