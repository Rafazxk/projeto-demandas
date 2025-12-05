// helpdesk -> database 

// criar a conexão com o banco de dados e retornar caso seja verdadeiro 

const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rafazx251",
  database: "helpdesk"
})

if(!conexao){
  console.log("erro ao tentar se conectar")
} else{
  console.log("conectado com sucesso");
}

conexao.connect();

module.exports = conexao.promise(); 