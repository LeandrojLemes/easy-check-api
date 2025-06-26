import ClienteController from '../controllers/ClienteController.js';
import ConexaoMySql   from '../database/ConexaoMySql.js';

// mokando o banco de dados 
jest.mock('../database/ConexaoMySql.js', () => {
  return jest.fn().mockImplementation(() => ({
    getConexao: () => Promise.resolve({
      execute: () => Promise.resolve([[{ id_cliente: 1, nome: 'João', cpf: '12345678900' }]]),
    }),
  }));
});

describe('ClienteController.buscarPorCpf', () => {
  // GIVEN um CPF válido
  test('retorna 200 e o cliente quando encontrado', async () => {
    const req = { params: { cpf: '12345678900' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json:   jest.fn(),
      send:   jest.fn(),
    };
  // WHEN chamar buscarPorCpf
    await new ClienteController().buscarPorCpf(req, res);
 // THEN retorna 200 e o cliente
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id_cliente: 1,
      nome:       'João',
      cpf:        '12345678900',
    });
  });

  // GIVEN: Nenhum cliente 
  // WHEN buacar o cpf na função buscarPorCpf
  // THEN retorna erro 404
  test('retorna 404 quando nenhum cliente for encontrado', async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () => Promise.resolve({
        execute: () => Promise.resolve([[]]),
      }),
    }));

    const req = { params: { cpf: '00000000000' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json:   jest.fn(),
      send:   jest.fn(),
    };

    await new ClienteController().buscarPorCpf(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Cliente não encontrado.');
  });
});
