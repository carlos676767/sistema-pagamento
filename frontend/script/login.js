const email = document.getElementById("email");
const senha = document.getElementById("password");

addEventListener("DOMContentLoaded", () => {
  const jwt = localStorage.getItem("jwt");
  (async () => {
    try {
      const httpRequest = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      const response = await httpRequest.json();
      console.log(response);
      const { login } = response;
      console.log(login);
      if (login) {
        location.href = "/sistema-pagamento/frontend/index.html";
      }
    } catch (error) {
      console.log(error);
    }
  })();
});

function alertValoresVzios() {
  Swal.fire({
    icon: "error",
    title: "Dados Inválidos",
    text: "Por favor, preencha todos os campos.",
    confirmButtonText: "OK",
  });
}

const butom = document.querySelector("button");

butom.addEventListener("click", (e) => {
  (async () => {
    console.log(email.value, senha.value);
    if (email.value.trim() == "" || senha.value == "") {
      alertValoresVzios();
      return;
    }
    try {
      const data = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value, senha: senha.value }),
      });
      const res = await data.json();
      const { jwt } = res;
      if (jwt) {
        location.href = "/sistema-pagamento/frontend/index.html";

        localStorage.setItem("jwt", jwt);
      }
    } catch (error) {
      console.log(error);
    }
  })();

  e.preventDefault();
});

const buttomGitHub = document.querySelector(".btn-github");

async function httpAourh() {
  try {
    const reqhttp = await fetch("http://localhost:8080/loginGitHub");
    const data = await reqhttp.json();
    const { link } = data;
    location.href = link;
  } catch (error) {
    console.log(error);
  }
}

buttomGitHub.addEventListener("click", () => {
  httpAourh();
});
