const db = require("../database/database")

  // titulo - texto 
  // descrição - texto 
  // prioridade - urgente, 
  // setor - administrativo, financeiro
  // anexo - anexar arquivo pdf 
  
  
  // ESSE ARQUIVO ACESSA DIRETAMENTO O BANCO DE DADOS
  // FAZ CONSULTAS SQL E MANIPULAÇÕES
  
  // listar demandas
  //recebe o id do usuario que esta fazendo a consulta 
  //faz a consulta sql e envia a resposta caso seja retornado verdadeiro
  
  async function listarDemandasService(usuario_id){
    const [rows] = await db.query("SELECT * FROM demandas WHERE usuario_id = ?", [usuario_id]);
    
    return rows;
  }
  
  //criar demandas
  //recebe todos os campos que existem na tabela e faz uma manipulação INSERT para inserir todos os dados em seus respectivos campos
  // depois ele retorna o resultado, caso verdadeiro ou falso

async function criarDemandaService(usuario_id, titulo, descricao, prioridade, setor, anexo) {
  const [result] = await db.query(
    "INSERT INTO demandas (usuario_id, titulo, descricao, prioridade, setor, anexo) VALUES (?, ?, ?, ?, ?, ?)",
    [usuario_id, titulo, descricao, prioridade, setor, anexo]
  );

  return result;
}

// listar demandas 
// recebe todos os campos da tabela e faz uma manipulação UPDATE para editar todos os dados em seus respectivos campos
// apos tudo isso, ele insere um id novo e faz a inserção de uma nova linha na tabela
async function editarDemandaService(
id,
usuario_id,
titulo,
descricao,
prioridade,
setor,
anexo)
{
  const [result] = await db.query(
    "UPDATE demandas SET titulo = ?, descricao = ?, prioridade = ?, setor = ?, anexo = ? WHERE id = ? AND usuario_id = ?"
    , [
      titulo,
      descricao,
      prioridade,
      setor,
      anexo,
      id,
      usuario_id
      ]);
      return result.affectedRows;
}

module.exports = {
  listarDemandasService,
  criarDemandaService,
  editarDemandaService
}