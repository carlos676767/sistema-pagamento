(async () => {
  try {
    const data = await fetch("http://localhost:8080/db/editProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: "uva", valor: 25554 }),
    });
    const res = await data.json()
    console.log(res);
  } catch (error) {
    console.log(error);
  }
})();
