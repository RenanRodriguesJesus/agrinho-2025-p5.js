// --- Estrutura de dados para as perguntas ---
let perguntas = [
  {
    pergunta: "Qual animal é típico de uma fazenda?",
    opcoes: ["Leão", "Vaca", "Pinguim", "Tubarao"],
    correta: "Vaca",
    tema: "campo"
  },
  {
    pergunta: "Qual o principal meio de transporte em grandes cidades?",
    opcoes: ["Carroça", "Trator", "Ônibus", "Jangada"],
    correta: "Ônibus",
    tema: "cidade"
  },
  {
    pergunta: "Onde é mais comum encontrar um arranha-céu?",
    opcoes: ["No campo", "Na floresta", "Na cidade", "No oceano"],
    correta: "Na cidade",
    tema: "misto"
  },
  {
    pergunta: "Qual planta é muito usada para fazer pão?",
    opcoes: ["Arroz", "Trigo", "Milho", "Batata"],
    correta: "Trigo",
    tema: "campo"
  },
  {
    pergunta: "O que regula o trânsito em cruzamentos de ruas?",
    opcoes: ["Apito", "Sinalizador", "Semáforo", "Placa de pare"],
    correta: "Semáforo",
    tema: "cidade"
  }
];

// --- Variáveis de controle do jogo ---
let estadoDoJogo = "inicio"; // "inicio", "jogando", "fim"
let perguntaAtualIndex = 0;
let pontuacao = 0;
let tempoRestante = 15; // Tempo por pergunta em segundos
let timerFeedback = 0; // Para animação de feedback (correto/incorreto)

// --- Variáveis para elementos visuais ---
let larguraBotao = 300;
let alturaBotao = 60;
let espacamento = 20;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(220); // Fundo padrão

  if (estadoDoJogo === "inicio") {
    desenhaTelaInicio();
  } else if (estadoDoJogo === "jogando") {
    desenhaTelaJogo();
    atualizaTempo();
  } else if (estadoDoJogo === "fim") {
    desenhaTelaFim();
  }

  // Desenha feedback de acerto/erro
  if (timerFeedback > 0) {
    if (feedbackCorreto) {
      fill(0, 255, 0, map(timerFeedback, 0, 60, 0, 255)); // Verde translúcido
    } else {
      fill(255, 0, 0, map(timerFeedback, 0, 60, 0, 255)); // Vermelho translúcido
    }
    rect(0, 0, width, height);
    timerFeedback--;
  }
}

function desenhaTelaInicio() {
  fill(50);
  textSize(40);
  text("Campo x Cidade: O Duelo do Conhecimento", width / 2, height / 2 - 80);

  // Botão Iniciar Jogo
  fill(100, 180, 100); // Cor do botão
  rect(width / 2 - larguraBotao / 2, height / 2 + 20, larguraBotao, alturaBotao, 10);
  fill(255); // Cor do texto do botão
  textSize(28);
  text("Iniciar Jogo", width / 2, height / 2 + 20 + alturaBotao / 2);
}

function desenhaTelaJogo() {
  let pergunta = perguntas[perguntaAtualIndex];

  // Muda o fundo baseado no tema da pergunta
  if (pergunta.tema === "campo") {
    background(180, 220, 180); // Verde claro para campo
  } else if (pergunta.tema === "cidade") {
    background(190, 190, 200); // Cinza azulado para cidade
  }

  fill(50);
  textSize(28);
  text(pergunta.pergunta, width / 2, 100);

  // Desenha as opções de resposta como botões
  for (let i = 0; i < pergunta.opcoes.length; i++) {
    let x = width / 2 - larguraBotao / 2;
    let y = 200 + i * (alturaBotao + espacamento);

    // Efeito hover
    if (mouseX > x && mouseX < x + larguraBotao && mouseY > y && mouseY < y + alturaBotao) {
      fill(150, 200, 255); // Cor mais clara no hover
    } else {
      fill(100, 150, 200); // Cor padrão
    }

    rect(x, y, larguraBotao, alturaBotao, 10);
    fill(255);
    textSize(24);
    text(pergunta.opcoes[i], x + larguraBotao / 2, y + alturaBotao / 2);
  }

  // Mostra pontuação e tempo
  fill(50);
  textSize(20);
  text(`Pontuação: ${pontuacao}`, 100, 50);
  text(`Tempo: ${tempoRestante.toFixed(0)}s`, width - 100, 50);
}

