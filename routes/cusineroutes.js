/**
 * @description: CRUD of Cusine
 */
const express =  require("express")
const router =  express.Router()
const {GettingofCusines,GettingListOfIngredients,DeletingOfCusine,AddingOfCusines,GettingListOfRegionandState,UpdatingOfCusines} = require("../controllers/cusinescontroller")

router.get("/cusines" ,GettingofCusines  )
router.patch("/cusines" , UpdatingOfCusines)
router.post("/cusines" , AddingOfCusines)
router.delete("/cusines" , DeletingOfCusine)


router.get("/listofingredients",GettingListOfIngredients )
router.get("/listofregion", GettingListOfRegionandState)
module.exports=  router