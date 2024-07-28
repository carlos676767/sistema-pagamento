const router = require("express").Router()
const path = require("path")

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "testest.html"))
    
})

module.exports = router