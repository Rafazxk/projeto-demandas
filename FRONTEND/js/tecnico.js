
// receber demandas 

  // validar demandas
  // const URL = "http://localhost:3000/tecnico";
  // const API_URL = "http://localhost:3000/demandas";
 
  
async function carregarDemandas() {
  try {

    const res = await fetch("http://localhost:3000/demandas", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json"
    }
  });
  
  
    const demandas = await res.json();
  
  
  console.log("resposta do servidor:", demandas)  
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    demandas.forEach(t => {
      const div = document.createElement("div");
      div.innerHTML = `
        <b>ID:</b> ${t.id} 
        <b>Título:</b> ${t.titulo} 
        <button onclick="editar(${t.id}, '${t.titulo}')">Editar</button>
        <button onclick="excluir(${t.id})">Excluir</button>
      `;
      lista.appendChild(div);
    });

  } catch (err) {
    console.error("Erro ao carregar demandas:", err);
    alert("Erro ao carregar demandas.");
  }
}
carregarDemandas();