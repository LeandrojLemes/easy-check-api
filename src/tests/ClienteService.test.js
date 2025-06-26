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
    expect(erros.length).toBe(0);
  });

  test('valida nome obrigatório', () => {
    const cliente = {
      nome: '',
      email: 'joao@email.com',
      cpf: '12345678901',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toContain('Nome é obrigatório');
  });

  test('valida email inválido', () => {
    const cliente = {
      nome: 'Maria',
      email: 'email-invalido',
      cpf: '12345678901',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toContain('Email inválido');
  });

  test('valida cpf inválido', () => {
    const cliente = {
      nome: 'Ana',
      email: 'ana@email.com',
      cpf: '123',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toContain('CPF inválido');
  });

  test('valida múltiplos erros juntos', () => {
    const cliente = {
      nome: '',
      email: 'errado',
      cpf: '',
    };
    const erros = service.validarDados(cliente);
    expect(erros).toContain('Nome é obrigatório');
    expect(erros).toContain('Email inválido');
    expect(erros).toContain('CPF inválido');
  });
});