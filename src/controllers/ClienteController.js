import ConexaoMySql from "../database/ConexaoMySql.js";

class ClienteController {

  async adicionar(req, resp) {
    try {
      const novoCliente = req.body;
      const usuarioLogadoId = req.headers["x-usuario-id"]; 

      if (!usuarioLogadoId) {
        resp.status(400).send("Usuário não autenticado.");
        return;
      }

    
      if (!novoCliente.nome || !novoCliente.cpf) {
        resp.status(400).send("Os campos nome e CPF são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const [usuarioExistente] = await conexao.execute(
        "SELECT id FROM usuarios WHERE id = ?",
        [usuarioLogadoId]
      );

      if (usuarioExistente.length === 0) {
        resp.status(400).send("Usuário não encontrado.");
        return;
      }

      
      const comandoSql = "INSERT INTO clientes (nome, email, celular, data_nascimento, cpf, cargo, pis, cep, rua, numero, bairro, cidade, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      const [resultado] = await conexao.execute(comandoSql, [
        novoCliente.nome,
        novoCliente.email,
        novoCliente.celular,
        novoCliente.data_nascimento,
        novoCliente.cpf,
        novoCliente.cargo,
        novoCliente.pis,
        novoCliente.cep,
        novoCliente.rua,
        novoCliente.numero,
        novoCliente.bairro,
        novoCliente.cidade,
        usuarioLogadoId, // Associar o cliente ao usuário logado
      ]);

      resp.send({ mensagem: "Cliente cadastrado com sucesso", resultado });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        resp.status(400).send("CPF já cadastrado.");
        return;
      }
      resp.status(500).send(error);
    }
  }

  async listar(req, resp) {
    try {
      const usuarioLogadoId = req.headers["x-usuario-id"]; // Obtém o ID do usuário logado

      if (!usuarioLogadoId) {
        resp.status(400).send("Usuário não autenticado.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM clientes WHERE usuario_id = ?";

      const [resultado] = await conexao.execute(comandoSql, [usuarioLogadoId]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async atualizar(req, resp) {
    try {
      const clienteEditar = req.body;
      const usuarioLogadoId = req.headers["x-usuario-id"];

      if (!usuarioLogadoId) {
        resp.status(400).send("Usuário não autenticado.");
        return;
      }

      if (!clienteEditar.id_cliente || !clienteEditar.nome || !clienteEditar.cpf) {
        resp.status(400).send("Os campos id_cliente, nome e CPF são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const [clienteExistente] = await conexao.execute(
        "SELECT usuario_id FROM clientes WHERE id_cliente = ?",
        [clienteEditar.id_cliente]
      );

      if (clienteExistente.length === 0) {
        resp.status(400).send("Cliente não encontrado.");
        return;
      }

      if (clienteExistente[0].usuario_id !== usuarioLogadoId) {
        resp.status(403).send("Você não tem permissão para editar esse cliente.");
        return;
      }

      const comandoSql = "UPDATE clientes SET nome = ?, email = ?, celular = ?, data_nascimento = ?, cpf = ?, cargo = ?, pis = ?, cep = ?, rua = ?, numero = ?, bairro = ?, cidade = ?, usuario_id = ? WHERE id_cliente = ?";

      const [resultado] = await conexao.execute(comandoSql, [
        clienteEditar.nome,
        clienteEditar.email,
        clienteEditar.celular,
        clienteEditar.data_nascimento,
        clienteEditar.cpf,
        clienteEditar.cargo,
        clienteEditar.pis,
        clienteEditar.cep,
        clienteEditar.rua,
        clienteEditar.numero,
        clienteEditar.bairro,
        clienteEditar.cidade,
        usuarioLogadoId,
        clienteEditar.id_cliente,
      ]);

      resp.send({ mensagem: "Cliente atualizado com sucesso", resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async excluir(req, resp) {
    try {
      const usuarioLogadoId = req.headers["x-usuario-id"];

      if (!usuarioLogadoId) {
        resp.status(400).send("Usuário não autenticado.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();

      const [clienteExistente] = await conexao.execute(
        "SELECT usuario_id FROM clientes WHERE id_cliente = ?",
        [+req.params.id_cliente]
      );

      if (clienteExistente.length === 0) {
        resp.status(400).send("Cliente não encontrado.");
        return;
      }

      if (clienteExistente[0].usuario_id !== usuarioLogadoId) {
        resp.status(403).send("Você não tem permissão para excluir esse cliente.");
        return;
      }

      const comandoSql = "DELETE FROM clientes WHERE id_cliente = ?";
      const [resultado] = await conexao.execute(comandoSql, [+req.params.id_cliente]);

      resp.send({ mensagem: "Cliente excluído com sucesso", resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ClienteController;
