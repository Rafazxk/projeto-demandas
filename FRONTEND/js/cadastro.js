function toggleCard(cardId) {
    const loginCard = document.getElementById("loginCard");
    const cadastroCard = document.getElementById("cadastroCard");
    
    if(cardId === "cadastroCard") {
        loginCard.style.display = "none";
        cadastroCard.style.display = "flex";
    } else {
        cadastroCard.style.display = "none";
        loginCard.style.display = "flex";
    }
}

const token = localStorage.getItem("token")
let decoded = null;
try {
  decoded = jwt_decode(token);
  console.log("Usuário:", decoded.id, " | Tipo:", decoded.tipo);
} catch {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
}

function redirecionarPorTipo() {
  const destino = {
    admin: "../views/admin.html",
    usuario: "../views/usuario.html",
    tecnico: "../views/tecnico.html"
  }[decoded.tipo];

  if (destino && !window.location.href.includes(destino)) {
    window.location.href = destino;
  }
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  const response = await fetch("http://localhost:3000/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || "Erro no login");
    return;
  }

if(response){
  console.log(token)
}
  // salva o token
  localStorage.setItem("token", data.token);
  
  // redireciona
  
  redirecionarPorTipo();
  }


if(token){
  window.location.href = redirecionarPorTipo();
}
// Simulação de cadastro
async function cadastrar() {
    const nome = document.getElementById("cadNome").value;
    const email = document.getElementById("cadEmail").value;
    const senha = document.getElementById("cadSenha").value;

    if(!nome || !email || !senha) {
        alert("Preencha todos os campos");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha, nome })
        });

        const data = await response.json();

        if(response.ok) {
            alert("Cadastro realizado com sucesso!");
            toggleCard("loginCard"); 
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor");
    }
}
if(token){
  console.log(token)
}