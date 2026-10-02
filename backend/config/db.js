const mongoose  = require("mongoose") ;
const connectedDB = async()=>{
    try {
        let res = await mongoose.connect("mongodb://0.0.0.0/proAuth") ;
        if(res){
            console.log("mongooes connected") ;
        }
    } catch (error) {
        console.log("error in mongodb connection")
    }
}
module.exports = connectedDB;
