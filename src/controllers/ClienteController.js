import ConexaoMySql from "../database/ConexaoMySql.js";

class ClienteController {
  // Adicionar Cliente
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

  // Buscar Cliente por ID
  async buscarPorId(req, resp) {
    try {
      const clienteId = req.params.id;
      const usuarioId = req.usuarioId;

      console.log("Buscando cliente por ID:", { clienteId, usuarioId });

      if (!clienteId) {
        return resp.status(400).send("ID do cliente é obrigatório.");
      }

      const conexao = await new ConexaoMySql().getConexao();
      const [resultado] = await conexao.execute(
        "SELECT * FROM clientes WHERE id_cliente = ? AND usuario_id = ?",
        [clienteId, usuarioId]
      );

      console.log("Resultado da busca:", resultado);

      if (resultado.length === 0) {
        return resp.status(404).send("Cliente não encontrado.");
      }

      resp.send(resultado[0]);
    } catch (error) {
      console.error("Erro ao buscar cliente por ID:", error);
      resp.status(500).send("Erro ao buscar cliente.");
    }
  }

  // Listar Clientes
  async listar(req, resp) {
    try {
      const usuarioId = req.usuarioId;
      console.log("Listando clientes para o usuário:", usuarioId);

      const conexao = await new ConexaoMySql().getConexao();
      const [resultado] = await conexao.execute(
        "SELECT * FROM clientes WHERE usuario_id = ?",
        [usuarioId]
      );

      console.log("Clientes encontrados:", resultado);
      resp.send(resultado);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      resp.status(500).send("Erro ao listar clientes.");
    }
  }

  // Atualizar Cliente
  async atualizar(req, resp) {
    try {
      const clienteId = req.params.id;
      const usuarioId = req.usuarioId;
      const { nome, email, celular, cpf, cargo, pis, cep, rua, numero, bairro, cidade } = req.body;

      console.log("Dados recebidos para atualização:", {
        clienteId,
        usuarioId,
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
      });

      if (!clienteId || !nome || !cpf) {
        console.error("Erro: Campos obrigatórios ausentes.");
        return resp.status(400).send("Os campos nome e CPF são obrigatórios.");
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = `
        UPDATE clientes 
        SET nome = ?, email = ?, celular = ?, cpf = ?, cargo = ?, pis = ?, cep = ?, rua = ?, numero = ?, bairro = ?, cidade = ? 
        WHERE id_cliente = ? AND usuario_id = ?
      `;

      console.log("Comando SQL:", comandoSql);

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

      console.log("Resultado da atualização:", resultado);

      if (resultado.affectedRows === 0) {
        console.warn("Cliente não encontrado ou não autorizado.");
        return resp.status(404).send("Cliente não encontrado ou não autorizado.");
      }

      resp.send("Cliente atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      resp.status(500).send("Erro ao atualizar cliente.");
    }
  }

  // Excluir Cliente
  async excluir(req, resp) {
    try {
      const clienteId = req.params.id;
      const usuarioId = req.usuarioId;

      console.log("Tentando excluir cliente:", { clienteId, usuarioId });

      if (!clienteId) {
        return resp.status(400).send("ID do cliente é obrigatório.");
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM clientes WHERE id_cliente = ? AND usuario_id = ?";

      const [resultado] = await conexao.execute(comandoSql, [clienteId, usuarioId]);

      console.log("Resultado da exclusão:", resultado);

      if (resultado.affectedRows === 0) {
        return resp.status(404).send("Cliente não encontrado ou não autorizado.");
      }

      resp.send("Cliente excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      resp.status(500).send("Erro ao excluir cliente.");
    }
  }
}

export default ClienteController;
