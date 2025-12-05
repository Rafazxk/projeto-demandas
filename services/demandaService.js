const db = require("../database/database")

  // titulo - texto 
  // descrição - texto 
  // prioridade - urgente, 
  // setor - administrativo, financeiro
  // anexo - anexar arquivo pdf 
  
  async function listarDemandasService(usuario_id){
    const [rows] = await db.query("SELECT * FROM demandas WHERE usuario_id = ?", [usuario_id]);
    
    return rows;
  }
async function criarDemandaService(usuario_id, titulo, descricao, prioridade, setor, anexo) {
  const [result] = await db.query(
    "INSERT INTO demandas (usuario_id, titulo, descricao, prioridade, setor, anexo) VALUES (?, ?, ?, ?, ?, ?)",
    [usuario_id, titulo, descricao, prioridade, setor, anexo]
  );

  return result;
}

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