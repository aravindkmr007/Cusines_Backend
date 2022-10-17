const CusinesModel = require("../models/CusineModel");
const querystring = require("querystring");
const CusineModel = require("../models/CusineModel");
exports.GettingofCusines = async (req, res) => {
  const query = req.query;
  try {
    let { pageSize, page } = query;
    const CusinesCollectionCount = await CusinesModel.count();

    let limit = pageSize * page;
    let skip = pageSize * page - 1;
    if (query.filter) {
    let filter = Object.keys(querystring.decode(query.filter));

    let data = JSON.parse(filter[0].toString().replace(`,"operator":"`, "}]}"));
      let conditon = data.filter.map(e => {
        if(e.field ==  "Name")
        {
          return {
            [[e.field]] : {
              $regex: e.tableData.filterValue,
              $options: 'i'
            }
          }

        } else {
          return {
            [[e.field]] : {
              $in:  e.tableData.filterValue,
            }
          }
          }
      })
      CusineModel.find({
        $and: conditon,
      })
      .exec()
      .then(count => {
        CusinesModel.find({
          $and: conditon,
        })
          .skip(skip)
          .limit(limit)
          .exec()
          .then((data) => {
            console.log(data)

            res.status(200).send({
                message: "Successfully Fetched",
                data: {
                  data: data,
                  page: page - 1,
                  totalCount: count.length,
                },
              });
          });
      })
    } else {
      CusinesModel.find({})
        .skip(skip)
        .limit(limit)
        .exec()
        .then(async (data) => {
          res.status(200).send({
            message: "Successfully Fetched",
            data: {
              data: data,
              page: page - 1,
              totalCount: CusinesCollectionCount,
            },
          });
        });
    }
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: "Something went worng" });
  }
};


exports.UpdatingOfCusines = async(req,res) => {
  
  const {_id ,Name,Ingredients, Diet,Pre_Time,Cooking_Time,Flavor_Profile,Course,State,Region} =  req.body 
  try {
    CusineModel.findByIdAndUpdate(_id, {
      Name : Name ,
      Ingredients : Ingredients,
      Diet : Diet,
      Pre_Time : Pre_Time ,
      Cooking_Time : Cooking_Time,
      Flavor_Profile : Flavor_Profile,
      Course : Course,
      State : State,
      Region : Region
    })
    .then(data => {
      res.status(202).send({data :  data})
    })
  } catch (err){
    res.status(400).send({data : data})

  }

}
exports.AddingOfCusines =  async(req,res) => {
  const {Name,Ingredients, Diet,Pre_Time,Cooking_Time,Flavor_Profile,Course,State,Region} =  req.body 
  try{
    const newCusines = new CusineModel({
      Name : Name,
      Ingredients : Ingredients,
      Diet : Diet,
      Pre_Time : Pre_Time,
      Cooking_Time :Cooking_Time,
      Flavor_Profile :Flavor_Profile,
      Course : Course,
      State : State,
      Region :Region
    })
    newCusines.save()
    .then(data => {
      res.status(201).send({message : "Successfully Created",data : data})
    })
  } catch(err)
  {
    res.status(400).send({err : err , message : "Something Went Wornf"})
  }
}

exports.DeletingOfCusine = async(req,res) => {
  const {_id} = req.body
  try{
    CusineModel.findByIdAndDelete(_id)
    .then(data => {
      res.status(202).send({data : data})
    })

  } catch(err)
  {
    res.status(400).send({data : data})
  }

}
exports.GettingListOfIngredients = (req, res) => {
  try {
    CusinesModel.aggregate([
      {
        $project: {
          _id: 0,
          ingredients: "$Ingredients",
        },
      },
    ])
      .exec()
      .then((data) => {
        data = data.map((e) => e.ingredients).flat(1);
        data = Array.from(new Set(data.map((e) => e.toLowerCase())));
        res.status(200).send({ message: "Successfully Fetched", data: data });
      });
  } catch (err) {
    res.status(400).send({ message: "Something went worng" });
  }
};

exports.GettingListOfRegionandState = (req, res) => {
  try {
    CusinesModel.aggregate([
      {
        $project: {
          _id: 0,
          State: "$State",
          Region: "$Region",
        },
      },
    ])
      .exec()
      .then((data) => {
        let final = [];
        data.map((e) => {
          if (!final.find((b) => b.State == e.State && b.Region == e.Region)) {
            final.push(e);
          }
        });
        res.status(200).send({ message: "Successfully Fetched", data: final });
      });
  } catch (err) {
    res.status(400).send({ message: "Something went worng" });
  }
};


