
class codigoConfirmacao{
  static #input = document.querySelector("input").value
  static #button = document.querySelector("button")

  static async #confirmarCodigo(){
    try {
      const data = await fetch("http://localhost:8080/validar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({codigo: this.#input})
      })
      const {jwt, register} = await data.json()
      localStorage.setItem("jwt", jwt)
      this.#redirecionarPagina(register)
    } catch (error) {
      console.log(error);
    }
  }

  static #redirecionarPagina(response){
    if (response) {
      location.href = "/sistema-pagamento/frontend/index.html"
    }
  }

  static buttonEvento(){
    this.#button.addEventListener("click", () =>{
      codigoConfirmacao.#confirmarCodigo()
    })
  }
}

codigoConfirmacao.buttonEvento()