import ConexaoMySql from "../database/ConexaoMySql.js";

class UsuariosController {
  async adicionar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      console.log("nome: ", nome)

      if (!nome || !email || !senha) {
        res.status(400).send("Os campos nome, email e senha são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, MD5(?))";
      await conexao.execute(comandoSql, [nome, email, senha]);

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
      const [resultado] = await conexao.execute("SELECT id, nome, email FROM usuarios");
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