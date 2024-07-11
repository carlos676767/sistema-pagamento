

(async() => {
    try {
        const data = await fetch("http://localhost:8080/produtos/db", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({nome: "banana", valor: 11111})
        })

    } catch (error) {
        console.log(error);
    }
})()