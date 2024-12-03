import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.MYSQL_HOST || "autorack.proxy.rlwy.net",
  port: process.env.MYSQL_PORT || "14036",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PWD || "nDTfJUTEBRtGuwHlLhuEILLQUtTqXLNI",
  database: process.env.MYSQL_DB || "railway",
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
