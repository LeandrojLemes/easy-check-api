import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || "3306",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PWD || "*Ols2024",
  database: process.env.MYSQL_DB || "api-easy-check",
 };
 

class ConexaoMySql {
  async getConexao() {
    if (!ConexaoMySql.conexao) {
      ConexaoMySql.conexao = await mysql.createConnection(dbConfig);
    }
    return ConexaoMySql.conexao;
  }
}
export default ConexaoMySql;
