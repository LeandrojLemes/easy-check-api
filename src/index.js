import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import AutenticacaoController from "./controllers/AutenticacaoController.js";
import ClienteController from "./controllers/ClienteController.js";
import cors from "cors";

const app = express();

// Middleware de JSON
app.use(express.json());

// Middleware de CORS
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization", "x-usuario-id"], 
  })
);

const _usuariosController = new UsuariosController();
const _autenticacaoController = new AutenticacaoController();
const _clienteController = new ClienteController();

// Rotas públicas (não exigem autenticação)
app.post("/login", _autenticacaoController.login);
app.post("/usuarios", _usuariosController.adicionar);

// Middleware de Autenticação
app.use((req, resp, next) => {
  const usuarioLogado = req.headers["x-usuario-id"];
  if (!usuarioLogado) {
    return resp.status(401).json({ message: "Usuário não autorizado." });
  }

  req.usuarioId = usuarioLogado;
  next();
});

// Rotas para Usuários
app.get("/usuarios", _usuariosController.listar);
app.put("/usuarios", _usuariosController.atualizar);
app.delete("/usuarios/:id", _usuariosController.excluir);

// Rotas para Clientes
app.post("/clientes", _clienteController.adicionar);
app.get("/clientes", _clienteController.listar);
app.get("/clientes/:id", _clienteController.buscarPorId); // Rota adicionada
app.put("/clientes/:id", _clienteController.atualizar);
app.delete("/clientes/:id", _clienteController.excluir);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
