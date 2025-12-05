const {
  //funções do service
  listarUsuariosService,
  criarUsuarioService,
  editarUsuarioService,
  loginUsuarioService,
  deletarUsuarioService
  } = require('../services/usuarioService');
  
  async function listarUsuarios(req, res){
    try 
    {
      const usuarios = await listarUsuariosService();
      if(usuarios){
        return res.status(200).json(usuarios);
        console.log("listar usuarios funcionou - controller");
      }
    } catch(error){
      console.error("erro no servidor: ", error);
    }
  }
  
  async function criarUsuario(req, res){
    try{
      const {nome, email, senha} = req.body;
    if(!nome || !email || !senha){
      return res.status(400).json({error: "nome, email e senha são obrigatórios "});
      }
      
      const usuario = await criarUsuarioService(nome, email, senha);
      
      return res.status(200).json({message: "criar usuario funcionou - controller"});
    }catch(error){
      console.error("erro ao tentar criar usuario: ", error);
    }
  }
  
async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "nome é obrigatório! " });
    }

    const linhasAfetadas = await editarUsuarioService(id, nome);

 console.log("BODY RECEBIDO: ", req.body);

    return res.status(200).json({
      message: "nome alterado com sucesso!",
      linhasAfetadas
    });

  } catch (error) {
    console.error("erro no servidor:", error);
    return res.status(500).json({ error });
  }
}

async function deletarUsuario(req, res){
  try{
    const { id } = req.params;
    
    const linhasAfetadas = await deletarUsuarioService(id);
    
    return res.status(200).json({message: "usuario deletado com sucesso! ",
      linhasAfetadas
    });
  }catch (error) {
    console.error("erro no servidor:", error);
    return res.status(500).json({ error });
  } 
}

async function login(req, res){
  try {
    const { email, senha } = req.body;

    const result = await loginUsuarioService(email, senha);

    return res.status(200).json({
      message: "login realizado com sucesso",
      token: result.token
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

  module.exports = {
    listarUsuarios,
    criarUsuario,
    editarUsuario,
    login,
    deletarUsuario
  }