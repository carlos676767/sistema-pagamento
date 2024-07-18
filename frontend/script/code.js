

const input = document.querySelector("input")
const butom = document.querySelector("button")

  
butom.addEventListener("click", () => {
  (async () => {
    try {
      const httpRequest = await fetch("http://localhost:8080/validar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({codigo: input.value})
      });
      const response = await httpRequest.json()
      console.log(response);
    } catch (error) {
        console.log(error);
        alert('ocorreu um erro inesperado http from.')
    }
  })();
});


