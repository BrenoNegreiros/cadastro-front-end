const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const form = document.getElementById("cadastroForm");

nome.addEventListener("blur", () => validarCampo(nome, validarNome));
email.addEventListener("blur", () => validarCampo(email, validarEmail));
senha.addEventListener("blur", () => validarCampo(senha, validarSenha));
confirmarSenha.addEventListener("blur", () =>
    validarCampo(confirmarSenha, validarConfirmacao)
);

function validarCampo(input, funcaoValidadora){
    const msgErro = document.getElementById(input.id + "-error");
    const resultado = funcaoValidadora(input.value);

    if(!resultado.valido){
        input.classList.add("error");
        input.classList.remove("success");
        msgErro.textContent = resultado.mensagem;
    }else{
        input.classList.remove("error");
        input.classList.add("success");
        msgErro.textContent = "";
    }
}

function validarNome(valor){
    if(!valor.trim()){
        return {
            valido:false,
            mensagem:"Nome obrigatório"
        };
    }

    if(valor.length < 3){
        return {
            valido:false,
            mensagem:"Mínimo 3 caracteres"
        };
    }

    return {valido:true};
}

function validarEmail(valor){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!valor){
        return {
            valido:false,
            mensagem:"E-mail obrigatório"
        };
    }

    if(!regex.test(valor)){
        return {
            valido:false,
            mensagem:"E-mail inválido"
        };
    }

    return {valido:true};
}

function validarSenha(valor){
    if(valor.length < 8){
        return {
            valido:false,
            mensagem:"Mínimo 8 caracteres"
        };
    }

    if(!/[A-Z]/.test(valor)){
        return {
            valido:false,
            mensagem:"Precisa de letra maiúscula"
        };
    }

    if(!/[0-9]/.test(valor)){
        return {
            valido:false,
            mensagem:"Precisa de um número"
        };
    }

    return {valido:true};
}

function validarConfirmacao(valor){
    if(valor !== senha.value){
        return {
            valido:false,
            mensagem:"As senhas não coincidem"
        };
    }

    return {valido:true};
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    validarCampo(nome, validarNome);
    validarCampo(email, validarEmail);
    validarCampo(senha, validarSenha);
    validarCampo(confirmarSenha, validarConfirmacao);

    const erros = document.querySelectorAll(".error");

    if(erros.length === 0){
        alert("Cadastro realizado com sucesso!");
        form.reset();

        document
            .querySelectorAll("input")
            .forEach(input => input.classList.remove("success"));
    }
});