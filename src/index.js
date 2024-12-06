import cors from "cors";
import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import AutenticacaoController from "./controllers/AutenticacaoController.js";
import ClienteController from "./controllers/ClienteController.js"; // Importação do controlador de clientes

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Permite requisições de qualquer origem (ajuste conforme necessário)

// Instâncias dos controladores
const _usuariosController = new UsuariosController();
const _autenticacaoController = new AutenticacaoController();
const _clienteController = new ClienteController(); // Instância do controlador de clientes

// Rotas públicas
app.post("/login", _autenticacaoController.login);
app.post("/usuarios", _usuariosController.adicionar);

// Middleware de verificação de usuário logado
app.use((req, resp, next) => {
  const usuarioLogado = req.headers["x-usuario-id"]; // Ajuste para "x-usuario-id" no header
  if (!usuarioLogado) {
    resp.status(401).send("Usuário não autorizado.");
    return;
  }
  next();
});

// Rotas privadas de usuários
app.get("/usuarios", _usuariosController.listar);
app.put("/usuarios", _usuariosController.atualizar);
app.delete("/usuarios/:id", _usuariosController.excluir);

// Rotas privadas de clientes
app.post("/clientes", _clienteController.adicionar);  // Cadastro de clientes
app.get("/clientes", _clienteController.listar);     // Listagem de clientes
app.put("/clientes/:id_cliente", _clienteController.atualizar);  // Atualização de clientes
app.delete("/clientes/:id_cliente", _clienteController.excluir); // Exclusão de clientes

// Configuração do servidor
const port = process.env.PORT || 3000; // Verifique se a variável PORT está configurada no Railway
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
