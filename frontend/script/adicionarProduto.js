
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