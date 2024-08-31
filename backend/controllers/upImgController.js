const multer = require("multer");

class MulterMyConfig {
  static configMulter() {
    const storage = multer.diskStorage({
      destination: (req, res, st) => {
        st(null, "F://sistema pagamento node js//sistema-pagamento//backend//image")
      },
      filename: (req, file, st) => {
        st(null, file.originalname );
      },
    });
    return multer({ storage: storage });
  }

  static #randomNameImage() {
    let nameImg = "";
    for (let i = 0; i <= 5; i++) {
      const generateAlfabet = Array.from(Array(26).keys()).map((data) => String.fromCharCode(data + 97));
      const randomAlfabet = Math.floor(Math.random() * generateAlfabet.length);
      const random = Math.floor(Math.random() * 1000) + 1;
      nameImg += random + generateAlfabet[randomAlfabet];
    }
    return nameImg;
  }
}

class UparImage extends MulterMyConfig {
  constructor() {
    super();
  }

  static uploadImage(req, res) {
    try {
      if (!req.file) {
        throw new Error("please put an image")
      }
      const imgName = req.file.originalname
      const url = `http://localhost:8080/${imgName}`
      res.status(200).send({ msg: "your image uploaded successfully", url: url });
    } catch (error) {
      res.status(404).send({err: error.message})
    }
  }
}

module.exports = {UparImage, MulterMyConfig};
