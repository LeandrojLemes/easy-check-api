import ConexaoMySql from "../database/ConexaoMySql.js";

class ClienteController {

  async adicionar(req, resp) {
    try {
      const { nome, email, celular, cpf, cargo, pis, cep, rua, numero, bairro, cidade } = req.body;

      if (!nome || !cpf) {
        return resp.status(400).send("Os campos nome e CPF são obrigatórios.");
      }

      const usuarioId = req.usuarioId;
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = `
        INSERT INTO clientes (
          nome, email, celular, cpf, cargo, pis, cep, rua, numero, bairro, cidade, usuario_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [resultado] = await conexao.execute(comandoSql, [
        nome,
        email,
        celular,
        cpf,
        cargo,
        pis,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        usuarioId,
      ]);

      resp.status(201).send({
        message: "Cliente cadastrado com sucesso!",
        clienteId: resultado.insertId,
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        resp.status(400).send("CPF já cadastrado.");
        return;
      }
      console.error("Erro ao cadastrar cliente:", error);
      resp.status(500).send("Erro ao cadastrar cliente.");
    }
  }

  async buscarPorId(req, resp) {
    try {
      const clienteId = req.params.id;
      const usuarioId = req.usuarioId;

      if (!clienteId) {
        return resp.status(400).send("ID do cliente é obrigatório.");
      }

      const conexao = await new ConexaoMySql().getConexao();
      const [resultado] = await conexao.execute(
        "SELECT * FROM clientes WHERE id_cliente = ? AND usuario_id = ?",
        [clienteId, usuarioId]
      );

      if (resultado.length === 0) {
        return resp.status(404).send("Cliente não encontrado.");
      }

      resp.send(resultado[0]);
    } catch (error) {
      console.error("Erro ao buscar cliente por ID:", error);
      resp.status(500).send("Erro ao buscar cliente.");
    }
  }

  async listar(req, resp) {
    try {
      const usuarioId = req.usuarioId;

      const conexao = await new ConexaoMySql().getConexao();
      const [resultado] = await conexao.execute(
        "SELECT * FROM clientes WHERE usuario_id = ?",
        [usuarioId]
      );

      resp.send(resultado);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      resp.status(500).send("Erro ao listar clientes.");
    }
  }

  async atualizar(req, resp) {
    try {
      const clienteId = req.params.id;
      const usuarioId = req.usuarioId;
      const { nome, email, celular, cpf, cargo, pis, cep, rua, numero, bairro, cidade } = req.body;

      if (!clienteId || !nome || !cpf) {
        return resp.status(400).send("Os campos nome e CPF são obrigatórios.");
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = `
        UPDATE clientes 
        SET nome = ?, email = ?, celular = ?, cpf = ?, cargo = ?, pis = ?, cep = ?, rua = ?, numero = ?, bairro = ?, cidade = ? 
        WHERE id_cliente = ? AND usuario_id = ?
      `;

      const [resultado] = await conexao.execute(comandoSql, [
        nome,
        email,
        celular,
        cpf,
        cargo,
        pis,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        clienteId,
        usuarioId,
      ]);

      if (resultado.affectedRows === 0) {
        return resp.status(404).send("Cliente não encontrado ou não autorizado.");
      }

      resp.send("Cliente atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      resp.status(500).send("Erro ao atualizar cliente.");
    }
  }

  async excluir(req, resp) {
    try {
      const clienteId = req.params.id;
      const usuarioId = req.usuarioId;

      if (!clienteId) {
        return resp.status(400).send("ID do cliente é obrigatório.");
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM clientes WHERE id_cliente = ? AND usuario_id = ?";

      const [resultado] = await conexao.execute(comandoSql, [clienteId, usuarioId]);

      if (resultado.affectedRows === 0) {
        return resp.status(404).send("Cliente não encontrado ou não autorizado.");
      }

      resp.send("Cliente excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      resp.status(500).send("Erro ao excluir cliente.");
    }
  }

 
  async buscarPorCpf(req, resp) {
    const { cpf } = req.params;
    const usuarioId = req.usuarioId;

    if (!cpf) {
      return resp.status(400).send("CPF é obrigatório.");
    }

    try {
      const conexao = await new ConexaoMySql().getConexao();
      const [resultado] = await conexao.execute(
        "SELECT * FROM clientes WHERE cpf = ? AND usuario_id = ?",
        [cpf, usuarioId]
      );

      if (resultado.length === 0) {
        return resp.status(404).send("Cliente não encontrado.");
      }

      resp.status(200).json(resultado[0]);
    } catch (error) {
      console.error("Erro ao buscar cliente por CPF:", error);
      resp.status(500).send("Erro ao buscar cliente.");
    }
  }
}

export default ClienteController;
