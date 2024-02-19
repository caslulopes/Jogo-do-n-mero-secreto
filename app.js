let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) { 
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); 
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() { 
    let chute = document.querySelector('input').value; 
    console.log(chute == numeroSecreto); 
    if (chute == numeroSecreto) { 
        exibirTextoNaTela('h1', 'Acertou!'); 
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute ('disabled'); 
    } else {
        if (chute > numeroSecreto) { 
            exibirTextoNaTela('p', 'O numero secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; 
        limparCampo(); 
    }
}

function limparCampo() { 
    chute = document.querySelector('input'); 
    chute.value = ''; 
}

function gerarNumeroAleatorio() { 
    let numerosEscolhido = parseInt(Math.random() * numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numerosEscolhido)) { // Se a lista de numéros sorteados já possui o número escolhido..
        return gerarNumeroAleatorio(); // Retorne um novo número aleatório
    } else {
        listaDeNumerosSorteados.push(numerosEscolhido); // Se na lista de números sorteados não possuir o numero escolhido
        console.log(listaDeNumerosSorteados);
        return numerosEscolhido; //retorna número escolhido 
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

