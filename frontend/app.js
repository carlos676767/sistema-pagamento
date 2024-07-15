(async () => {
  try {
    const data = await fetch("http://localhost:8080/dbDelete/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: "uva" }),
    });
    const res = await data.json()
    console.log(res);
  } catch (error) {
    console.log(error);
  }
})();
