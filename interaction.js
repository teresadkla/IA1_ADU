// Elementos do DOM
const textContentEl = document.getElementById("textContent");
const focusStatusEl = document.getElementById("focusStatus");
const progressBarEl = document.getElementById("progressBar");
const progressContainerEl = document.getElementById("progressContainer");
const nextLineButton = document.getElementById("nextLine");
const prevLineButton = document.getElementById("prevLine");

// Conteúdo do texto dividido em linhas
const textLines = [
    "Trevor is a high school student diagnosed with autism.",
    "He faces challenges in social and communication skills.",
    "Trevor finds it hard to process visual information and often struggles to concentrate on text-heavy screens.",
    "He can become confused by metaphors and has difficulty following content with too many options.",
    "Additionally, Trevor can easily be distracted by moving images and prefers simple and direct visual content."
];

// Variáveis de controle
let focusMode = false;
let currentLine = 0;

// Atualiza o texto com base no modo de foco
function updateText() {
    if (focusMode) {
        textContentEl.innerText = textLines[currentLine];
        updateProgressBar();
    } else {
        textContentEl.innerText = textLines.join(" ");
    }
}

// Atualiza a barra de progresso com base na linha atual
function updateProgressBar() {
    const progressPercentage = ((currentLine + 1) / textLines.length) * 100;
    progressBarEl.style.width = progressPercentage + "%";
}

// Alterna o modo de foco
function toggleFocusMode() {
    focusMode = !focusMode;
    focusStatusEl.innerText = focusMode ? "On" : "Off";
    currentLine = 0;
    
    if (focusMode) {
        progressContainerEl.style.display = "block"; // Mostra a barra de progresso
        nextLineButton.style.display = "inline-block"; // Mostra o botão "Próxima"
        prevLineButton.style.display = "inline-block"; // Mostra o botão "Anterior"
    } else {
        progressContainerEl.style.display = "none"; // Esconde a barra de progresso
        nextLineButton.style.display = "none"; // Esconde o botão "Próxima"
        prevLineButton.style.display = "none"; // Esconde o botão "Anterior"
        progressBarEl.style.width = "0"; // Reseta a barra de progresso
    }
    
    updateText();
}

// Mostra a próxima linha no modo de foco
function showNextLine() {
    if (focusMode && currentLine < textLines.length - 1) {
        currentLine++;
        updateText();
    }
}

// Mostra a linha anterior no modo de foco
function showPrevLine() {
    if (focusMode && currentLine > 0) {
        currentLine--;
        updateText();
    }
}

// Adiciona event listeners aos botões de navegação
nextLineButton.addEventListener("click", showNextLine);
prevLineButton.addEventListener("click", showPrevLine);
document.getElementById("toggleFocusMode").addEventListener("click", toggleFocusMode);

// Inicializa o texto
updateText();
