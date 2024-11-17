const textContentEl = document.getElementById("textContent");
const focusStatusEl = document.getElementById("focusStatus");
const progressBarEl = document.getElementById("progressBar");
const progressContainerEl = document.getElementById("progressContainer");
const nextLineButton = document.getElementById("nextLine");
const prevLineButton = document.getElementById("prevLine");
const increaseTextSizeBtn = document.getElementById("increaseTextSize");
const decreaseTextSizeBtn = document.getElementById("decreaseTextSize");
const toggleAudioBtn = document.getElementById("toggleAudio");

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
let audioEnabled = false;
let speechSynthesisInstance = window.speechSynthesis;

// Função para atualizar o texto
function updateText() {
    if (focusMode) {
        textContentEl.innerText = textLines[currentLine];
        updateProgressBar();
    } else {
        textContentEl.innerText = textLines.join(" ");
    }
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressPercentage = ((currentLine + 1) / textLines.length) * 100;
    progressBarEl.style.width = progressPercentage + "%";
}

// Função para alternar o modo de foco
function toggleFocusMode() {
    focusMode = !focusMode;
    focusStatusEl.innerText = focusMode ? "On" : "Off";
    currentLine = 0;

    if (focusMode) {
        progressContainerEl.style.display = "flex";
        nextLineButton.style.display = "inline-block";
        prevLineButton.style.display = "inline-block";
    } else {
        progressContainerEl.style.display = "none";
        nextLineButton.style.display = "none";
        prevLineButton.style.display = "none";
        progressBarEl.style.width = "0";
    }

    updateText();
}

// Funções de navegação
function showNextLine() {
    if (focusMode && currentLine < textLines.length - 1) {
        currentLine++;
        updateText();
        if (audioEnabled) readText(); // Lê automaticamente a próxima linha se o áudio estiver ativado
    }
}

function showPrevLine() {
    if (focusMode && currentLine > 0) {
        currentLine--;
        updateText();
        if (audioEnabled) readText(); // Lê automaticamente a linha anterior se o áudio estiver ativado
    }
}

// Funções para alterar o tamanho do texto
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

// Função para alternar o áudio
function toggleAudio() {
    audioEnabled = !audioEnabled;

    if (audioEnabled) {
        toggleAudioBtn.querySelector("img").src = "images/sound_on.svg";
        toggleAudioBtn.querySelector("img").alt = "Audio on";
        readText();
    } else {
        toggleAudioBtn.querySelector("img").src = "images/sound_off.svg";
        toggleAudioBtn.querySelector("img").alt = "Audio off";
        stopReading();
    }
}

// Função para ler o texto
function readText() {
    speechSynthesisInstance.cancel(); // Cancela qualquer leitura em andamento

    const textToRead = focusMode
        ? textLines[currentLine] // Apenas a linha atual no modo de foco
        : textLines.join(" "); // Todo o texto fora do modo de foco

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "en-US"; // Define o idioma da fala
    utterance.rate = 1; // Velocidade da fala
    speechSynthesisInstance.speak(utterance);

    // Parar o áudio automaticamente ao terminar a leitura
    utterance.onend = () => {
        audioEnabled = false;
        toggleAudioBtn.querySelector("img").src = "images/sound_off.svg";
        toggleAudioBtn.querySelector("img").alt = "Audio off";
    };
}

// Função para parar a leitura
function stopReading() {
    speechSynthesisInstance.cancel();
}

// Event listeners
nextLineButton.addEventListener("click", showNextLine);
prevLineButton.addEventListener("click", showPrevLine);
document.getElementById("toggleFocusMode").addEventListener("click", toggleFocusMode);
increaseTextSizeBtn.addEventListener("click", increaseTextSize);
decreaseTextSizeBtn.addEventListener("click", decreaseTextSize);
toggleAudioBtn.addEventListener("click", toggleAudio);

// Inicializa o texto
updateText();
