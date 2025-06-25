class UsuariosService {
  validarUsuario(body) {
    const { cnpj, nome_empresa, nome, email, senha } = body;

    if (
      this.validarSenha(senha) &&
      this.validarCNPJ(cnpj) &&
      this.validarEmail(email) &&
      nome_empresa &&
      nome
    ) {
      return true;
    } else {
      return false;
    }
  }

  validarSenha(senha) {
    return senha && senha.length >= 6;
  }

  validarCNPJ(cnpj) {
    if (!cnpj) return false;
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return cnpjLimpo.length === 14;
  }

  validarEmail(email) {
    if (!email) return false;
    return email.includes('@') && email.includes('.com');
  }
}

export default UsuariosService;

