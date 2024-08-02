const div = document.querySelector(".checkout")
const span = document.querySelector("span")
const produtosContainer = document.querySelector('[data-js="produtos-container"]')
let contador = 0
const itens = document.querySelector(".itens")


const countItem = () => {
  ++contador
  span.innerText = `(${contador})`
}



const httpRequestNewDados = async() => {
  const nameProduct = document.getElementById("nome")
  const valueProduct = document.getElementById("valor")
  const descricao = document.getElementById("descricao")

  try {
    const httpRequestPost = await fetch("http://localhost:8080/produtos/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: nameProduct.value.trim(), valor: valueProduct.value.trim(), descricao: descricao.value.trim() }),
    });
    const httpReponse = await httpRequestPost.json()
    limparInputs(nameProduct, valueProduct, descricao)
  } catch (error) {
    console.log(error);
  }
}

const buttomHttppost = document.getElementById("buttomHttppost")
buttomHttppost.addEventListener("click", (e) => {
  (async() => {
    await httpRequestNewDados()
  })()
  e.preventDefault()
})

function limparInputs(input1, input2, input3) {
   input1.value = "";
   input2.value = ""
   input3.value = ""
}

produtosContainer.addEventListener("click", (e) => {
  const elementClick = e.target;
    if (elementClick.tagName !== "BUTTON") {
      return;
    }
    const idItem = elementClick.dataset.target;
    const produto = document.querySelector(`[data-id="${idItem}"]`).dataset
    const element = `<p>${produto.nome} - ${produto.preco}</p>`
    itens.innerHTML += element
    httpRequestPayMent(produto.preco)
    countItem();
});


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
     const { nome, valor, descricao, _id } = dados
     produtosContainer.innerHTML += `
     <div class="grid-item" data-nome=${nome} , data-preco=${valor} data-id=${_id}>
     <div class="grid-item">
         <img src="assets/images/image-baklava-desktop.jpg" alt="">
      
         <div class="comprar">
             <button class="buttomCard" data-target=${_id}><img src="assets/images/icon-add-to-cart.svg" alt="cart"
              class="cart">Add To Cart</button>
    
         </div>
     </div>
     <div class="itensValue">
         <p class="textNameItem">${nome}</p>
         <p class="ValueItem">$ ${valor}</p>
     </div>
 </div>
     `;
    });
  })();
});