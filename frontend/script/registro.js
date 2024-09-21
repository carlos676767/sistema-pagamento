class Registro {
  static buttom = document.querySelector("button");
  static form = document.querySelector("form");
   
  static async requisicaoRegistroUser() {
    try {
      const dados = {
        nome: this.form.nome.value.trim(),
        email: this.form.email.value.trim(),
        senha: this.form.senha.value.trim(),
      };

      const data = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const { registerParser } = data.json();
      this.redirectPagina(registerParser);
    } catch (error) {
      console.log(error);
    }
  }

  static redirectPagina(response) {
    if (response) {
      location.href = "/sistema-pagamento/frontend/code.html";
    }
  }

  static buttonEvent() {
    this.buttom.addEventListener("click", () => {
      Registro.requisicaoRegistroUser();
    });
  }
}

Registro.buttonEvent();
