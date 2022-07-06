const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  createdAt:Date,
  updatedAt:Date,

  email:String,
  hash:String,

  firstName: String,
  lastName: String,
});

const bookMarkSchema = new mongoose.Schema({
  createdAt:Date,
  updatedAt:Date,

  title:String,
  description:String,
  link:String
})

const UserModel = mongoose.model("users", userSchema);
const BookMarkModel = mongoose.model("bookMark", bookMarkSchema);


export {
    UserModel,
    BookMarkModel
} 

