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


// class UsuariosService {
//   validarUsuario(body) {
//     const { cnpj, nome_empresa, nome, email, senha } = body;

//     const senhaValida = this.validarSenha(senha).valido;
//     const cnpjValido = this.validarCNPJ(cnpj).valido;
//     const emailValido = this.validarEmail(email).valido;

//     if (senhaValida && cnpjValido && emailValido && nome_empresa && nome) {
//       return true;
//     }

//     return false;
//   }

//   validarSenha(senha) {
//     if (!senha || senha.length < 6) {
//       return {
//         valido: false,
//         mensagem: "Senha inválida. Deve ter pelo menos 6 caracteres."
//       };
//     }
//     return { valido: true };
//   }

//   validarCNPJ(cnpj) {
//     if (!cnpj) {
//       return {
//         valido: false,
//         mensagem: "CNPJ inválido. Deve conter 14 dígitos."
//       };
//     }
//     const cnpjLimpo = cnpj.replace(/\D/g, '');
//     if (cnpjLimpo.length !== 14) {
//       return {
//         valido: false,
//         mensagem: "CNPJ inválido. Deve conter 14 dígitos."
//       };
//     }
//     return { valido: true };
//   }

//   validarEmail(email) {
//     if (!email || typeof email !== 'string') {
//       return {
//         valido: false,
//         mensagem: "Formato de Email inválido!"
//       };
//     }
//     if (!email.includes('@') || !email.includes('.com')) {
//       return {
//         valido: false,
//         mensagem: "Formato de Email inválido!"
//       };
//     }
//     return { valido: true };
//   }
// }

// export default UsuariosService;

