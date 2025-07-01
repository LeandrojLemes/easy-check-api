class ClienteService {
    validarDados(cliente) {
      const erros = [];
  
      if (!cliente.nome || cliente.nome.trim() === '') {
        erros.push('Nome é obrigatório');
      }
  
      if (!cliente.email || !this.validarEmail(cliente.email)) {
        erros.push('Email inválido');
      }
  
      if (!cliente.cpf || !this.validarCpf(cliente.cpf)) {
        erros.push('CPF inválido');
      }
  
      return erros;
    }
  
    validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    validarCpf(cpf) {
      const cpfLimpo = cpf.replace(/\D/g, '');
      return cpfLimpo.length === 11;
    }
  }
  
  module.exports = ClienteService;

  //
  