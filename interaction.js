// Variáveis principais
const textContentEl = document.getElementById("textContent");
const focusStatusEl = document.getElementById("focusStatus");
const progressBarEl = document.getElementById("progressBar");
const progressContainerEl = document.getElementById("progressContainer");
const nextLineButton = document.getElementById("nextLine");
const prevLineButton = document.getElementById("prevLine");
const increaseTextSizeBtn = document.getElementById("increaseTextSize");
const decreaseTextSizeBtn = document.getElementById("decreaseTextSize");
const toggleAudioBtn = document.getElementById("toggleAudio");

// Seleciona todos os elementos de texto (h3 e p)
const textElements = Array.from(textContentEl.querySelectorAll("h3, p"));

// Variáveis de controle
let focusMode = false;
let currentElementIndex = 0;
let textSize = 18;
let audioEnabled = false;
let speechSynthesisInstance = window.speechSynthesis;

// Função para atualizar o estado do texto
function updateText() {
    if (focusMode) {
        // Exibe apenas o elemento atual no modo de foco
        textElements.forEach((el, index) => {
            el.style.display = index === currentElementIndex ? "block" : "none";
        });
        updateProgressBar();
    } else {
        // Exibe todos os elementos no modo normal
        textElements.forEach((el) => {
            el.style.display = "block";
        });
    }
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressPercentage = ((currentElementIndex + 1) / textElements.length) * 100;
    progressBarEl.style.width = progressPercentage + "%";
}

// Função para alternar o modo de foco
function toggleFocusMode() {
    focusMode = !focusMode;
    focusStatusEl.innerText = focusMode ? "On" : "Off";
    currentElementIndex = 0;

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
    if (focusMode && currentElementIndex < textElements.length - 1) {
        currentElementIndex++;
        updateText();
        if (audioEnabled) readText(); // Lê automaticamente o próximo elemento se o áudio estiver ativado
    }
}

function showPrevLine() {
    if (focusMode && currentElementIndex > 0) {
        currentElementIndex--;
        updateText();
        if (audioEnabled) readText(); // Lê automaticamente o elemento anterior se o áudio estiver ativado
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

// Função para ler o texto atual ou todos os textos no modo Focus Off
function readText() {
    speechSynthesisInstance.cancel(); // Cancela qualquer leitura em andamento

    if (focusMode) {
        // No modo Focus, lê apenas o elemento atual
        const textToRead = textElements[currentElementIndex].innerText;
        speakText(textToRead);
    } else {
        // No modo Focus Off, lê todos os elementos visíveis em ordem
        const visibleText = textElements.map((el) => el.innerText).join(" "); // Junta todos os textos visíveis
        speakText(visibleText);
    }
}

// Função para sintetizar e ler texto
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Define o idioma da fala
    utterance.rate = 1; // Velocidade da fala

    speechSynthesisInstance.speak(utterance);
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
