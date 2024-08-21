const div = document.querySelector(".checkout");
const span = document.querySelector("span");
const produtosContainer = document.querySelector(
  '[data-js="produtos-container"]'
);
const itens = document.getElementById("cartItems");
const arrayItens = [];
const telaPagamento = document.querySelector(".fimPay");
const cartModal = document.getElementById("cartModal");
const carrinho = document.getElementById("cart");
produtosContainer.addEventListener("click", (e) => {
  const elementClick = e.target;
  if (elementClick.tagName !== "BUTTON") {
    return;
  }
  const idItem = elementClick.dataset.target;

  const produto = document.querySelector(`[data-id="${idItem}"]`).dataset;
  const element = `<li><i class="fas fa-box"></i> ${produto.nome} - <i class="fas fa-dollar-sign"></i>${produto.preco} </li>`;
  if (!arrayItens.includes(idItem)) {
    arrayItens.push(idItem);
    itens.innerHTML += element;
    console.log(arrayItens);
  }
});

carrinho.addEventListener("click", () => {
  fecharModalEabrir("block");
});

const closer = document.querySelector(".close");
const fecharModalEabrir = (value) => {
  cartModal.style.display = value;
};
closer.addEventListener("click", () => {
  fecharModalEabrir("none");
});

const closeModalBtn = document.getElementById("closeModalBtn");
closeModalBtn.addEventListener("click", () => {
  fecharModalEabrir("none");
});

function alertProductVazio() {
  Swal.fire({
    icon: 'warning',
    title: 'Adicione pelo menos 1 item',
    text: 'Você precisa selecionar ao menos um item para prosseguir.',
    confirmButtonText: 'OK',
  });
}


telaPagamento.addEventListener("click", () => {
  (async () => {
    if (arrayItens.length == 0) {
      alertProductVazio()
      return;
    }
    try {
      const httpRequest = await fetch("http://localhost:8080/idProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: arrayItens }),
      });
      const httpResponse = await httpRequest.json();
      console.log(httpResponse);
      localStorage.setItem("tokenId", httpResponse.msg);
      location.href = "telaPagamento.html";
    } catch (error) {
      console.log(error);
    }
  })();
});

addEventListener("DOMContentLoaded", () => {
  (async () => {
    const httpGet = await fetch("http://localhost:8080/db/listProdutos");
    const httpTrzerDados = await httpGet.json();
    httpTrzerDados.list.forEach((dados) => {
      const { nome, valor, descricao, _id, url } = dados;
      produtosContainer.innerHTML += `
     <div class="cart" data-nome=${nome} , data-preco=${valor} data-id=${_id}>
     <div class="product">
         <img src=${url} alt="Produto 1" class="img">
         <div class="details">
           <h2 class="textNameItem">${nome}</h2>
           <p>${descricao}.</p>
           <p class="price" class="ValueItem">${valor}</p>
            <button class="buttomCard"  data-target=${_id}> Adicionar <i class="fas fa-shopping-cart"></i></button>
         </div>
  </div>  
     `;
    });
  })();
});




addEventListener("DOMContentLoaded", () => {
  const jwt = localStorage.getItem("jwt")
  console.log(jwt);
  (async() => {
    const reqhttpValideToken = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({jwt: jwt})
    })
    const aguardeResHttp = await reqhttpValideToken.json()
    console.log(aguardeResHttp);
  })()
})

// httpRequestPayMent(44444)
