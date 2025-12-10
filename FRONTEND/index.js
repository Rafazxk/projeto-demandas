const token = localStorage.getItem("token");

let decoded = null;
try {
  decoded = jwt_decode(token);
  console.log("Usuário:", decoded.id, " | Tipo:", decoded.tipo, "nome: ", decoded.nome);
} catch {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

let listaDemandas = [];
const API_URL = "http://localhost:3000/demandas";

// Carrega na interface
function atualizarDashboard(){
  document.getElementById('qtd_abertas').textContent =
    listaDemandas.filter(d=>d.status=="aberta").length;

  document.getElementById('qtd_andamento').textContent =
    listaDemandas.filter(d=>d.status=="andamento").length;

  document.getElementById('qtd_finalizadas').textContent =
    listaDemandas.filter(d=>d.status=="finalizada").length;

  document.getElementById('qtd_urgentes').textContent =
    listaDemandas.filter(d=>d.prioridade=="urgente").length;
}

// Renderiza tabela
function carregarDemandas(filtro=null){
  let tabela = document.getElementById('tabela-demandas');
  tabela.innerHTML = "";

  listaDemandas
  .filter(d => !filtro || d.status == filtro || d.prioridade == filtro)
  .forEach(d => {
    tabela.innerHTML += `
    <tr>
      <td>${d.id}</td>
      <td>${d.titulo}</td>
      <td>${d.prioridade}</td>
      <td>${d.status}</td>
      <td>
        <button class="btn btnVer" onclick="abrirModal(${d.id})">Ver</button>
      </td>
    </tr>`;
  });
}

// Modal
let demandaSelecionada = null;

function abrirModal(id){
  demandaSelecionada = listaDemandas.find(d => d.id == id);

  document.getElementById("modal_titulo").innerText = demandaSelecionada.titulo;
  document.getElementById("modal_descricao").innerText = demandaSelecionada.descricao;
  document.getElementById("modal_status").value = demandaSelecionada.status;

  document.getElementById("modal").style.display="flex";
}

function fecharModal(){
  document.getElementById("modal").style.display="none";
}

function salvarAlteracoes(){
  demandaSelecionada.status =
    document.getElementById("modal_status").value;

  carregarDemandas();
  atualizarDashboard();
  fecharModal();
}

// pesquisa rápida
function pesquisar(){
  let texto = document.getElementById("pesquisa").value.toLowerCase();
  let tabela = document.getElementById('tabela-demandas');

  tabela.innerHTML = "";
  listaDemandas
    .filter(d=>d.titulo.toLowerCase().includes(texto))
    .forEach(d=>{
      tabela.innerHTML += `
      <tr>
        <td>${d.id}</td>
        <td>${d.titulo}</td>
        <td>${d.prioridade}</td>
        <td>${d.status}</td>
        <td><button class="btn btnVer" onclick="abrirModal(${d.id})">Ver</button></td>
      </tr>`;
    });
}

// inicia ao abrir pagina
carregarDemandas();
atualizarDashboard();