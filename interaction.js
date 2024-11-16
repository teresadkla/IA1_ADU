
const textContentEl = document.getElementById("textContent");
const focusStatusEl = document.getElementById("focusStatus");
const progressBarEl = document.getElementById("progressBar");
const progressContainerEl = document.getElementById("progressContainer");
const nextLineButton = document.getElementById("nextLine");
const prevLineButton = document.getElementById("prevLine");
const increaseTextSizeBtn = document.getElementById("increaseTextSize");
const decreaseTextSizeBtn = document.getElementById("decreaseTextSize");


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
let textSize = 18;

// Atualiza o texto com base no modo de foco
function updateText() {
    if (focusMode) {
        // Mostra apenas a linha atual no modo de foco
        textContentEl.innerText = textLines[currentLine];
        updateProgressBar(); // Atualiza a barra de progresso
    } else {
        // Mostra todo o texto quando o modo de foco está desligado
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
    currentLine = 0; // Reinicia a linha atual

    // Mostra ou esconde a barra de progresso e os botões com base no modo de foco
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

    updateText(); // Atualiza o texto com base no modo
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
function increaseTextSize() {
    textSize += 2;
    textContentEl.style.fontSize = textSize + "px";
}

function decreaseTextSize() {
    if (textSize > 10) {
        textSize -= 2;
        textContentEl.style.fontSize = textSize + "px";
    }
}
// Adiciona event listeners aos botões de navegação
nextLineButton.addEventListener("click", showNextLine);
prevLineButton.addEventListener("click", showPrevLine);
document.getElementById("toggleFocusMode").addEventListener("click", toggleFocusMode);
increaseTextSizeBtn.addEventListener("click", increaseTextSize);
decreaseTextSizeBtn.addEventListener("click", decreaseTextSize);

// Inicializa o texto
updateText();
