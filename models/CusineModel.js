/**
 * @author     : Aravindakumar
 * @description: Cusine schema
 */

 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 
 const CusineSchema = new Schema({
   _id: {
     type: mongoose.Schema.Types.ObjectId,
     auto: true,
   },
   Name : {
    type : String,
    min : 3,
    max : 20,
    unique: true,
    required: true
   },
   Ingredients : {
    type : Array
   },
   Diet: {
    type : String,
    enum: ["vegetarian", "non vegetarian"],
    default: "vegetarain",
    required : true
   },
   Pre_Time : {
    type : Number,
    required : true
   },
   Cooking_Time : {
    type : Number,
    required : true
   },
   Flavor_Profile : {
    type :  String,
    required : true
   },
   Course : {
    type :  String,
    required : true
   },
   State : {
    type :  String,
    required : true

   },
   Region : {
    type :  String,
    required :  true
   }

 }, {timestamps : true});
 module.exports = mongoose.model("Cusines", CusineSchema);
 