const express = require("express");
const {
  registerUSerController,
  loginUserController ,
  getCurrentUser
} = require("../controller/user.controller.js");

const { authMiddleware } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get("/current-user", authMiddleware, (req, res) => {
  console.log("check cl user ->", req.user);
  return res.status(200).json({
    message: "Current user fetched",
    user: req.user,
  });
});


router.post("/register", registerUSerController);
router.post("/login",loginUserController) ;
router.get("/me", authMiddleware, getCurrentUser);



module.exports = router; 