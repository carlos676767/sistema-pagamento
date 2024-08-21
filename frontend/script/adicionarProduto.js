
const httpRequestNewDados = async() => {
  const nameProduct = document.getElementById("nome")
  const valueProduct = document.getElementById("valor")
  const descricao = document.getElementById("descricao")
  const productimage = document.getElementById("product-image")

  try {
    const httpRequestPost = await fetch("http://localhost:8080/produtos/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: nameProduct.value.trim(), valor: valueProduct.value.trim(), descricao: descricao.value.trim(), url: productimage.value.trim()  }),
    });
    const httpReponse = await httpRequestPost.json()
    console.log(httpReponse);
    limparInputs(nameProduct, valueProduct, descricao, productimage)
  } catch (error) {
    console.log(error);
  }
}

const buttomHttppost = document.querySelector("button")
buttomHttppost.addEventListener("click", (e) => {
  (async() => {
    await httpRequestNewDados()
  })()
  e.preventDefault()
})

function limparInputs(input1, input2, input3, input4) {
   input1.value = "";
   input2.value = ""
   input3.value = ""
   input4.value = ""
}

const manageProductName = document.getElementById("manage-product-name")
const updateProductPrice = document.getElementById("update-product-price")
const managebtn = document.querySelector(".manage-btn")





managebtn.addEventListener("click", async(e) => {
  e.preventDefault()
  try {
    const httpRequestAttItem = await fetch("http://localhost:8080/db/editProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({nome: manageProductName.value, valor: updateProductPrice.value })
      
    })
    console.log(updateProductPrice.value, manageProductName.value);
    const httpRequestResponse = await httpRequestAttItem.json()
    if (httpRequestResponse.status) {
      alertaProdutoAtt()
      return
    }
    alertaProductInvalid()
  } catch (error) {
    
  }
})


const alertaProdutoAtt = () => {
  Swal.fire({
    title: "Sucesso!",
    text: "O valor do produto foi atualizado com sucesso.",
    icon: "success",
    confirmButtonText: "OK",
  });
};

const alertaProductInvalid = () => {
  Swal.fire({
    title: "Erro!",
    text: "O nome do produto não foi encontrado na base de dados.",
    icon: "error",
    confirmButtonText: "OK",
  });
};
const deletebtn = document.querySelector(".delete-btn")
const myModal = document.getElementById("myModal")
const closer = document.querySelector(".close")



function displayButton(estado) {
  myModal.style.display = estado
}



deletebtn.addEventListener("click", () => {
  displayButton("block")
})

console.log(closer);
closer.addEventListener("click", () => {
  displayButton("none")
})