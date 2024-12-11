// import ConexaoMySql from "../database/ConexaoMySql.js";

// class AutenticacaoController {
//   async login(req, res) {
//     try {
//       const { email, senha } = req.body;

//       if (!email || !senha) {
//         return res.status(400).send("Email e Senha são obrigatórios.");
//       }

//       const conexao = await new ConexaoMySql().getConexao();
//       const comandoSql = "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = MD5(?)";
//       const [resultado] = await conexao.execute(comandoSql, [email, senha]);

//       if (resultado.length === 0) {
//         return res.status(401).send("Email ou Senha incorreta.");
//       }

//       res.send(resultado[0]);
//     } catch (error) {
//       console.error("Erro ao realizar login:", error);
//       res.status(500).send("Erro ao realizar login.");
//     }
//   }
// }

// export default AutenticacaoController;
import ConexaoMySql from "../database/ConexaoMySql.js";

class AutenticacaoController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).send("Email e Senha são obrigatórios.");
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = MD5(?)";
      const [resultado] = await conexao.execute(comandoSql, [email, senha]);

      if (resultado.length === 0) {
        return res.status(401).send("Email ou Senha incorreta.");
      }

      res.send(resultado[0]);
    } catch (error) {
      console.error("Erro ao realizar login:", error.message);
      res.status(500).send("Erro ao realizar login.");
    }
  }
}

export default AutenticacaoController;
