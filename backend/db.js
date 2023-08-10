const mongoose=require('mongoose');
const mongoURL="mongodb+srv://patrobansita2002:Bansita2002@cluster0.w1nn5nw.mongodb.net/"
const connectToMongo=()=>{
    mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
}
module.exports=connectToMongo;
