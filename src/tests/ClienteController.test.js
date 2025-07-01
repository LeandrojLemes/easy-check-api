// // import ClienteController from '../controllers/ClienteController.js';
// // import ConexaoMySql   from '../database/ConexaoMySql.js';

// // // mokando o banco de dados 
// // jest.mock('../database/ConexaoMySql.js', () => {
// //   return jest.fn().mockImplementation(() => ({
// //     getConexao: () => Promise.resolve({
// //       execute: () => Promise.resolve([[{ id_cliente: 1, nome: 'João', cpf: '12345678900' }]]),
// //     }),
// //   }));
// // });

// // describe('ClienteController.buscarPorCpf', () => {
// //   // GIVEN um CPF válido
// //   test('retorna 200 e o cliente quando encontrado', async () => {
// //     const req = { params: { cpf: '12345678900' } };
// //     const res = {
// //       status: jest.fn().mockReturnThis(),
// //       json:   jest.fn(),
// //       send:   jest.fn(),
// //     };
// //   // WHEN chamar buscarPorCpf
// //     await new ClienteController().buscarPorCpf(req, res);
// //  // THEN retorna 200 e o cliente
// //     expect(res.status).toHaveBeenCalledWith(200);
// //     expect(res.json).toHaveBeenCalledWith({
// //       id_cliente: 1,
// //       nome:       'João',
// //       cpf:        '12345678900',
// //     });
// //   });

// //   // GIVEN: Nenhum cliente 
// //   // WHEN buacar o cpf na função buscarPorCpf
// //   // THEN retorna erro 404
// //   test('retorna 404 quando nenhum cliente for encontrado', async () => {
// //     ConexaoMySql.mockImplementation(() => ({
// //       getConexao: () => Promise.resolve({
// //         execute: () => Promise.resolve([[]]),
// //       }),
// //     }));

// //     const req = { params: { cpf: '00000000000' } };
// //     const res = {
// //       status: jest.fn().mockReturnThis(),
// //       json:   jest.fn(),
// //       send:   jest.fn(),
// //     };

// //     await new ClienteController().buscarPorCpf(req, res);

// //     expect(res.status).toHaveBeenCalledWith(404);
// //     expect(res.send).toHaveBeenCalledWith('Cliente não encontrado.');
// //   });
// // });
// // ClienteController.test.js

// import ClienteController from '../controllers/ClienteController.js';
// import ConexaoMySql   from '../database/ConexaoMySql.js';


// jest.mock('../database/ConexaoMySql.js');

// describe('ClienteController.buscarPorCpf', () => {
//   test('retorna 200 e o cliente quando encontrado', async () => {
 
//     ConexaoMySql.mockImplementation(() => ({
//       getConexao: () => Promise.resolve({
//         execute: () => Promise.resolve([[{ id_cliente: 1, nome: 'João', cpf: '12345678900' }]]),
//       }),
//     }));

//     const req = { params: { cpf: '12345678900' }, usuarioId: 1 };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json:   jest.fn(),
//       send:   jest.fn(),
//     };

//     await new ClienteController().buscarPorCpf(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       id_cliente: 1,
//       nome:       'João',
//       cpf:        '12345678900',
//     });
//   });

//   test('retorna 404 quando nenhum cliente for encontrado', async () => {
 
//     ConexaoMySql.mockImplementation(() => ({
//       getConexao: () => Promise.resolve({
//         execute: () => Promise.resolve([[]]),
//       }),
//     }));

//     const req = { params: { cpf: '00000000000' }, usuarioId: 1 };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json:   jest.fn(),
//       send:   jest.fn(),
//     };

//     await new ClienteController().buscarPorCpf(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.send).toHaveBeenCalledWith('Cliente não encontrado.');
//   });
// });

// describe('ClienteController.buscarPorId', () => {
//   test('retorna 200 e o cliente quando encontrado pelo ID', async () => {
   
//     ConexaoMySql.mockImplementation(() => ({
//       getConexao: () => Promise.resolve({
//         execute: () => Promise.resolve([[{ id_cliente: 10, nome: 'Pedro', cpf: '55566677788' }]]),
//       }),
//     }));

//     const req = { params: { id: '10' }, usuarioId: 1 };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send:   jest.fn(),
//       json:   jest.fn(),
//     };

//     await new ClienteController().buscarPorId(req, res);

//     expect(res.send).toHaveBeenCalledWith({
//       id_cliente: 10,
//       nome:       'Pedro',
//       cpf:        '55566677788',
//     });
//   });

