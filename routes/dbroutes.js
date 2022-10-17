const express =  require("express")
const router =  express.Router()
const {DbRestore} =  require("../util/DumpingData")

router.get("/dbrestore", DbRestore)


module.exports = router