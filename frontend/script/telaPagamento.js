const jwt = localStorage.getItem("tokenId");
const valorFinal = document.createElement("p");
const orderDetails = document.querySelector(".order-details");
const cepInput = document.getElementById("cep")
const calcFreteBtn = document.getElementById('calcFreteBtn')
let freteValue = 0
const textoFrete = document.getElementById("frete")
const btn = document.querySelector(".pay-btn");
function mostrarElemntos(item, valor) {
  const txtPay = document.createElement("p");
  txtPay.innerHTML = `<strong>${item}</strong> - ${valor} `;
  orderDetails.appendChild(txtPay);
}

function mostrarValorCompraFinal() {
  valorFinal.innerHTML = `<strong>Total a Pagar:</strong> R$ ${sumValue.toFixed(2)}`;
  textoFrete.innerHTML = `<strong>Frete: </strong> ${freteValue.toFixed(2)} `
  orderDetails.appendChild(valorFinal);
}

function tempExpiedAlert() {
  Swal.fire({
    icon: 'warning',
    title: 'Tempo de pagamento expirado!',
    text: 'Faça uma nova solicitação com os produtos.',
    confirmButtonText: 'OK',
  });
}

const tempExpiredFuncftion = (temp) => {
  if (temp == true) {
    setTimeout(() => {
      tempExpiedAlert()
      location.href = "../index.html"
    }, 3000)
  }
}
let sumValue = 0;
async function getItensFromApi() {
  try {
    const data = await fetch("http://localhost:8080/verifyTokenPay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwt: jwt }),
    });

    const { itens, tempExpired } = await data.json();
    const getFrete = await  fetchFreightByCity()
    freteValue = getFrete
    tempExpiredFuncftion(tempExpired)
    itens.forEach((itens) => {
      const { nome, valor } = itens;
      mostrarElemntos(nome, valor);
      sumValue += valor + getFrete;
    });
    mostrarValorCompraFinal();
    return itens;
  } catch (error) {
    console.log(error);
  }
}


const gerarLinkPayBoletoECartao = async () => {
  try {
    const getFrete = await  fetchFreightByCity ()
    console.log(getFrete);
    const aguardarIds = await getItensFromApi();
    const listIds = aguardarIds.map((ids) => ids._id);
    const data = await fetch("http://localhost:8080/pagamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: listIds, frete: getFrete }),
    });
    const { linkToken } = await data.json();
    location.href = linkToken
  } catch (error) {
    console.log(error);
  }
};

const fetchFreightByCity  = async () => {
  const response = await fetch("http://localhost:8080/frete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cidade: cepInput.value }),
  });
  const data = await response.json();
  const {frete} = data
  return frete
};

calcFreteBtn.addEventListener("click", () => {
  getItensFromApi();
})


btn.addEventListener("click", () => {
  gerarLinkPayBoletoECartao();
});
