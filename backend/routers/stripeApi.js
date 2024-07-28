const config = require("../../config.json")
const stripe = require("stripe")(config.tokenStripe);
const api = require("express")()


api.post("/pagamento", async(req, res) => {
  try {
    const {valorUnity} = req.body
    const centavos = (valorUnity * 100)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Comidas caseiras",
            },
            unit_amount: centavos,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8080/home",
      cancel_url: "https://www.invertexto.com/gerador-email-temporario",
    });
    const {url} = session
    res.status(201).send({link: "the payment link has been generated",linkToken:url,  status: 201})
  } catch (error) {
    console.log(error);
    res.status(401).send({msg: "the link was not generated, try again."})
  }
});

module.exports = api

