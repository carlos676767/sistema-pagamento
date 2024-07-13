(async () => {
  try {
    const data = await fetch("http://localhost:8080/produtos/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: "banana", valor: 1144111, descricao: 'aaaaaaaa' }),
    });
    const res = await data.json()
    console.log(res);
  } catch (error) {
    console.log(error);
  }
})();
