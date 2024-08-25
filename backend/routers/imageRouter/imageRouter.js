const { UparImage, MulterMyConfig } = require("../../controllers/upImgController")


const api = require("express").Router()
api.post("/img", MulterMyConfig.configMulter().single("file"), UparImage.uploadImage)
module.exports = api
