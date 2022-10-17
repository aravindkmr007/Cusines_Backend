const csv = require("csvtojson");
const CusineModel = require("../models/CusineModel");

exports.DbRestore = (req, res) => {
  csv()
    .fromFile("./indian_food (1).csv")
    .then((jsonObj) => {
      jsonObj = jsonObj.map((e) => {
        return {
          Name: e.name,
          Ingredients: e.ingredients.split(",").map(e =>  e.trim()),
          Diet: e.diet,
          Pre_Time: e.prep_time,
          Cooking_Time: e.cook_time,
          Flavor_Profile: e.flavor_profile,
          Course: e.course,
          State: e.state,
          Region: e.region ? e.region : "Tamil Nadu",
        };
      });
    //   console.log(jsonObj);
     CusineModel.insertMany(jsonObj)
     .then(data => {
        console.log(data)
      res.status(201).send({ message: "DB has been restored" });

     })

    })
    .catch((err) => {
      console.log(err);
    });
};
