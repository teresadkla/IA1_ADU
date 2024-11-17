let audioEnabled = false;
let speechSynthesisInstance = window.speechSynthesis;

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

// Função para ler o texto com highlight
function readText() {
    speechSynthesisInstance.cancel(); // Cancela qualquer leitura em andamento

    const textToRead = focusMode
        ? textLines[currentLine] // Apenas a linha atual no modo de foco
        : textLines.join(" "); // Todo o texto fora do modo de foco

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "en-US"; // Define o idioma da fala
    utterance.rate = 1; // Velocidade da fala

    // Divida o texto em palavras e atualize o conteúdo com spans
    const words = textToRead.split(" ");
    textContentEl.innerHTML = words
        .map((word, index) => `<span id="word-${index}">${word}</span>`)
        .join(" ");

    // Índice da palavra atual
    let currentWordIndex = 0;

    // Evento de boundary para destacar palavras
    utterance.onboundary = (event) => {
        if (event.name === "word") {
            const charIndex = event.charIndex;

            // Determina a palavra atual com base no índice de caractere
            for (let i = currentWordIndex; i < words.length; i++) {
                const wordSpan = document.getElementById(`word-${i}`);
                if (wordSpan && textToRead.indexOf(words[i], charIndex) === charIndex) {
                    // Remove destaque anterior
                    document.querySelectorAll(`#textContent span`).forEach((span) => {
                        span.classList.remove("highlight");
                    });

                    // Aplica o destaque
                    wordSpan.classList.add("highlight");
                    currentWordIndex = i + 1; // Avança para a próxima palavra
                    break;
                }
            }
        }
    };

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

// Adiciona o evento de clique no botão de áudio
toggleAudioBtn.addEventListener("click", toggleAudio);
