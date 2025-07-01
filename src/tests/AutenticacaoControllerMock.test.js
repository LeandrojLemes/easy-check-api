

// Mock do ConexaoMySql
jest.mock('../database/ConexaoMySql.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getConexao: jest.fn().mockResolvedValue({
        execute: jest.fn()
      })
    };
  });
});

import AutenticacaoController from '../controllers/AutenticacaoController.js';
import ConexaoMySql from '../database/ConexaoMySql.js';

describe('AutenticacaoController.login', () => {
  let controller;
  let req;
  let res;
  let mockExecute;

  beforeEach(() => {
    controller = new AutenticacaoController();

    // Criando mock do req e res
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    // Pega o mock do execute para configurar o retorno
    const conexaoMock = {
      execute: jest.fn()
    };
    mockExecute = conexaoMock.execute;

    // Faz o getConexao retornar o mock da conexão
    ConexaoMySql.mockImplementation(() => {
      return {
        getConexao: () => Promise.resolve(conexaoMock)
      };
    });
  });

  test('Deve retornar 400 se email ou senha não forem enviados', async () => {
    req.body = { email: '', senha: '' };

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Email e Senha são obrigatórios.");
  });

  test('Deve retornar 401 se login não encontrado', async () => {
    req.body = { email: 'teste@teste.com', senha: '123' };
    mockExecute.mockResolvedValue([[]]); // Nenhum resultado no DB

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Email ou Senha incorreta.");
  });

  test('Deve retornar dados do usuário em caso de sucesso', async () => {
    const usuarioMock = [{ id: 1, nome: 'Usuário Teste', email: 'teste@teste.com' }];
    req.body = { email: 'teste@teste.com', senha: '123' };
    mockExecute.mockResolvedValue([usuarioMock]);

    await controller.login(req, res);

    expect(res.send).toHaveBeenCalledWith(usuarioMock[0]);
  });

  test('Deve retornar 500 em caso de erro inesperado', async () => {
    req.body = { email: 'teste@teste.com', senha: '123' };
    mockExecute.mockRejectedValue(new Error('Erro no banco'));

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Erro ao realizar login.");
  });
});
