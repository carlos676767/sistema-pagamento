const UparImage = require("../../controllers/upImgController")

const api = require("express").Router()
api.post("/image", UparImage.uploadImage)
module.exports = api