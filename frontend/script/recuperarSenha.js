const input = document.querySelector("input");
const buttom = document.querySelector("button");
const container = document.querySelector(".container");

buttom.addEventListener("click", (e) => {
  (async () => {
    try {
      const data = await fetch("http://localhost:8080/recuperarSenha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: input.value }),
      });
      const httpRequest = await data.json();
      const { sendEmail } = httpRequest;
      if (sendEmail) {
        alert("Por favor olhe seu endereco de email.")
        
      }else{
        alert("email incorreto.")
      }
    } catch (error) {
      console.log(error);
    }
  })();
  e.preventDefault();
});

