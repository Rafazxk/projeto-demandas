const express = require("express");
const router = express.Router();


const {
  listarUsuarios,
  criarUsuario,
  editarUsuario,
  login,
  deletarUsuario
} = require("../controllers/usuarioController");

router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", deletarUsuario);

router.post("/login", login);

module.exports = router;