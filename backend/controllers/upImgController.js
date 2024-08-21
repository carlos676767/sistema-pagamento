const multer = require("multer");

class MulterMyConfig {
  static configMulter() {
    const storage = multer.diskStorage({
      destination: (req, res, st) => {
        st(null, "../img");
      },
      filename: (req, file, st) => {
        st(null, file.fieldname + nameImg + MulterMyConfig.#randomNameImage());
      },
    });
    return multer({ storage: storage });
  }

  static #randomNameImage() {
    let nameImg = "";
    for (let i = 0; i <= 5; i++) {
      const generateAlfabet = Array.from(Array(26).keys()).map((data) =>
        String.fromCharCode(data + 97)
      );
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

  static async uploadImage(req, res) {
    const multerUp = MulterMyConfig.configMulter().single("file");
    console.log(req);
    if (!req.file) {
      res.status(404).send({ message: "please put an image" });
    }
    console.log('aa');
//    return multerUp((req, res) => {
//       if (!req.file) {
//         res.status(404).send({ message: "please put an image" });
//       }
//     });
  }
}

module.exports = UparImage;
