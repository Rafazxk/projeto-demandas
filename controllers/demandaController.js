// receber funções do arquivo demandaService.js

const {
  listarDemandasService,
  criarDemandaService,
  editarDemandaService
} = require('../services/demandaService');

// listar demandas 
// recebe uma requisição com o id do usuario que está realizando essa função
// e envia uma resposta
// return res.status(200).json(demandas);
async function listarDemandas(req, res){
  try{
    const usuario_id = req.user.id;
    
    const demandas = await listarDemandasService(usuario_id);
    
    return res.status(200).json(demandas);
    }catch (error) {
    console.log("erro no servidor", error);
   }
   console.log("body recebido: ", req.body)
    console.log("user: ", req.user)
  }
  
  
  //criar demandas 
  //recebe a requisição do frontend com o id do usuario selecionado
  // recebe nos parametros os campos que o frontend devera enviar
  //enviar uma resposta de confirmação, caso funcione
async function criarDemanda(req, res) {
  try {
    const usuario_id = req.user.id;
    const { titulo, descricao, prioridade, setor, anexo } = req.body;

    // Validação simples
    
    if (!titulo || !descricao || !prioridade || !setor) {
      return res.status(400).json({ message: "Campos obrigatórios faltando" });
    }

    const result = await criarDemandaService(
      usuario_id,
      titulo,
      descricao,
      prioridade,
      setor,
      anexo
    );

    return res.status(201).json({
      message: "Demanda criada com sucesso!",
      id: result.insertId
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar demanda" });
  }
}


//editar demandas
// responsavel pelo tecnico ou administrador 
//recebe todas as demandas, podendo filtrar, editar ou excluir essas demandas
// apos receber todos os parametros, ele envia uma resposta, caso funcione
async function editarDemanda(req, res){
  try{
  const id = req.params.id;
  const usuario_id = req.user.id;
  const { titulo, descricao, prioridade, setor, anexo} = req.body;
  
  const result = await editarDemandaService(id, usuario_id, titulo, descricao, prioridade, setor, anexo);
    
  return res.json({
      atualizado: result
    });
  }catch (error) {
    console.error("erro no servidor:", error);
    return res.status(500).json({ error });
  }
  console.log("entrou na rota");
}

// exportar para arquivos de fora
module.exports = {
  listarDemandas,
  criarDemanda,
  editarDemanda
}