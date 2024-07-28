

const buttom = document.querySelector("button");
const form = document.querySelector("form");
console.log(location.href);

const httpPost = async () => {
  try {
    const data = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: form.nome.value, email: form.email.value, senha: form.senha.value }),
    });
    const response = await data.json();
    const {registerParser} = response
    if (registerParser) {
      location.href = "/frontend/code.html"
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

buttom.addEventListener("click", (e) => {
  e.preventDefault();
  httpPost();
});
