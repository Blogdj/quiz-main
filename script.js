const questions = [
    {
        topic: 'HTML · ESTRUTURA',
        question: 'Qual elemento representa o conteúdo principal de uma página?',
        answers: ['<section>', '<main>', '<footer>', '<aside>'],
        correct: 1,
        explanation: 'A tag <main> identifica o conteúdo principal e único daquela página.'
    },
    {
        topic: 'HTML · ACESSIBILIDADE',
        question: 'Por que uma imagem informativa deve ter um texto alternativo?',
        answers: [
            'Para mudar o tamanho da imagem',
            'Para criar uma legenda automática',
            'Para descrever a imagem a quem não consegue vê-la',
            'Para carregar a imagem mais rápido'
        ],
        correct: 2,
        explanation: 'O atributo alt oferece uma descrição para leitores de tela e também quando a imagem não carrega.'
    },
    {
        topic: 'HTML · LINKS',
        question: 'Qual atributo define o destino de um link criado com <a>?',
        answers: ['src', 'href', 'target', 'rel'],
        correct: 1,
        explanation: 'O atributo href informa o endereço para onde o link deve levar.'
    },
    {
        topic: 'CSS · LAYOUT',
        question: 'Qual propriedade ativa o Flexbox em um elemento?',
        answers: ['position: flex', 'display: flex', 'layout: flex', 'flex: display'],
        correct: 1,
        explanation: 'Com display: flex, os elementos filhos passam a participar do layout flexível.'
    },
    {
        topic: 'CSS · ALINHAMENTO',
        question: 'Em um contêiner Flexbox com direção padrão, qual propriedade alinha itens no eixo vertical?',
        answers: ['justify-content', 'align-items', 'text-align', 'vertical-align'],
        correct: 1,
        explanation: 'No Flexbox, align-items controla o alinhamento no eixo transversal — vertical na direção padrão.'
    },
    {
        topic: 'CSS · RESPONSIVIDADE',
        question: 'Qual recurso permite aplicar estilos diferentes conforme a largura da tela?',
        answers: ['Uma variável CSS', 'Uma pseudo-classe', 'Uma media query', 'Um seletor universal'],
        correct: 2,
        explanation: 'Media queries aplicam regras CSS quando condições, como a largura da tela, são atendidas.'
    },
    {
        topic: 'JAVASCRIPT · DOM',
        question: 'Qual método seleciona o primeiro elemento que corresponde a um seletor CSS?',
        answers: ['document.querySelector()', 'document.getAll()', 'document.createElement()', 'document.getStyle()'],
        correct: 0,
        explanation: 'document.querySelector() retorna o primeiro elemento que corresponde ao seletor informado.'
    },
    {
        topic: 'JAVASCRIPT · EVENTOS',
        question: 'Qual método é usado para reagir ao clique em um botão?',
        answers: ['element.onChange()', 'element.addEventListener("click", ...)', 'element.querySelector("click")', 'element.clickEvent()'],
        correct: 1,
        explanation: 'addEventListener registra uma função para ser executada quando o evento click acontece.'
    },
    {
        topic: 'JAVASCRIPT · VARIÁVEIS',
        question: 'Qual declaração é indicada para um valor que não será reatribuído?',
        answers: ['var', 'let', 'const', 'static'],
        correct: 2,
        explanation: 'const impede a reatribuição da variável, deixando a intenção do código mais clara.'
    }
];

const questionCounter = document.querySelector('#question-counter');
const progressTrack = document.querySelector('.progress-track');
const progressFill = document.querySelector('#progress-fill');
const questionTopic = document.querySelector('#question-topic');
const questionText = document.querySelector('#question-text');
const answerList = document.querySelector('#answer-list');
const feedback = document.querySelector('#feedback');
const nextButton = document.querySelector('#next-button');
const quizContent = document.querySelector('#quiz-content');
const result = document.querySelector('#result');
const resultScore = document.querySelector('#result-score');
const resultTitle = document.querySelector('#result-title');
const resultCopy = document.querySelector('#result-copy');
const restartButton = document.querySelector('#restart-button');

let currentQuestion = 0;
let score = 0;

function renderQuestion() {
    const question = questions[currentQuestion];
    questionCounter.textContent = `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;
    questionTopic.textContent = question.topic;
    questionText.textContent = question.question;
    questionText.tabIndex = -1;
    answerList.replaceChildren();
    feedback.hidden = true;
    feedback.className = 'feedback';
    nextButton.hidden = true;

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        const letter = document.createElement('span');
        const copy = document.createElement('span');

        button.className = 'answer-button';
        button.type = 'button';
        letter.className = 'answer-letter';
        letter.setAttribute('aria-hidden', 'true');
        letter.textContent = String.fromCharCode(65 + index);
        copy.className = 'answer-copy';
        copy.textContent = answer;
        button.append(letter, copy);
        button.addEventListener('click', () => selectAnswer(index));
        answerList.append(button);
    });
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const answerButtons = answerList.querySelectorAll('.answer-button');
    const isCorrect = selectedIndex === question.correct;

    answerButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correct) {
            button.classList.add('answer-button--correct');
        } else if (index === selectedIndex) {
            button.classList.add('answer-button--incorrect');
        }
    });

    if (isCorrect) {
        score += 1;
    }

    feedback.classList.add(isCorrect ? 'feedback--correct' : 'feedback--incorrect');
    feedback.textContent = isCorrect
        ? `Boa! ${question.explanation}`
        : `Ainda não. A resposta certa é “${question.answers[question.correct]}”. ${question.explanation}`;
    feedback.hidden = false;
    progressTrack.setAttribute('aria-valuenow', String(currentQuestion + 1));
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    nextButton.querySelector('span').textContent = currentQuestion === questions.length - 1
        ? 'Ver resultado'
        : 'Próxima pergunta';
    nextButton.hidden = false;
    nextButton.focus();
}

function showResult() {
    const percentage = score / questions.length;

    if (percentage >= 0.8) {
        resultTitle.textContent = 'Mandou muito bem!';
        resultCopy.textContent = 'Seus fundamentos estão afiados. Continue praticando e transforme esse conhecimento em projetos.';
    } else if (percentage >= 0.5) {
        resultTitle.textContent = 'Você está no caminho!';
        resultCopy.textContent = 'A base está crescendo. Revise os temas das respostas e tente o desafio mais uma vez.';
    } else {
        resultTitle.textContent = 'Todo começo conta.';
        resultCopy.textContent = 'Agora você já sabe por onde começar. Pratique um pouco e volte para superar sua pontuação.';
    }

    resultScore.textContent = `${score} / ${questions.length}`;
    quizContent.hidden = true;
    result.hidden = false;
    restartButton.focus();
}

nextButton.addEventListener('click', () => {
    if (currentQuestion === questions.length - 1) {
        showResult();
        return;
    }

    currentQuestion += 1;
    renderQuestion();
    questionText.focus();
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    progressTrack.setAttribute('aria-valuenow', '0');
    progressFill.style.width = '0%';
    result.hidden = true;
    quizContent.hidden = false;
    renderQuestion();
    questionText.focus();
});

renderQuestion();
