const db = require("../database/database");
const jwt = require("jsonwebtoken");
const token = require("dotenv").config();

const blacklist = {};

//listar usuarios 
// admin 
async function listarUsuariosService(){
  const [rows] = await db.query("SELECT * FROM usuarios");
  
  return rows;
}

//função do usuario 
// cadastro - formulario

async function criarUsuarioService(nome, email, senha){
  const [result] = await db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha]);
    
    return result.insertId;
}

// editar usuario 
// editar usuario -> fazer requisição para o tecnico ou adm 
// mudar email ou senha

async function editarUsuarioService(id, nome){
  const [result] = await db.query("UPDATE usuarios SET nome = ? WHERE id = ?", [ nome, id]);
  
  return result.affectedRows;
}

// deletar - admin

async function deletarUsuarioService(id){
  const [result] = await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
  
  return result;
}

// função do usuario 
// logar formulario

async function loginUsuarioService(email, senha){
  
  const sql = "SELECT * FROM usuarios WHERE email = ?";
  const [rows] = await db.query(sql, [email]);

  const usuario = rows[0];

  if (!usuario) {
    throw new Error("usuário não encontrado");
  }

  if (usuario.senha !== senha) {
    throw new Error("senha inválida");
  }

  const token = jwt.sign(
  {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo 
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
  
  return { token };
}

module.exports = {
  listarUsuariosService,
  criarUsuarioService,
  editarUsuarioService,
  deletarUsuarioService,
  loginUsuarioService 
}