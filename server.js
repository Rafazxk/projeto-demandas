// help desk 
// 3 camadas 
 // 1 - usuario comum 
 // 2 - tecnico 
 // 3 administrador
 const morgan = require("morgan");
 const express = require("express"); 
 const app = express();
 const cors = require("cors");
 
 app.use(express.json());
 app.use(morgan("dev"));
 app.use(cors({
   origin: "*",
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"]
 }));
 
 const demandaRouter = require('./routes/demandaRouter');
 const usuarioRouter = require("./routes/usuarioRouter");
 
 app.use("/usuarios", usuarioRouter);
 app.use('/demandas', demandaRouter);
 
 const PORT = 3000;
 
 app.listen(PORT, '0.0.0.0', () => console.log("server rodando na porta: ", PORT));
 