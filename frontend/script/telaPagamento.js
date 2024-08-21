const jwt = localStorage.getItem("tokenId");
const valorFinal = document.createElement("p");
const orderDetails = document.querySelector(".order-details");

const btn = document.querySelector(".pay-btn");
function mostrarElemntos(item, valor) {
  const txtPay = document.createElement("p");
  txtPay.innerHTML = `<strong>${item}</strong> - ${valor}`;
  orderDetails.appendChild(txtPay);
}

function mostrarValorCompraFinal() {
  valorFinal.innerHTML = `<strong>Total a Pagar:</strong> R$ ${sumValue}`;
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
    console.log(temp);
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
    tempExpiredFuncftion(tempExpired)
    itens.forEach((itens) => {
      const { nome, valor } = itens;
      mostrarElemntos(nome, valor);
      sumValue += valor;
    });
    mostrarValorCompraFinal();
    return itens;
  } catch (error) {
    console.log(error);
  }
}

getItensFromApi();

const gerarLinkPayBoletoECartao = async () => {
  try {
    const aguardarIds = await getItensFromApi();
    const listIds = aguardarIds.map((ids) => ids._id);
    const data = await fetch("http://localhost:8080/pagamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: listIds }),
    });
    const { linkToken } = await data.json();
    location.href = linkToken
  } catch (error) {
    console.log(error);
  }
};



btn.addEventListener("click", () => {
  gerarLinkPayBoletoECartao();
});
