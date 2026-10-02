require("dotenv").config();
const express = require("express");

const connectedDB = require("./config/db");
const cookieParser = require("cookie-parser");

const userRouter = require("./routers/user.routes");
const productRouter = require("./routers/product.routes") ;
const sellerRouter = require("./routers/seller.routes")

const cors  = require ("cors") ;
const app = express();
const port = process.env.PORT || 5000;
connectedDB();


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
        origin: "http://localhost:5173",
    credentials:true ,
  })
)

app.use("/api/auth/user", userRouter);
app.use("/api/auth/seller",sellerRouter)
app.use("/api/product",productRouter) ;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});