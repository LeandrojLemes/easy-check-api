// import UsuariosService from '../services/UsuariosService.js';

// describe('UsuariosService', () => {
//   let service;

//   beforeEach(() => {
//     service = new UsuariosService();
//   });

//   test('cadastro efetuado com usuario valido', () => {
//     const usuario = {
//       cnpj: '12.345.678/0001-95',
//       nome_empresa: 'Empresa X',
//       nome: 'Fulano',
//       email: 'fulano@empresa.com',
//       senha: '123456'
//     };
//     expect(service.validarUsuario(usuario)).toBe(true);
//   });

//   test('usuario nao deve ser cadastrado com dados vazios', () => {
//     const usuario = {
//       cnpj: '',
//       nome_empresa: '',
//       nome: '',
//       email: '',
//       senha: ''
//     };
//     expect(service.validarUsuario(usuario)).toBe(false);
//   });

//   test('teste CNPJ com menos de 14 dígitos', () => {
//     const usuario = {
//       cnpj: '123',
//       nome_empresa: 'Empresa Y',
//       nome: 'João',
//       email: 'joao@empresa.com',
//       senha: '123456'
//     };
//     expect(service.validarUsuario(usuario)).toBe(false);
//   });

//   test('teste email sem @', () => {
//     const usuario = {
//       cnpj: '12345678000195',
//       nome_empresa: 'Empresa Z',
//       nome: 'Maria',
//       email: 'mariaempresa.com', // sem @
//       senha: '123456'
//     };
//     expect(service.validarUsuario(usuario)).toBe(false);
//   });

//   test('teste senha com menos de 6 caracteres', () => {
//     const usuario = {
//       cnpj: '12345678000195',
//       nome_empresa: 'Empresa A',
//       nome: 'Carlos',
//       email: 'carlos@empresa.com',
//       senha: '123' // senha curta
//     };
//     expect(service.validarUsuario(usuario)).toBe(false);
//   });
// });
import ClienteService  from "../services/ClienteService";


describe('ClienteService - validações', () => {
  let service;

  beforeEach(() => {
    service = new ClienteService();
  });

  test('valida cliente válido', () => {
    const cliente = {
      nome: 'João',
      email: 'joao@email.com',
      cpf: '12345678901',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toBe(true); 
  });

  test('valida nome obrigatório', () => {
    const cliente = {
      nome: '',
      email: 'joao@email.com',
      cpf: '12345678901',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toBeFalsy();
  });

  test('valida email inválido', () => {
    const cliente = {
      nome: 'Maria',
      email: 'email-invalido',
      cpf: '12345678901',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toBeFalsy();
  });

  test('valida cpf inválido', () => {
    const cliente = {
      nome: 'Ana',
      email: 'ana@email.com',
      cpf: '123',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toBeFalsy();
  });

  test('valida múltiplos erros juntos', () => {
    const cliente = {
      nome: '',
      email: 'errado',
      cpf: '',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toBeFalsy();
    expect(erros).toBeFalsy();
    expect(erros).toBeFalsy();
  });
});