const mongoose = require("mongoose");

module.exports = connect = async () => {
    try{
        await mongoose.connect(process.env.URL)
        console.log("Database connected");
    }
    catch(err){
        console.log(err)
    }
}