function desenhaTelaFim() {
  background(200);
  fill(50);
  textSize(40);
  text("FIM DE JOGO!", width / 2, height / 2 - 80);
  text(`Sua pontuação final: ${pontuacao} pontos`, width / 2, height / 2);

  // Botão Jogar Novamente
  fill(100, 180, 100);
  rect(width / 2 - larguraBotao / 2, height / 2 + 70, larguraBotao, alturaBotao, 10);
  fill(255);
  textSize(28);
  text("Jogar Novamente", width / 2, height / 2 + 70 + alturaBotao / 2);
}

function mousePressed() {
  if (estadoDoJogo === "inicio") {
    let startButtonX = width / 2 - larguraBotao / 2;
    let startButtonY = height / 2 + 20;
    if (mouseX > startButtonX && mouseX < startButtonX + larguraBotao && mouseY > startButtonY && mouseY < startButtonY + alturaBotao) {
      iniciarJogo();
    }
  } else if (estadoDoJogo === "jogando") {
    let pergunta = perguntas[perguntaAtualIndex];
    for (let i = 0; i < pergunta.opcoes.length; i++) {
      let x = width / 2 - larguraBotao / 2;
      let y = 200 + i * (alturaBotao + espacamento);

      if (mouseX > x && mouseX < x + larguraBotao && mouseY > y && mouseY < y + alturaBotao) {
        verificarResposta(pergunta.opcoes[i]);
        break; // Sai do loop após encontrar a opção clicada
      }
    }
  } else if (estadoDoJogo === "fim") {
    let restartButtonX = width / 2 - larguraBotao / 2;
    let restartButtonY = height / 2 + 70;
    if (mouseX > restartButtonX && mouseX < restartButtonX + larguraBotao && mouseY > restartButtonY && mouseY < restartButtonY + alturaBotao) {
      iniciarJogo(); // Reinicia o jogo
    }
  }
}

function verificarResposta(respostaSelecionada) {
  let pergunta = perguntas[perguntaAtualIndex];
  if (respostaSelecionada === pergunta.correta) {
    pontuacao += 10; // Adiciona pontos por acerto
    feedbackCorreto = true;
  } else {
    feedbackCorreto = false;
  }
  timerFeedback = 60; // 1 segundo de feedback (60 frames)

  // Passa para a próxima pergunta após um pequeno delay
  setTimeout(() => {
    perguntaAtualIndex++;
    if (perguntaAtualIndex < perguntas.length) {
      tempoRestante = 15; // Reseta o tempo para a próxima pergunta
    } else {
      estadoDoJogo = "fim"; // Todas as perguntas respondidas
    }
  }, 1000); // Espera 1 segundo antes de ir para a próxima pergunta
}

function atualizaTempo() {
  if (frameCount % 60 === 0) { // A cada segundo (aprox. 60 frames por segundo)
    tempoRestante--;
    if (tempoRestante <= 0) {
      // Tempo esgotado para a pergunta atual, passa para a próxima ou encerra
      perguntaAtualIndex++;
      if (perguntaAtualIndex < perguntas.length) {
        tempoRestante = 15; // Reseta o tempo
      } else {
        estadoDoJogo = "fim";
      }
    }
  }
}

function iniciarJogo() {
  estadoDoJogo = "jogando";
  perguntaAtualIndex = 0;
  pontuacao = 0;
  tempoRestante = 15;
  timerFeedback = 0;
}