//   test('retorna 404 quando nenhum cliente for encontrado pelo ID', async () => {
   
//     ConexaoMySql.mockImplementation(() => ({
//       getConexao: () => Promise.resolve({
//         execute: () => Promise.resolve([[]]),
//       }),
//     }));

//     const req = { params: { id: '20' }, usuarioId: 1 };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send:   jest.fn(),
//     };

//     await new ClienteController().buscarPorId(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.send).toHaveBeenCalledWith('Cliente não encontrado.');
//   });
// });
// ClienteController.test.js

import ClienteController from '../controllers/ClienteController.js';
import ConexaoMySql   from '../database/ConexaoMySql.js';

// Mock da conexão MySQL
jest.mock('../database/ConexaoMySql.js');

describe('ClienteController.buscarPorCpf', () => {
  test('retorna 200 e o cliente quando encontrado', async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () => Promise.resolve({
        execute: () => Promise.resolve([[{ id_cliente: 1, nome: 'João', cpf: '12345678900' }]]),
      }),
    }));

    const req = { params: { cpf: '12345678900' }, usuarioId: 1 };
    const res = {
      status: jest.fn().mockReturnThis(),
      json:   jest.fn(),
      send:   jest.fn(),
    };

    await new ClienteController().buscarPorCpf(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id_cliente: 1,
      nome:       'João',
      cpf:        '12345678900',
    });
  });

  test('retorna 404 quando nenhum cliente for encontrado', async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () => Promise.resolve({
        execute: () => Promise.resolve([[]]),
      }),
    }));

    const req = { params: { cpf: '00000000000' }, usuarioId: 1 };
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

describe('ClienteController.buscarPorId', () => {
  test('retorna 200 e o cliente quando encontrado pelo ID', async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () => Promise.resolve({
        execute: () => Promise.resolve([[{ id_cliente: 10, nome: 'Pedro', cpf: '55566677788' }]]),
      }),
    }));

    const req = { params: { id: '10' }, usuarioId: 1 };
    const res = {
      status: jest.fn().mockReturnThis(),
      send:   jest.fn(),
      json:   jest.fn(),
    };

    await new ClienteController().buscarPorId(req, res);

    expect(res.send).toHaveBeenCalledWith({
      id_cliente: 10,
      nome:       'Pedro',
      cpf:        '55566677788',
    });
  });

  test('retorna 404 quando nenhum cliente for encontrado pelo ID', async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () => Promise.resolve({
        execute: () => Promise.resolve([[]]),
      }),
    }));

    const req = { params: { id: '20' }, usuarioId: 1 };
    const res = {
      status: jest.fn().mockReturnThis(),
      send:   jest.fn(),
    };

    await new ClienteController().buscarPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Cliente não encontrado.');
  });
});

describe('ClienteController.adicionar', () => {
  test("retorna 400 se requisição estiver vazia", async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () =>
        Promise.resolve({
          execute: () => Promise.resolve([[]]),
        }),
    }));

    const req = { body: {}, usuarioId: 1 };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await new ClienteController().adicionar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      "Os campos nome e CPF são obrigatórios."
    );
  });

  test("retorna 201 ao adicionar cliente com dados válidos", async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () =>
        Promise.resolve({
          execute: () => Promise.resolve([{ insertId: 123 }]),
        }),
    }));

    const req = {
      body: {
        nome: "Leo",
        email: "Leo@gmail.com",
        celular: "(48)99855-5555",
        cpf: "04845665498",
        cargo: "QA de sistemas",
        pis: "123321456654",
        cep: "88058456",
        rua: "Floripa",
        numero: "843",
        bairro: "Ingleses",
        cidade: "Santa Catarina",
      },
      usuarioId: 1,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await new ClienteController().adicionar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "Cliente cadastrado com sucesso!",
      clienteId: 123,
    });
  });

  test("retorna 400 se algun dos campos obrigatorios estiverem vazios", async () => {
    ConexaoMySql.mockImplementation(() => ({
      getConexao: () =>
        Promise.resolve({
          execute: () => Promise.resolve([[]]),
        }),
    }));

    const req = {
      body: {
        nome: "Leo",
        email: "Leo@gmail.com",
        celular: "(48)99855-5555",
        cpf: "",
        cargo: "QA de sistemas",
        pis: "123321456654",
        cep: "88058456",
        rua: "Floripa",
        numero: "843",
        bairro: "Ingleses",
        cidade: "Santa Catarina",
      },
      usuarioId: 1,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await new ClienteController().adicionar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      "Os campos nome e CPF são obrigatórios."
    );
  });
});
