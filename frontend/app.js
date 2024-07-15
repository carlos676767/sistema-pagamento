(async () => {
  try {
    const data = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: "",email: "", senha: "" }),
    });
    const res = await data.json()
    console.log(res);
  } catch (error) {
    console.log(error);
  }
})();
