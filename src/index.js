
  import express from "express";
  import UsuariosController from "./controllers/UsuariosController.js";
  import AutenticacaoController from "./controllers/AutenticacaoController.js";
  import ClienteController from "./controllers/ClienteController.js";
  import cors from "cors";

  const app = express();

  app.use(express.json());

  app.use(cors({ origin: "*" }));

  const _usuariosController = new UsuariosController();
  const _autenticacaoController = new AutenticacaoController();
  const _clienteController = new ClienteController();

  app.post("/login", _autenticacaoController.login);
  app.post("/usuarios", _usuariosController.adicionar);

  app.use((req, resp, next) => {
    const usuarioLogado = req.headers["x-usuario-id"];
    if (!usuarioLogado) {
      return resp.status(401).json({ message: "Usuário não autorizado." });
    }

    req.usuarioId = usuarioLogado;
    next();
  });

  app.get("/usuarios", _usuariosController.listar);
  app.put("/usuarios", _usuariosController.atualizar);
  app.delete("/usuarios/:id", _usuariosController.excluir);

  app.post("/clientes", _clienteController.adicionar);
  app.get("/clientes", _clienteController.listar);
  app.get("/clientes/:id", _clienteController.buscarPorId);
  app.put("/clientes/:id", _clienteController.atualizar);
  app.delete("/clientes/:id", _clienteController.excluir);
  app.get('/clientes/cpf/:cpf', clienteCtrl.buscarPorCpf.bind(clienteCtrl));

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
  });