const express = require("express");
const router = express.Router();
const verifyJWT = require('../middleware/middleware');

const {
 listarDemandas,
 criarDemanda,
 editarDemanda
} = require("../controllers/demandaController");


router.get("/", verifyJWT, listarDemandas);
router.post("/", verifyJWT, criarDemanda);
router.put("/:id", verifyJWT, editarDemanda);

module.exports = router;