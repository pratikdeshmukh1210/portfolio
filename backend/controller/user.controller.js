const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const registerUSerController = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    const existing = await UserModel.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    let hasspass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      username,
      email,
      password: hasspass,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.jwt_secret_key, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      message: "User registered",
      user: newUser,
    });
  } catch (error) {
    console.log("error in register ", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginUserController = async(req,res)=>{
  try {
    let { email,password} = req.body ;
  if(!email || !password) return res.status(400).json({
    message:"Email and password are required",
  })

  console.log("Login attempt:", email);

  let user = await UserModel.findOne({email}) ;

  if(!user)return res.status(404).json({
    message:"User is not found" ,
  }) ;

  let compare = await bcrypt.compare(password ,user.password) ;

  if(!compare) return res.status(400).json({
    message:"Invaild Credentials" ,
  }) ;

  let token = jwt.sign({id:user._id} ,process.env.jwt_secret_key ,{expiresIn:"1h" ,} )

  res.cookie("token", token, { httpOnly: true }) ;
  
  return res.status(200).json({
    message:"User Logged in" ,
    user ,
  })


  } catch (error) {
    return res.status(500).json({
    message:"loging error"  ,
    error : error ,
    
  })
  }
}
const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = { registerUSerController ,loginUserController ,getCurrentUser};