// import ConexaoMySql from "../database/ConexaoMySql.js";

// class UsuariosController {
//   async adicionar(req, res) {
//     try {
//       const { nome, email, senha } = req.body;
//       console.log("nome: ", nome)

//       if (!nome || !email || !senha) {
//         res.status(400).send("Os campos nome, email e senha são obrigatórios.");
//         return;
//       }

//       const conexao = await new ConexaoMySql().getConexao();
//       const comandoSql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, MD5(?))";
//       await conexao.execute(comandoSql, [nome, email, senha]);

//       res.status(201).send("Usuário cadastrado com sucesso.");
//     } catch (error) {
//       if (error.code === "ER_DUP_ENTRY") {
//         res.status(400).send("Email já cadastrado.");
//       } else {
//         res.status(500).send("Erro ao cadastrar usuário.");
//       }
//     }
//   }

//   async listar(req, res) {
//     try {
//       const conexao = await new ConexaoMySql().getConexao();
//       const [resultado] = await conexao.execute("SELECT id, nome, email FROM usuarios");
//       res.send(resultado);
//     } catch (error) {
//       res.status(500).send("Erro ao listar usuários.");
//     }
//   }

//   async atualizar(req, res) {
//     try {
//       const { id, nome, email } = req.body;

//       if (!id || !nome || !email) {
//         res.status(400).send("Os campos id, nome e email são obrigatórios.");
//         return;
//       }

//       const conexao = await new ConexaoMySql().getConexao();
//       const comandoSql = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";
//       await conexao.execute(comandoSql, [nome, email, id]);

//       res.send("Usuário atualizado com sucesso.");
//     } catch (error) {
//       res.status(500).send("Erro ao atualizar usuário.");
//     }
//   }

//   async excluir(req, res) {
//     try {
//       const { id } = req.params;
//       const conexao = await new ConexaoMySql().getConexao();
//       const comandoSql = "DELETE FROM usuarios WHERE id = ?";
//       await conexao.execute(comandoSql, [id]);

//       res.send("Usuário excluído com sucesso.");
//     } catch (error) {
//       res.status(500).send("Erro ao excluir usuário.");
//     }
//   }
// }

// export default UsuariosController;

import ConexaoMySql from "../database/ConexaoMySql.js";
import UsuariosService from "../services/UsuariosService.js";

class UsuariosController {
  async adicionar(req, res) {
    try {
      const { cnpj, nome_empresa, nome, email, senha } = req.body;
      console.log("nome: ", nome);
      const service = new UsuariosService();

      // if (!cnpj || !nome_empresa || !nome || !email || !senha) {
      //   res.status(400).send("Os campos Nome da Empresa, CNPJ, nome, email e senha são obrigatórios.");
      //   return;
      // }

      const cnpjLimpo = cnpj.replace(/\D/g, "");
      if (cnpjLimpo.length !== 14) {
        res.status(400).send("CNPJ inválido. Deve conter 14 dígitos.");
        return;
      }

      if (!email.includes("@") || !email.includes(".com")) {
        res.status(400).send("Formato de Email inválido!");
        return;
      }

      if (!senha || senha.length < 6) {
        res
          .status(400)
          .send("Senha inválida. Deve ter pelo menos 6 caracteres.");
        return;
      }
      //  -------------------------- PARA FAZER O TESTE --------------------------
      if (!service.validarUsuario(req.body)) {
        res
          .status(400)
          .send(
            "Os campos Nome da Empresa, CNPJ, nome, email e senha são obrigatórios."
          );
        return;
      }
      //  -------------------------- FIM PARA FAZER O TESTE --------------------------
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO usuarios (nome, email, senha,cnpj, nome_empresa) VALUES (?, ?, MD5(?),?,?)";
      await conexao.execute(comandoSql, [
        nome,
        email,
        senha,
        cnpj,
        nome_empresa,
      ]);

      res.status(201).send("Usuário cadastrado com sucesso.");
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        res.status(400).send("Email já cadastrado.");
      } else {
        res.status(500).send("Erro ao cadastrar usuário.");
      }
    }
  }
  async listar(req, res) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const [resultado] = await conexao.execute(
        "SELECT id, nome, email FROM usuarios"
      );
      res.send(resultado);
    } catch (error) {
      res.status(500).send("Erro ao listar usuários.");
    }
  }

  async atualizar(req, res) {
    try {
      const { id, nome, email } = req.body;

      if (!id || !nome || !email) {
        res.status(400).send("Os campos id, nome e email são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";
      await conexao.execute(comandoSql, [nome, email, id]);

      res.send("Usuário atualizado com sucesso.");
    } catch (error) {
      res.status(500).send("Erro ao atualizar usuário.");
    }
  }

  async excluir(req, res) {
    try {
      const { id } = req.params;
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM usuarios WHERE id = ?";
      await conexao.execute(comandoSql, [id]);

      res.send("Usuário excluído com sucesso.");
    } catch (error) {
      res.status(500).send("Erro ao excluir usuário.");
    }
  }
}

export default UsuariosController;
