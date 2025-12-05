// =============================
// CONFIG
// =============================
const API_URL = "http://localhost:3000/demandas";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

// segurança para não quebrar caso o token seja inválido
let decoded = null;
try {
  decoded = jwt_decode(token);
  console.log("Usuário:", decoded.id, " | Tipo:", decoded.tipo);
} catch {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// =============================
// REDIRECIONAMENTO POR TIPO
// admin → admin.html
// usuario → usuario.html
// tecnico → tecnico.html
// =============================
function redirecionarPorTipo() {
  const destino = {
    admin: "../views/admin.html",
    usuario: "../views/usuario.html",
    tecnico: "../views/tecnico.html"
  }[decoded.tipo];

  if (destino && !location.href.includes(destino)) {
    window.location.href = destino;
  }
}

redirecionarPorTipo();

// =============================
// FUNÇÕES AUXILIARES
// =============================
function authHeaders(extra = {}) {
  return {
    Authorization: "Bearer " + token,
    ...extra
  };
}

let demandaEditando = null;

// =============================
// CARREGAR DEMANDAS
// =============================
async function carregarDemandas() {
  try {
    const res = await fetch(API_URL, { headers: authHeaders() });

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    const tarefas = await res.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas.forEach(t => {
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
    console.error(err);
    alert("Erro ao carregar tarefas.");
  }
}

// =============================
// CRIAR
// =============================
async function criarDemanda() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const prioridade = document.getElementById("prioridade").value;
  const setor = document.getElementById("setor").value;
  const anexo = document.getElementById("anexo").checked ? 1 : 0;

  if (!titulo || !descricao || !prioridade || !setor) {
    alert("Todos os campos são obrigatórios");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ titulo, descricao, prioridade, setor, anexo })
  });

  carregarDemandas();
}

// =============================
// EDITAR / SALVAR
// =============================
function editar(id, titulo) {
  demandaEditando = id;
  document.getElementById("editTitulo").value = titulo;
  openModal("modalEditar");
}

async function salvarEdicao() {
  const titulo = document.getElementById("editTitulo").value;

  await fetch(`${API_URL}/${demandaEditando}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ titulo })
  });

  closeModal("modalEditar");
  carregarDemandas();
}

// =============================
// EXCLUIR
// =============================
async function excluir(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  carregarDemandas();
}

// =============================
// MODAL
// =============================
function openModal(id){ document.getElementById(id).style.display="flex"; }
function closeModal(id){ document.getElementById(id).style.display="none"; }

// =============================
// LOGOUT
// =============================
function logout(){
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// =============================
document.addEventListener("submit",(e)=>{ e.preventDefault(); criarDemanda(); });
carregarDemandas();