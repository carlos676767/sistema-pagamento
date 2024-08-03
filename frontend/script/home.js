

const div = document.querySelector(".checkout")
const span = document.querySelector("span")
const produtosContainer = document.querySelector('[data-js="produtos-container"]')
const itens = document.querySelector(".itens")
const arrayItens = []
const telaPagamento = document.querySelector(".fimPay")
produtosContainer.addEventListener("click", (e) => {
  const elementClick = e.target;
    if (elementClick.tagName !== "BUTTON") {
      return;
    }
    const idItem = elementClick.dataset.target;
    arrayItens.push(idItem)
    console.log(arrayItens);

    // const produto = document.querySelector(`[data-id="${idItem}"]`).dataset
    // const element = `<p>${produto.nome} - ${produto.preco}</p>`
    // console.log(produto.nome);
    // itens.innerHTML += element
    // alert(`${produto}`)
});


telaPagamento.addEventListener("click", () => {
  (async() => {
    if (arrayItens.length == 0) {
      alert("para ir ao pagamento selecione pelo o menos um item")
      return
    }
    try {
      const httpRequest = await fetch("http://localhost:8080/idProduct", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ids: arrayItens})
      })
      const httpResponse = await httpRequest.json()
      console.log( httpResponse.msg);
      localStorage.setItem("tokenId", httpResponse.msg)
      location.href = "telaPagamento.html"
    } catch (error) {
      console.log(error);
    }
  })()
})


const httpRequestPayMent = async (valor) => {
  try {
    const data = await fetch("http://localhost:8080/pagamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({valorUnity: valor})
    });
    const httpReponse = await data.json();
    const {linkToken} = httpReponse
    location.href = linkToken
  } catch (error) {
    console.log(error);
  }
};


addEventListener("DOMContentLoaded", () => {
  (async () => {
    const httpGet = await fetch("http://localhost:8080/db/listProdutos");
    const httpTrzerDados = await httpGet.json();
    httpTrzerDados.list.forEach((dados) => {
     const { nome, valor, descricao, _id, url } = dados
     produtosContainer.innerHTML += `
     <div class="cart" data-nome=${nome} , data-preco=${valor} data-id=${_id}>
     <div class="product">
         <img src=${url} alt="Produto 1">
         <div class="details">
           <h2 class="textNameItem">${nome}</h2>
           <p>${descricao}.</p>
           <p class="price" class="ValueItem">${valor}</p>
           <button class="buttomCard"  data-target=${_id}><i class="fas fa-trash-alt"></i> add</button>
         </div>
  </div>  
     `;
    });
    // httpRequestPayMent(44444)
  })();
});